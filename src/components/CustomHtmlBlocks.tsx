import React from 'react';

// Task Progress Card Block
export const TaskProgressBlock = ({ title, completed, total, color = "blue" }: {
  title: string;
  completed: number;
  total: number;
  color?: string;
}) => {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className={`bg-${color}-500 h-3 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{completed} of {total} tasks completed</p>
    </div>
  );
};

// Team Performance Metrics Block
export const TeamMetricsBlock = ({ teamName, metrics }: {
  teamName: string;
  metrics: {
    tasksCompleted: number;
    avgCompletionTime: string;
    activeProjects: number;
    teamEfficiency: number;
  };
}) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{teamName} Performance</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{metrics.tasksCompleted}</div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{metrics.avgCompletionTime}</div>
          <div className="text-sm text-gray-600">Avg Completion</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{metrics.activeProjects}</div>
          <div className="text-sm text-gray-600">Active Projects</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">{metrics.teamEfficiency}%</div>
          <div className="text-sm text-gray-600">Efficiency</div>
        </div>
      </div>
    </div>
  );
};

// Priority Tasks Alert Block
export const PriorityTasksBlock = ({ urgentTasks, highPriorityTasks }: {
  urgentTasks: number;
  highPriorityTasks: number;
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
        <h3 className="text-lg font-semibold text-red-800">Priority Tasks</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-red-700">Urgent Tasks</span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {urgentTasks}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-orange-700">High Priority</span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {highPriorityTasks}
          </span>
        </div>
      </div>
    </div>
  );
};

// Employee Status Block
export const EmployeeStatusBlock = ({ employees }: {
  employees: {
    online: number;
    busy: number;
    away: number;
    offline: number;
  };
}) => {
  const total = employees.online + employees.busy + employees.away + employees.offline;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Status</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Online</span>
          </div>
          <span className="font-semibold text-green-600">{employees.online}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Busy</span>
          </div>
          <span className="font-semibold text-yellow-600">{employees.busy}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Away</span>
          </div>
          <span className="font-semibold text-orange-600">{employees.away}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Offline</span>
          </div>
          <span className="font-semibold text-gray-600">{employees.offline}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center text-sm text-gray-600">
          Total Team Members: <span className="font-semibold">{total}</span>
        </div>
      </div>
    </div>
  );
};

// Project Timeline Block
export const ProjectTimelineBlock = ({ projects }: {
  projects: Array<{
    name: string;
    dueDate: string;
    progress: number;
    status: 'on-track' | 'at-risk' | 'delayed';
  }>;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Timeline</h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800">{project.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">Due: {project.dueDate}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{project.progress}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Stats Dashboard Block
export const QuickStatsBlock = ({ stats }: {
  stats: {
    totalTasks: number;
    completedToday: number;
    overdueTasks: number;
    upcomingDeadlines: number;
  };
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Today's Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{stats.totalTasks}</div>
          <div className="text-sm opacity-90">Total Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-300">{stats.completedToday}</div>
          <div className="text-sm opacity-90">Completed Today</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-300">{stats.overdueTasks}</div>
          <div className="text-sm opacity-90">Overdue</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-300">{stats.upcomingDeadlines}</div>
          <div className="text-sm opacity-90">Due Soon</div>
        </div>
      </div>
    </div>
  );
};

// Activity Feed Block
export const ActivityFeedBlock = ({ activities }: {
  activities: Array<{
    user: string;
    action: string;
    target: string;
    time: string;
    type: 'task' | 'project' | 'comment' | 'assignment';
  }>;
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task': return '✓';
      case 'project': return '📁';
      case 'comment': return '💬';
      case 'assignment': return '👤';
      default: return '•';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
            <div className="text-lg">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

