import type { NextApiRequest, NextApiResponse } from 'next';
import { hrService } from '@/services/clickup-service';
import { HREmployee } from '@/types/clickup';

interface ApiResponse {
  success: boolean;
  data?: HREmployee[] | any;
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGetEmployees(req, res);
        break;
      default:
        res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}

async function handleGetEmployees(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { userId, performanceReport, days = '30' } = req.query;

  try {
    if (userId && typeof userId === 'string') {
      if (performanceReport === 'true') {
        // Get performance report for specific employee
        const report = await hrService.getEmployeePerformanceReport(
          userId, 
          parseInt(days as string)
        );
        
        res.status(200).json({
          success: true,
          data: report
        });
      } else {
        // Get specific employee with task stats
        const employees = await hrService.getEmployees();
        const employee = employees.find(emp => emp.id.toString() === userId);
        
        if (!employee) {
          return res.status(404).json({
            success: false,
            error: 'Employee not found'
          });
        }
        
        res.status(200).json({
          success: true,
          data: employee
        });
      }
    } else {
      // Get all employees
      const employees = await hrService.getEmployees();
      
      res.status(200).json({
        success: true,
        data: employees
      });
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch employee data'
    });
  }
}

