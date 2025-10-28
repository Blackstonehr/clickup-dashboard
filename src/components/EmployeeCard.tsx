import React from 'react';
import { HREmployee } from '@/types/clickup';
import { User, Mail, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface EmployeeCardProps {
  employee: HREmployee;
  onClick?: () => void;
  showStats?: boolean;
  className?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onClick,
  showStats = true,
  className,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (stats?: HREmployee['taskStats']) => {
    if (!stats || stats.total === 0) return 'gray';
    
    const completionRate = stats.completed / stats.total;
    const overdueRate = stats.overdue / stats.total;
    
    if (overdueRate > 0.2) return 'red';
    if (completionRate > 0.8) return 'green';
    if (completionRate > 0.6) return 'yellow';
    return 'blue';
  };

  const statusColor = getStatusColor(employee.taskStats);
  const statusColorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <div
      className={clsx(
        'card p-6 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-lg hover:scale-105',
        className
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {employee.profilePicture ? (
            <img
              src={employee.profilePicture}
              alt={employee.username}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: employee.color || '#6B7280' }}
            >
              {employee.initials || getInitials(employee.username)}
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.username}
            </h3>
            <p className="text-sm text-gray-600">
              {employee.position || 'Team Member'}
            </p>
            {employee.department && (
              <p className="text-xs text-gray-500">
                {employee.department}
              </p>
            )}
          </div>
        </div>
        
        {showStats && employee.taskStats && (
          <div className={clsx(
            'px-2 py-1 rounded-full text-xs font-medium border',
            statusColorClasses[statusColor]
          )}>
            {employee.taskStats.completed}/{employee.taskStats.total} tasks
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{employee.email}</span>
        </div>
        
        {employee.date_joined && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              Joined {format(new Date(employee.date_joined), 'MMM yyyy')}
            </span>
          </div>
        )}
      </div>

      {/* Task Statistics */}
      {showStats && employee.taskStats && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-lg font-semibold text-green-600">
                  {employee.taskStats.completed}
                </span>
              </div>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-lg font-semibold text-blue-600">
                  {employee.taskStats.inProgress}
                </span>
              </div>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-lg font-semibold text-red-600">
                  {employee.taskStats.overdue}
                </span>
              </div>
              <p className="text-xs text-gray-500">Overdue</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {employee.taskStats.total > 0 
                  ? Math.round((employee.taskStats.completed / employee.taskStats.total) * 100)
                  : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: employee.taskStats.total > 0 
                    ? `${(employee.taskStats.completed / employee.taskStats.total) * 100}%`
                    : '0%'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;

