import React from 'react';
import Layout from '@/components/Layout';
import DashboardWidget from '@/components/DashboardWidget';
import TaskSummary from '@/components/TaskSummary';
import EmployeeCard from '@/components/EmployeeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useClickUpData } from '@/hooks/useClickUpData';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { 
    dashboardData, 
    employees, 
    loading, 
    error, 
    lastUpdated, 
    refreshData 
  } = useClickUpData({ 
    autoRefresh: true, 
    refreshInterval: 300000 // 5 minutes
  });

  if (loading && !dashboardData) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" text="Loading dashboard data..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Dashboard">
        <div className="card p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshData}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </Layout>
    );
  }

  const taskSummary = dashboardData?.taskSummary;
  const teamMetrics = dashboardData?.teamMetrics?.[0];
  const recentActivity = dashboardData?.recentActivity || [];
  const topEmployees = employees.slice(0, 3);

  return (
    <Layout title="Dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of team performance and task management
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {lastUpdated && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                Last updated: {format(lastUpdated, 'MMM d, HH:mm')}
              </span>
            </div>
          )}
          
          <button
            onClick={refreshData}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardWidget
          title="Total Employees"
          value={dashboardData?.totalEmployees || 0}
          subtitle="Active team members"
          icon={Users}
          color="blue"
          trend={teamMetrics ? {
            value: 5,
            isPositive: true,
            label: 'vs last month'
          } : undefined}
        />
        
        <DashboardWidget
          title="Active Tasks"
          value={taskSummary?.totalTasks || 0}
          subtitle="Currently in progress"
          icon={CheckSquare}
          color="green"
          trend={taskSummary ? {
            value: 12,
            isPositive: true,
            label: 'vs last week'
          } : undefined}
        />
        
        <DashboardWidget
          title="Completion Rate"
          value={teamMetrics ? `${teamMetrics.completionRate}%` : '0%'}
          subtitle="Tasks completed on time"
          icon={TrendingUp}
          color="purple"
          trend={teamMetrics ? {
            value: 8,
            isPositive: true,
            label: 'vs last month'
          } : undefined}
        />
        
        <DashboardWidget
          title="Overdue Tasks"
          value={taskSummary?.overdueTasks || 0}
          subtitle="Require immediate attention"
          icon={AlertTriangle}
          color="red"
          trend={taskSummary ? {
            value: 15,
            isPositive: false,
            label: 'vs last week'
          } : undefined}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <TaskSummary
            tasks={recentActivity}
            title="Recent Activity"
            maxItems={8}
            showAssignees={true}
          />
        </div>

        {/* Team Overview */}
        <div className="space-y-6">
          {/* Team Performance */}
          {teamMetrics && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Team Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    {teamMetrics.completionRate}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${teamMetrics.completionRate}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {teamMetrics.memberCount}
                    </div>
                    <div className="text-xs text-gray-500">Team Members</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {teamMetrics.activeProjects}
                    </div>
                    <div className="text-xs text-gray-500">Active Projects</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    teamMetrics.workload === 'light' 
                      ? 'bg-green-100 text-green-800'
                      : teamMetrics.workload === 'moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {teamMetrics.workload.charAt(0).toUpperCase() + teamMetrics.workload.slice(1)} Workload
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Performers */}
          {topEmployees.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Performers
              </h3>
              
              <div className="space-y-4">
                {topEmployees.map((employee, index) => (
                  <div key={employee.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-1">
                      {employee.profilePicture ? (
                        <img
                          src={employee.profilePicture}
                          alt={employee.username}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ backgroundColor: employee.color || '#6B7280' }}
                        >
                          {employee.initials}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {employee.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {employee.taskStats?.completed || 0} tasks completed
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Status Breakdown */}
      {taskSummary && (
        <div className="mt-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Task Status Breakdown
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(taskSummary.tasksByStatus).map(([status, count]) => (
                <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {count}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {status.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DashboardPage;

