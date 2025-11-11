import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  className?: string;
  children?: React.ReactNode;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  className,
  children,
}) => {
  const colorClasses = {
    blue: {
      icon: 'text-blue-600 bg-blue-100',
      trend: 'text-blue-600',
    },
    green: {
      icon: 'text-green-600 bg-green-100',
      trend: 'text-green-600',
    },
    yellow: {
      icon: 'text-yellow-600 bg-yellow-100',
      trend: 'text-yellow-600',
    },
    red: {
      icon: 'text-red-600 bg-red-100',
      trend: 'text-red-600',
    },
    purple: {
      icon: 'text-purple-600 bg-purple-100',
      trend: 'text-purple-600',
    },
    gray: {
      icon: 'text-gray-600 bg-gray-100',
      trend: 'text-gray-600',
    },
  };

  return (
    <div className={clsx('card p-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {title}
            </h3>
            {Icon && (
              <div className={clsx('p-2 rounded-lg', colorClasses[color].icon)}>
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={clsx(
                    'text-sm font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;

