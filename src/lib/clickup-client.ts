import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ClickUpTask, ClickUpUser, ClickUpList, ClickUpSpace, ClickUpTeam } from '@/types/clickup';

export class ClickUpClient {
  private client: AxiosInstance;
  private apiToken: string;
  private teamId: string;

  constructor(apiToken?: string, teamId?: string) {
    this.apiToken = apiToken || process.env.CLICKUP_API_TOKEN || '';
    this.teamId = teamId || process.env.CLICKUP_TEAM_ID || '';

    this.client = axios.create({
      baseURL: 'https://api.clickup.com/api/v2',
      headers: {
        'Authorization': this.apiToken,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Add request interceptor for rate limiting
    this.client.interceptors.request.use((config) => {
      // Add any request modifications here
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('ClickUp API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  // Authentication and Team Methods
  async getAuthorizedUser(): Promise<ClickUpUser> {
    const response = await this.client.get('/user');
    return response.data.user;
  }

  async getTeams(): Promise<ClickUpTeam[]> {
    const response = await this.client.get('/team');
    return response.data.teams;
  }

  async getTeamMembers(teamId?: string): Promise<ClickUpUser[]> {
    const id = teamId || this.teamId;
    const response = await this.client.get(`/team/${id}`);
    return response.data.team.members;
  }

  // Space Methods
  async getSpaces(teamId?: string): Promise<ClickUpSpace[]> {
    const id = teamId || this.teamId;
    const response = await this.client.get(`/team/${id}/space`);
    return response.data.spaces;
  }

  async getSpace(spaceId: string): Promise<ClickUpSpace> {
    const response = await this.client.get(`/space/${spaceId}`);
    return response.data;
  }

  // List Methods
  async getLists(spaceId: string): Promise<ClickUpList[]> {
    const response = await this.client.get(`/space/${spaceId}/list`);
    return response.data.lists;
  }

  async getList(listId: string): Promise<ClickUpList> {
    const response = await this.client.get(`/list/${listId}`);
    return response.data;
  }

  // Task Methods
  async getTasks(
    listId: string,
    options: {
      archived?: boolean;
      page?: number;
      order_by?: string;
      reverse?: boolean;
      subtasks?: boolean;
      statuses?: string[];
      include_closed?: boolean;
      assignees?: string[];
      tags?: string[];
      due_date_gt?: number;
      due_date_lt?: number;
      date_created_gt?: number;
      date_created_lt?: number;
      date_updated_gt?: number;
      date_updated_lt?: number;
    } = {}
  ): Promise<ClickUpTask[]> {
    const params = new URLSearchParams();
    
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const response = await this.client.get(`/list/${listId}/task?${params.toString()}`);
    return response.data.tasks;
  }

  async getTask(taskId: string): Promise<ClickUpTask> {
    const response = await this.client.get(`/task/${taskId}`);
    return response.data;
  }

  async createTask(
    listId: string,
    taskData: {
      name: string;
      description?: string;
      assignees?: number[];
      tags?: string[];
      status?: string;
      priority?: number;
      due_date?: number;
      due_date_time?: boolean;
      time_estimate?: number;
      start_date?: number;
      start_date_time?: boolean;
      notify_all?: boolean;
      parent?: string;
      links_to?: string;
      check_required_custom_fields?: boolean;
      custom_fields?: Array<{
        id: string;
        value: any;
      }>;
    }
  ): Promise<ClickUpTask> {
    const response = await this.client.post(`/list/${listId}/task`, taskData);
    return response.data;
  }

  async updateTask(
    taskId: string,
    updates: {
      name?: string;
      description?: string;
      status?: string;
      priority?: number;
      due_date?: number;
      due_date_time?: boolean;
      parent?: string;
      time_estimate?: number;
      archived?: boolean;
      add_assignees?: number[];
      rem_assignees?: number[];
    }
  ): Promise<ClickUpTask> {
    const response = await this.client.put(`/task/${taskId}`, updates);
    return response.data;
  }

  // HR-specific helper methods
  async getEmployeeTasks(userId: string, options: {
    includeCompleted?: boolean;
    dateRange?: {
      start: Date;
      end: Date;
    };
  } = {}): Promise<ClickUpTask[]> {
    const spaces = await this.getSpaces();
    const allTasks: ClickUpTask[] = [];

    for (const space of spaces) {
      const lists = await this.getLists(space.id);
      
      for (const list of lists) {
        const tasks = await this.getTasks(list.id, {
          assignees: [userId],
          include_closed: options.includeCompleted || false,
          date_created_gt: options.dateRange?.start.getTime(),
          date_created_lt: options.dateRange?.end.getTime(),
        });
        
        allTasks.push(...tasks);
      }
    }

    return allTasks;
  }

  async getTeamWorkload(teamId?: string): Promise<{
    totalTasks: number;
    tasksByStatus: Record<string, number>;
    tasksByAssignee: Record<string, number>;
  }> {
    const id = teamId || this.teamId;
    const spaces = await this.getSpaces(id);
    const workload = {
      totalTasks: 0,
      tasksByStatus: {} as Record<string, number>,
      tasksByAssignee: {} as Record<string, number>,
    };

    for (const space of spaces) {
      const lists = await this.getLists(space.id);
      
      for (const list of lists) {
        const tasks = await this.getTasks(list.id, {
          include_closed: false,
        });
        
        workload.totalTasks += tasks.length;
        
        tasks.forEach(task => {
          // Count by status
          const status = task.status.status;
          workload.tasksByStatus[status] = (workload.tasksByStatus[status] || 0) + 1;
          
          // Count by assignee
          task.assignees.forEach(assignee => {
            const assigneeId = assignee.id.toString();
            workload.tasksByAssignee[assigneeId] = (workload.tasksByAssignee[assigneeId] || 0) + 1;
          });
        });
      }
    }

    return workload;
  }

  // Utility method to check API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.getAuthorizedUser();
      return true;
    } catch (error) {
      console.error('ClickUp connection test failed:', error);
      return false;
    }
  }
}

// Export a default instance
export const clickupClient = new ClickUpClient();

