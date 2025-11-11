import type { NextApiRequest, NextApiResponse } from 'next';
import { clickupClient } from '@/lib/clickup-client';
import { ClickUpTask } from '@/types/clickup';

interface ApiResponse {
  success: boolean;
  data?: ClickUpTask[];
  error?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGetTasks(req, res);
        break;
      case 'POST':
        await handleCreateTask(req, res);
        break;
      case 'PUT':
        await handleUpdateTask(req, res);
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

async function handleGetTasks(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { 
    listId, 
    assignees, 
    statuses, 
    archived = 'false',
    page = '0',
    limit = '50'
  } = req.query;

  if (!listId || typeof listId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'listId is required'
    });
  }

  try {
    const options: any = {
      archived: archived === 'true',
      page: parseInt(page as string),
    };

    if (assignees && typeof assignees === 'string') {
      options.assignees = assignees.split(',');
    }

    if (statuses && typeof statuses === 'string') {
      options.statuses = statuses.split(',');
    }

    const tasks = await clickupClient.getTasks(listId, options);
    
    // Apply client-side limit if needed
    const limitNum = parseInt(limit as string);
    const limitedTasks = limitNum > 0 ? tasks.slice(0, limitNum) : tasks;

    res.status(200).json({
      success: true,
      data: limitedTasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
}

async function handleCreateTask(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { listId } = req.query;
  const taskData = req.body;

  if (!listId || typeof listId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'listId is required'
    });
  }

  if (!taskData.name) {
    return res.status(400).json({
      success: false,
      error: 'Task name is required'
    });
  }

  try {
    const newTask = await clickupClient.createTask(listId, taskData);
    
    res.status(201).json({
      success: true,
      data: [newTask],
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
}

async function handleUpdateTask(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  const { taskId } = req.query;
  const updates = req.body;

  if (!taskId || typeof taskId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'taskId is required'
    });
  }

  try {
    const updatedTask = await clickupClient.updateTask(taskId, updates);
    
    res.status(200).json({
      success: true,
      data: [updatedTask],
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
}

