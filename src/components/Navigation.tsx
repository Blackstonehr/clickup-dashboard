import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Building2
} from 'lucide-react';
import { clsx } from 'clsx';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and metrics'
    },
    {
      name: 'Employees',
      href: '/employees',
      icon: Users,
      description: 'Team member management'
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CheckSquare,
      description: 'Task tracking and assignment'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Performance insights'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Configuration and preferences'
    },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary-600" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">
                  BlackstoneHR
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  ClickUp Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                  title={item.description}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

