import React from 'react';
import Layout from '@/components/Layout';
import DashboardWidget from '@/components/DashboardWidget';
import { useClickUpData } from '@/hooks/useClickUpData';
import { BarChart3, TrendingUp, Users, Clock, Target, Award } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { dashboardData, employees, loading } = useClickUpData();

  const taskSummary = dashboardData?.taskSummary;
  const teamMetrics = dashboardData?.teamMetrics?.[0];

  return (
    <Layout title="Analytics">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-1">
          Detailed performance metrics and team insights
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardWidget
          title="Team Productivity"
          value={teamMetrics ? `${teamMetrics.completionRate}%` : '0%'}
          subtitle="Overall completion rate"
          icon={TrendingUp}
          color="green"
          trend={{
            value: 12,
            isPositive: true,
            label: 'vs last month'
          }}
        />
        
        <DashboardWidget
          title="Average Tasks per Employee"
          value={employees.length > 0 ? Math.round((taskSummary?.totalTasks || 0) / employees.length) : 0}
          subtitle="Current workload distribution"
          icon={Users}
          color="blue"
        />
        
        <DashboardWidget
          title="Task Completion Time"
          value="3.2 days"
          subtitle="Average time to complete"
          icon={Clock}
          color="purple"
          trend={{
            value: 8,
            isPositive: false,
            label: 'vs last month'
          }}
        />
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Status Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Task Status Distribution
          </h3>
          
          {taskSummary ? (
            <div className="space-y-4">
              {Object.entries(taskSummary.tasksByStatus).map(([status, count]) => {
                const percentage = taskSummary.totalTasks > 0 
                  ? Math.round((count / taskSummary.totalTasks) * 100) 
                  : 0;
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Team Performance */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance Metrics
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                <span className="text-sm text-gray-600">
                  {teamMetrics?.completionRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${teamMetrics?.completionRate || 0}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Active Projects</span>
                <span className="text-sm text-gray-600">
                  {teamMetrics?.activeProjects || 0}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Team Size</span>
                <span className="text-sm text-gray-600">
                  {teamMetrics?.memberCount || 0} members
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Workload Level</span>
                <span className={`text-sm font-medium capitalize ${
                  teamMetrics?.workload === 'light' ? 'text-green-600' :
                  teamMetrics?.workload === 'moderate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {teamMetrics?.workload || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Department Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from(new Set(employees.map(emp => emp.department || 'General')))
            .map(department => {
              const deptEmployees = employees.filter(emp => 
                (emp.department || 'General') === department
              );
              const totalTasks = deptEmployees.reduce((sum, emp) => 
                sum + (emp.taskStats?.total || 0), 0
              );
              const completedTasks = deptEmployees.reduce((sum, emp) => 
                sum + (emp.taskStats?.completed || 0), 0
              );
              const completionRate = totalTasks > 0 
                ? Math.round((completedTasks / totalTasks) * 100) 
                : 0;

              return (
                <div key={department} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{department}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>{deptEmployees.length} employees</div>
                    <div>{totalTasks} total tasks</div>
                    <div className="text-green-600 font-medium">
                      {completionRate}% completion
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Goals Met</h4>
          <div className="text-2xl font-bold text-green-600">85%</div>
          <p className="text-sm text-gray-600">of monthly targets</p>
        </div>
        
        <div className="card p-6 text-center">
          <Award className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Top Performer</h4>
          <div className="text-lg font-bold text-gray-900">
            {teamMetrics?.topPerformers?.[0]?.username || 'N/A'}
          </div>
          <p className="text-sm text-gray-600">this month</p>
        </div>
        
        <div className="card p-6 text-center">
          <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Efficiency</h4>
          <div className="text-2xl font-bold text-blue-600">92%</div>
          <p className="text-sm text-gray-600">team efficiency score</p>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;

