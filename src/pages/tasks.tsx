import React from 'react';
import Layout from '@/components/Layout';
import TaskSummary from '@/components/TaskSummary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRecentTasks } from '@/hooks/useClickUpData';
import { CheckSquare, Plus, Filter, Search } from 'lucide-react';

const TasksPage: React.FC = () => {
  const { tasks, loading, error, refetch } = useRecentTasks(50);

  if (loading) {
    return (
      <Layout title="Tasks">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" text="Loading tasks..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Tasks">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all team tasks and projects
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="input-field">
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            
            <select className="input-field">
              <option>All Assignees</option>
              <option>Assigned to Me</option>
              <option>Unassigned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Summary */}
      {error ? (
        <div className="card p-8 text-center">
          <CheckSquare className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Tasks
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={refetch} className="btn-primary">
            Try Again
          </button>
        </div>
      ) : (
        <TaskSummary
          tasks={tasks}
          title="All Tasks"
          maxItems={tasks.length}
          showAssignees={true}
        />
      )}
    </Layout>
  );
};

export default TasksPage;

