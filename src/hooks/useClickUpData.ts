import { useState, useEffect, useCallback } from 'react';
import { hrService } from '@/services/clickup-service';
import { HREmployee, ClickUpTask, HRTaskSummary, HRTeamMetrics } from '@/types/clickup';

interface UseClickUpDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface DashboardData {
  totalEmployees: number;
  taskSummary: HRTaskSummary;
  teamMetrics: HRTeamMetrics[];
  recentActivity: ClickUpTask[];
}

export const useClickUpData = (options: UseClickUpDataOptions = {}) => {
  const { autoRefresh = false, refreshInterval = 300000 } = options; // 5 minutes default

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [employees, setEmployees] = useState<HREmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await hrService.getHRDashboardSummary();
      setDashboardData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const employeeData = await hrService.getEmployees();
      setEmployees(employeeData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch employee data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchDashboardData(),
      fetchEmployees(),
    ]);
  }, [fetchDashboardData, fetchEmployees]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshData]);

  return {
    // Data
    dashboardData,
    employees,
    
    // State
    loading,
    error,
    lastUpdated,
    
    // Actions
    refreshData,
    fetchDashboardData,
    fetchEmployees,
  };
};

export const useEmployeePerformance = (userId: string, days: number = 30) => {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformanceData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      
      const data = await hrService.getEmployeePerformanceReport(userId, days);
      setPerformanceData(data);
    } catch (err) {
      console.error('Error fetching performance data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch performance data');
    } finally {
      setLoading(false);
    }
  }, [userId, days]);

  useEffect(() => {
    fetchPerformanceData();
  }, [fetchPerformanceData]);

  return {
    performanceData,
    loading,
    error,
    refetch: fetchPerformanceData,
  };
};

export const useRecentTasks = (limit: number = 10) => {
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const recentTasks = await hrService.getRecentTasks(limit);
      setTasks(recentTasks);
    } catch (err) {
      console.error('Error fetching recent tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch recent tasks');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentTasks();
  }, [fetchRecentTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchRecentTasks,
  };
};

// Utility hook for handling API errors
export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown) => {
    console.error('API Error:', err);
    
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === 'string') {
      setError(err);
    } else {
      setError('An unexpected error occurred');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};

