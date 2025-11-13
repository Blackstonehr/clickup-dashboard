import React from 'react';
import {
  TaskProgressBlock,
  TeamMetricsBlock,
  PriorityTasksBlock,
  EmployeeStatusBlock,
  ProjectTimelineBlock,
  QuickStatsBlock,
  ActivityFeedBlock
} from './CustomHtmlBlocks';

// Example usage component showing how to implement the custom blocks
export const HtmlBlockExamples = () => {
  // Sample data - replace with your actual ClickUp API data
  const sampleTeamMetrics = {
    tasksCompleted: 47,
    avgCompletionTime: "2.3d",
    activeProjects: 8,
    teamEfficiency: 87
  };

  const sampleEmployees = {
    online: 12,
    busy: 5,
    away: 3,
    offline: 2
  };

  const sampleProjects = [
    {
      name: "HR System Upgrade",
      dueDate: "Dec 15, 2024",
      progress: 75,
      status: 'on-track' as const
    },
    {
      name: "Employee Onboarding Portal",
      dueDate: "Nov 30, 2024",
      progress: 45,
      status: 'at-risk' as const
    },
    {
      name: "Performance Review System",
      dueDate: "Nov 20, 2024",
      progress: 20,
      status: 'delayed' as const
    }
  ];

  const sampleStats = {
    totalTasks: 156,
    completedToday: 23,
    overdueTasks: 7,
    upcomingDeadlines: 12
  };

  const sampleActivities = [
    {
      user: "Sarah Johnson",
      action: "completed task",
      target: "Employee Database Update",
      time: "2 minutes ago",
      type: 'task' as const
    },
    {
      user: "Mike Chen",
      action: "commented on",
      target: "Q4 Planning Meeting",
      time: "15 minutes ago",
      type: 'comment' as const
    },
    {
      user: "Lisa Rodriguez",
      action: "was assigned to",
      target: "Benefits Review Project",
      time: "1 hour ago",
      type: 'assignment' as const
    },
    {
      user: "David Kim",
      action: "created project",
      target: "Holiday Schedule Planning",
      time: "2 hours ago",
      type: 'project' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">ClickUp Dashboard - Custom HTML Blocks</h1>
        
        {/* Top Row - Quick Stats and Priority Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <QuickStatsBlock stats={sampleStats} />
          <PriorityTasksBlock urgentTasks={5} highPriorityTasks={12} />
        </div>

        {/* Second Row - Task Progress and Team Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TaskProgressBlock 
            title="Sprint Progress" 
            completed={18} 
            total={25} 
            color="green" 
          />
          <TeamMetricsBlock 
            teamName="HR Development Team" 
            metrics={sampleTeamMetrics} 
          />
        </div>

        {/* Third Row - Employee Status and Project Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EmployeeStatusBlock employees={sampleEmployees} />
          <ProjectTimelineBlock projects={sampleProjects} />
        </div>

        {/* Bottom Row - Activity Feed */}
        <div className="grid grid-cols-1 gap-6">
          <ActivityFeedBlock activities={sampleActivities} />
        </div>
      </div>
    </div>
  );
};

export default HtmlBlockExamples;

