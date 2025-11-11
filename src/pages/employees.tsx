import React, { useState } from 'react';
import Layout from '@/components/Layout';
import EmployeeCard from '@/components/EmployeeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useClickUpData } from '@/hooks/useClickUpData';
import { HREmployee } from '@/types/clickup';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  AlertTriangle,
  UserPlus,
  Download
} from 'lucide-react';

const EmployeesPage: React.FC = () => {
  const { employees, loading, error, refreshData } = useClickUpData();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'department' | 'tasks' | 'completion'>('name');

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => {
      const matchesSearch = employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (employee.department || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || 
                               (employee.department || 'General') === departmentFilter;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.username.localeCompare(b.username);
        case 'department':
          return (a.department || 'General').localeCompare(b.department || 'General');
        case 'tasks':
          return (b.taskStats?.total || 0) - (a.taskStats?.total || 0);
        case 'completion':
          const aRate = a.taskStats?.total ? (a.taskStats.completed / a.taskStats.total) : 0;
          const bRate = b.taskStats?.total ? (b.taskStats.completed / b.taskStats.total) : 0;
          return bRate - aRate;
        default:
          return 0;
      }
    });

  // Get unique departments for filter
  const departments = Array.from(new Set(
    employees.map(emp => emp.department || 'General')
  )).sort();

  const handleEmployeeClick = (employee: HREmployee) => {
    // TODO: Navigate to employee detail page or open modal
    console.log('Employee clicked:', employee);
  };

  if (loading && employees.length === 0) {
    return (
      <Layout title="Employees">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" text="Loading employees..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Employees">
        <div className="card p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Employees
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

  return (
    <Layout title="Employees">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor your team's performance
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button className="btn-primary flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
          
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
          <div className="text-sm text-gray-600">Total Employees</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{departments.length}</div>
          <div className="text-sm text-gray-600">Departments</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {employees.reduce((sum, emp) => sum + (emp.taskStats?.total || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {employees.reduce((sum, emp) => sum + (emp.taskStats?.completed || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Completed Tasks</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="input-field min-w-0"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-field min-w-0"
              >
                <option value="name">Name</option>
                <option value="department">Department</option>
                <option value="tasks">Total Tasks</option>
                <option value="completion">Completion Rate</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredEmployees.length} of {employees.length} employees
            {searchTerm && ` matching "${searchTerm}"`}
            {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          </p>
        </div>
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="card p-12 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No employees found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || departmentFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No employees have been loaded yet.'
            }
          </p>
          {(searchTerm || departmentFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('all');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee)}
              showStats={true}
            />
          ))}
        </div>
      )}

      {/* Load More (if needed for pagination) */}
      {filteredEmployees.length > 0 && filteredEmployees.length < employees.length && (
        <div className="mt-8 text-center">
          <button className="btn-secondary">
            Load More Employees
          </button>
        </div>
      )}
    </Layout>
  );
};

export default EmployeesPage;

