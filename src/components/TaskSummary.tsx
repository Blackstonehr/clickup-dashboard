import React from 'react';
import { ClickUpTask } from '@/types/clickup';
import { CheckCircle, Clock, AlertTriangle, User, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { clsx } from 'clsx';

interface TaskSummaryProps {
  tasks: ClickUpTask[];
  title?: string;
  showAssignees?: boolean;
  maxItems?: number;
  className?: string;
}

const TaskSummary: React.FC<TaskSummaryProps> = ({
  tasks,
  title = 'Recent Tasks',
  showAssignees = true,
  maxItems = 5,
  className,
}) => {
  const displayTasks = tasks.slice(0, maxItems);

  const getStatusIcon = (status: ClickUpTask['status']) => {
    switch (status.type) {
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'open':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: ClickUpTask['status']) => {
    switch (status.type) {
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPriorityColor = (priority?: ClickUpTask['priority']) => {
    if (!priority) return 'bg-gray-100 text-gray-600';
    
    switch (priority.priority.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'normal':
        return 'bg-blue-100 text-blue-700';
      case 'low':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const isOverdue = (task: ClickUpTask) => {
    if (!task.due_date) return false;
    const dueDate = new Date(parseInt(task.due_date));
    return dueDate < new Date() && task.status.type !== 'closed';
  };

  if (displayTasks.length === 0) {
    return (
      <div className={clsx('card p-6', className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('card p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">
          {displayTasks.length} of {tasks.length} tasks
        </span>
      </div>

      <div className="space-y-4">
        {displayTasks.map((task) => (
          <div
            key={task.id}
            className={clsx(
              'p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
              isOverdue(task) ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
            )}
          >
            {/* Task Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getStatusIcon(task.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {task.name}
                  </h4>
                  {task.text_content && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {task.text_content}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {task.priority && (
                  <span className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getPriorityColor(task.priority)
                  )}>
                    {task.priority.priority}
                  </span>
                )}
                
                <span className={clsx(
                  'px-2 py-1 text-xs font-medium rounded-full border',
                  getStatusColor(task.status)
                )}>
                  {task.status.status}
                </span>
              </div>
            </div>

            {/* Task Details */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                {/* Assignees */}
                {showAssignees && task.assignees.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>
                      {task.assignees.length === 1 
                        ? task.assignees[0].username
                        : `${task.assignees.length} assignees`
                      }
                    </span>
                  </div>
                )}
                
                {/* Due Date */}
                {task.due_date && (
                  <div className={clsx(
                    'flex items-center space-x-1',
                    isOverdue(task) && 'text-red-600 font-medium'
                  )}>
                    <Calendar className="h-3 w-3" />
                    <span>
                      Due {format(new Date(parseInt(task.due_date)), 'MMM d')}
                      {isOverdue(task) && ' (Overdue)'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Last Updated */}
              <div className="text-right">
                <span>
                  Updated {formatDistanceToNow(new Date(task.date_updated), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Time Tracking */}
            {(task.time_estimate || task.time_spent) && (
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                {task.time_estimate && (
                  <span>Est: {Math.round(task.time_estimate / 3600000)}h</span>
                )}
                {task.time_spent && (
                  <span>Spent: {Math.round(task.time_spent / 3600000)}h</span>
                )}
                {task.time_estimate && task.time_spent && (
                  <div className="flex-1 max-w-24">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={clsx(
                          'h-1 rounded-full',
                          task.time_spent > task.time_estimate ? 'bg-red-500' : 'bg-green-500'
                        )}
                        style={{
                          width: `${Math.min((task.time_spent / task.time_estimate) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: tag.tag_bg,
                      color: tag.tag_fg,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                    +{task.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.length > maxItems && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all {tasks.length} tasks →
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskSummary;

