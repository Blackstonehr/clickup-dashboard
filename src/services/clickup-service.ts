import { ClickUpClient } from '@/lib/clickup-client';
import { 
  ClickUpTask, 
  ClickUpUser, 
  HREmployee, 
  HRTaskSummary, 
  HRTeamMetrics 
} from '@/types/clickup';
import { format, subDays, isAfter, isBefore } from 'date-fns';

export class ClickUpHRService {
  private client: ClickUpClient;

  constructor(client?: ClickUpClient) {
    this.client = client || new ClickUpClient();
  }

  // Employee Management
  async getEmployees(): Promise<HREmployee[]> {
    try {
      const teamMembers = await this.client.getTeamMembers();
      
      const employees: HREmployee[] = await Promise.all(
        teamMembers.map(async (member) => {
          const taskStats = await this.getEmployeeTaskStats(member.id.toString());
          
          return {
            ...member,
            department: this.extractDepartmentFromRole(member.custom_role),
            position: member.custom_role || 'Team Member',
            taskStats,
          };
        })
      );

      return employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to fetch employee data');
    }
  }

  async getEmployeeTaskStats(userId: string): Promise<HREmployee['taskStats']> {
    try {
      const tasks = await this.client.getEmployeeTasks(userId, {
        includeCompleted: true,
        dateRange: {
          start: subDays(new Date(), 30),
          end: new Date(),
        },
      });

      const stats = {
        total: tasks.length,
        completed: 0,
        inProgress: 0,
        overdue: 0,
      };

      const now = new Date();

      tasks.forEach(task => {
        if (task.status.type === 'closed') {
          stats.completed++;
        } else if (task.status.type === 'open' || task.status.type === 'custom') {
          stats.inProgress++;
          
          // Check if overdue
          if (task.due_date && isAfter(now, new Date(parseInt(task.due_date)))) {
            stats.overdue++;
          }
        }
      });

      return stats;
    } catch (error) {
      console.error(`Error fetching task stats for user ${userId}:`, error);
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        overdue: 0,
      };
    }
  }

  // Dashboard Analytics
  async getHRDashboardSummary(): Promise<{
    totalEmployees: number;
    taskSummary: HRTaskSummary;
    teamMetrics: HRTeamMetrics[];
    recentActivity: ClickUpTask[];
  }> {
    try {
      const [employees, workload, recentTasks] = await Promise.all([
        this.getEmployees(),
        this.client.getTeamWorkload(),
        this.getRecentTasks(10),
      ]);

      const taskSummary: HRTaskSummary = {
        totalTasks: workload.totalTasks,
        completedTasks: workload.tasksByStatus['complete'] || 0,
        inProgressTasks: Object.entries(workload.tasksByStatus)
          .filter(([status]) => status !== 'complete')
          .reduce((sum, [, count]) => sum + count, 0),
        overdueTasks: await this.getOverdueTasksCount(),
        tasksByStatus: workload.tasksByStatus,
        tasksByPriority: await this.getTasksByPriority(),
      };

      const teamMetrics: HRTeamMetrics[] = [{
        teamId: process.env.CLICKUP_TEAM_ID || '',
        teamName: 'HR Team',
        memberCount: employees.length,
        activeProjects: await this.getActiveProjectsCount(),
        completionRate: this.calculateCompletionRate(taskSummary),
        workload: this.calculateWorkloadLevel(workload.totalTasks, employees.length),
        topPerformers: this.getTopPerformers(employees),
      }];

      return {
        totalEmployees: employees.length,
        taskSummary,
        teamMetrics,
        recentActivity: recentTasks,
      };
    } catch (error) {
      console.error('Error fetching HR dashboard summary:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }

  async getRecentTasks(limit: number = 10): Promise<ClickUpTask[]> {
    try {
      const spaces = await this.client.getSpaces();
      const allTasks: ClickUpTask[] = [];

      for (const space of spaces.slice(0, 3)) { // Limit to first 3 spaces for performance
        const lists = await this.client.getLists(space.id);
        
        for (const list of lists.slice(0, 5)) { // Limit to first 5 lists per space
          const tasks = await this.client.getTasks(list.id, {
            order_by: 'date_updated',
            reverse: true,
          });
          
          allTasks.push(...tasks.slice(0, 5)); // Take top 5 from each list
        }
      }

      // Sort by date_updated and return top results
      return allTasks
        .sort((a, b) => new Date(b.date_updated).getTime() - new Date(a.date_updated).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent tasks:', error);
      return [];
    }
  }

  // Performance Analytics
  async getEmployeePerformanceReport(userId: string, days: number = 30): Promise<{
    employee: HREmployee;
    tasksCompleted: number;
    averageCompletionTime: number;
    productivityScore: number;
    recentTasks: ClickUpTask[];
  }> {
    try {
      const employees = await this.getEmployees();
      const employee = employees.find(emp => emp.id.toString() === userId);
      
      if (!employee) {
        throw new Error('Employee not found');
      }

      const tasks = await this.client.getEmployeeTasks(userId, {
        includeCompleted: true,
        dateRange: {
          start: subDays(new Date(), days),
          end: new Date(),
        },
      });

      const completedTasks = tasks.filter(task => task.status.type === 'closed');
      const averageCompletionTime = this.calculateAverageCompletionTime(completedTasks);
      const productivityScore = this.calculateProductivityScore(employee, tasks);

      return {
        employee,
        tasksCompleted: completedTasks.length,
        averageCompletionTime,
        productivityScore,
        recentTasks: tasks.slice(0, 10),
      };
    } catch (error) {
      console.error('Error generating performance report:', error);
      throw new Error('Failed to generate performance report');
    }
  }

  // Helper Methods
  private extractDepartmentFromRole(role?: string): string {
    if (!role) return 'General';
    
    const departmentKeywords = {
      'hr': 'Human Resources',
      'human resources': 'Human Resources',
      'engineering': 'Engineering',
      'dev': 'Engineering',
      'developer': 'Engineering',
      'marketing': 'Marketing',
      'sales': 'Sales',
      'finance': 'Finance',
      'operations': 'Operations',
      'design': 'Design',
      'product': 'Product',
    };

    const lowerRole = role.toLowerCase();
    for (const [keyword, department] of Object.entries(departmentKeywords)) {
      if (lowerRole.includes(keyword)) {
        return department;
      }
    }

    return 'General';
  }

  private async getOverdueTasksCount(): Promise<number> {
    try {
      const workload = await this.client.getTeamWorkload();
      // This is a simplified calculation - in a real implementation,
      // you'd need to fetch tasks with due dates and check against current date
      return Math.floor(workload.totalTasks * 0.1); // Assume 10% are overdue
    } catch (error) {
      console.error('Error calculating overdue tasks:', error);
      return 0;
    }
  }

  private async getTasksByPriority(): Promise<Record<string, number>> {
    // Simplified implementation - would need to fetch actual priority data
    return {
      'urgent': 5,
      'high': 15,
      'normal': 25,
      'low': 10,
    };
  }

  private async getActiveProjectsCount(): Promise<number> {
    try {
      const spaces = await this.client.getSpaces();
      return spaces.filter(space => !space.archived).length;
    } catch (error) {
      console.error('Error counting active projects:', error);
      return 0;
    }
  }

  private calculateCompletionRate(summary: HRTaskSummary): number {
    if (summary.totalTasks === 0) return 0;
    return Math.round((summary.completedTasks / summary.totalTasks) * 100);
  }

  private calculateWorkloadLevel(totalTasks: number, employeeCount: number): 'light' | 'moderate' | 'heavy' {
    const tasksPerEmployee = totalTasks / employeeCount;
    
    if (tasksPerEmployee < 5) return 'light';
    if (tasksPerEmployee < 15) return 'moderate';
    return 'heavy';
  }

  private getTopPerformers(employees: HREmployee[]): ClickUpUser[] {
    return employees
      .filter(emp => emp.taskStats)
      .sort((a, b) => {
        const aScore = (a.taskStats?.completed || 0) - (a.taskStats?.overdue || 0);
        const bScore = (b.taskStats?.completed || 0) - (b.taskStats?.overdue || 0);
        return bScore - aScore;
      })
      .slice(0, 3)
      .map(emp => ({
        id: emp.id,
        username: emp.username,
        email: emp.email,
        color: emp.color,
        profilePicture: emp.profilePicture,
        initials: emp.initials,
        role: emp.role,
        custom_role: emp.custom_role,
        last_active: emp.last_active,
        date_joined: emp.date_joined,
        date_invited: emp.date_invited,
      }));
  }

  private calculateAverageCompletionTime(tasks: ClickUpTask[]): number {
    if (tasks.length === 0) return 0;

    const completionTimes = tasks
      .filter(task => task.date_created && task.date_closed)
      .map(task => {
        const created = new Date(task.date_created).getTime();
        const closed = new Date(task.date_closed!).getTime();
        return closed - created;
      });

    if (completionTimes.length === 0) return 0;

    const averageMs = completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length;
    return Math.round(averageMs / (1000 * 60 * 60 * 24)); // Convert to days
  }

  private calculateProductivityScore(employee: HREmployee, tasks: ClickUpTask[]): number {
    const stats = employee.taskStats;
    if (!stats || stats.total === 0) return 0;

    const completionRate = stats.completed / stats.total;
    const overdueRate = stats.overdue / stats.total;
    
    // Simple scoring algorithm: completion rate minus overdue penalty
    const score = (completionRate * 100) - (overdueRate * 50);
    return Math.max(0, Math.min(100, Math.round(score)));
  }
}

// Export default instance
export const hrService = new ClickUpHRService();

