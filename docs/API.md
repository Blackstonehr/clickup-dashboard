# API Documentation

This document describes the internal API endpoints and ClickUp integration for the HR Dashboard.

## Overview

The HR Dashboard provides a REST API layer that interfaces with ClickUp's API to deliver HR-specific functionality. All endpoints return JSON responses and follow RESTful conventions.

## Base URL

```
http://localhost:3000/api  (development)
https://your-domain.com/api  (production)
```

## Authentication

All API requests to ClickUp are authenticated using the API token configured in environment variables. No additional authentication is required for internal API endpoints.

## Endpoints

### Dashboard Data

#### GET /api/clickup/dashboard

Returns comprehensive dashboard summary data including team metrics, task summaries, and recent activity.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEmployees": 12,
    "taskSummary": {
      "totalTasks": 45,
      "completedTasks": 32,
      "inProgressTasks": 10,
      "overdueTasks": 3,
      "tasksByStatus": {
        "open": 8,
        "in_progress": 10,
        "complete": 32
      },
      "tasksByPriority": {
        "urgent": 2,
        "high": 8,
        "normal": 25,
        "low": 10
      }
    },
    "teamMetrics": [{
      "teamId": "123456",
      "teamName": "HR Team",
      "memberCount": 12,
      "activeProjects": 5,
      "completionRate": 85,
      "workload": "moderate",
      "topPerformers": [...]
    }],
    "recentActivity": [...]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Failed to fetch dashboard data"
}
```

### Employee Management

#### GET /api/clickup/employees

Returns list of all employees with task statistics and performance data.

**Query Parameters:**
- `userId` (optional): Get specific employee data
- `performanceReport` (optional): Include detailed performance report
- `days` (optional): Number of days for performance analysis (default: 30)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 12345,
      "username": "john.doe",
      "email": "john@company.com",
      "color": "#FF6B6B",
      "profilePicture": "https://...",
      "initials": "JD",
      "role": 3,
      "custom_role": "HR Manager",
      "department": "Human Resources",
      "position": "HR Manager",
      "taskStats": {
        "total": 15,
        "completed": 12,
        "inProgress": 2,
        "overdue": 1
      },
      "last_active": "2024-01-15T10:30:00Z",
      "date_joined": "2023-06-01T00:00:00Z"
    }
  ]
}
```

#### GET /api/clickup/employees?userId=12345&performanceReport=true

Returns detailed performance report for a specific employee.

**Response:**
```json
{
  "success": true,
  "data": {
    "employee": { /* employee object */ },
    "tasksCompleted": 25,
    "averageCompletionTime": 3.2,
    "productivityScore": 87,
    "recentTasks": [...]
  }
}
```

### Task Management

#### GET /api/clickup/tasks

Retrieve tasks with filtering options.

**Query Parameters:**
- `listId` (required): ClickUp list ID
- `assignees` (optional): Comma-separated user IDs
- `statuses` (optional): Comma-separated status names
- `archived` (optional): Include archived tasks (default: false)
- `page` (optional): Page number for pagination
- `limit` (optional): Number of tasks to return (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task123",
      "name": "Complete onboarding documentation",
      "description": "Update employee handbook",
      "status": {
        "id": "status1",
        "status": "in_progress",
        "color": "#4CAF50",
        "type": "custom"
      },
      "assignees": [
        {
          "id": 12345,
          "username": "john.doe",
          "email": "john@company.com"
        }
      ],
      "due_date": "1705334400000",
      "priority": {
        "id": "priority1",
        "priority": "high",
        "color": "#FF5722"
      },
      "time_estimate": 7200000,
      "time_spent": 3600000,
      "tags": [
        {
          "name": "HR",
          "tag_bg": "#E3F2FD",
          "tag_fg": "#1976D2"
        }
      ],
      "date_created": "1704729600000",
      "date_updated": "1705075200000",
      "url": "https://app.clickup.com/t/task123"
    }
  ]
}
```

#### POST /api/clickup/tasks?listId=123456

Create a new task in the specified list.

**Request Body:**
```json
{
  "name": "New HR Task",
  "description": "Task description",
  "assignees": [12345, 67890],
  "status": "open",
  "priority": 2,
  "due_date": 1705334400000,
  "tags": ["HR", "Urgent"]
}
```

**Response:**
```json
{
  "success": true,
  "data": [{ /* created task object */ }],
  "message": "Task created successfully"
}
```

#### PUT /api/clickup/tasks?taskId=task123

Update an existing task.

**Request Body:**
```json
{
  "name": "Updated task name",
  "status": "complete",
  "add_assignees": [12345],
  "rem_assignees": [67890]
}
```

**Response:**
```json
{
  "success": true,
  "data": [{ /* updated task object */ }],
  "message": "Task updated successfully"
}
```

## ClickUp API Integration

### Client Configuration

The ClickUp client is configured with:
- Base URL: `https://api.clickup.com/api/v2`
- Authentication: Bearer token in Authorization header
- Timeout: 10 seconds
- Automatic retry on rate limits

### Rate Limiting

ClickUp API has rate limits:
- **Free plans**: 100 requests per minute
- **Paid plans**: 10,000 requests per hour

The client implements:
- Request queuing
- Automatic retry with exponential backoff
- Error handling for rate limit responses

### Error Handling

Common error responses:

**401 Unauthorized**
```json
{
  "success": false,
  "error": "Invalid API token"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

**404 Not Found**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Data Models

### Employee (HREmployee)

```typescript
interface HREmployee extends ClickUpUser {
  department?: string;
  position?: string;
  manager?: ClickUpUser;
  startDate?: string;
  taskStats?: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}
```

### Task Summary (HRTaskSummary)

```typescript
interface HRTaskSummary {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
  averageCompletionTime?: number;
}
```

### Team Metrics (HRTeamMetrics)

```typescript
interface HRTeamMetrics {
  teamId: string;
  teamName: string;
  memberCount: number;
  activeProjects: number;
  completionRate: number;
  workload: 'light' | 'moderate' | 'heavy';
  topPerformers: ClickUpUser[];
}
```

## Usage Examples

### Fetch Dashboard Data

```javascript
const response = await fetch('/api/clickup/dashboard');
const { success, data, error } = await response.json();

if (success) {
  console.log('Dashboard data:', data);
} else {
  console.error('Error:', error);
}
```

### Get Employee Performance

```javascript
const userId = '12345';
const response = await fetch(
  `/api/clickup/employees?userId=${userId}&performanceReport=true&days=30`
);
const { success, data } = await response.json();

if (success) {
  console.log('Performance report:', data);
}
```

### Create New Task

```javascript
const taskData = {
  name: 'Review employee handbook',
  description: 'Annual review of HR policies',
  assignees: [12345],
  priority: 2,
  due_date: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
};

const response = await fetch('/api/clickup/tasks?listId=123456', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(taskData)
});

const { success, data, message } = await response.json();
```

## Best Practices

### Caching

- Dashboard data is cached for 5 minutes
- Employee data is cached for 10 minutes
- Task data is cached for 2 minutes
- Use `Cache-Control` headers appropriately

### Error Handling

Always check the `success` field in responses:

```javascript
const { success, data, error } = await response.json();

if (!success) {
  // Handle error
  console.error('API Error:', error);
  return;
}

// Process data
console.log('Success:', data);
```

### Performance

- Use pagination for large datasets
- Implement client-side caching
- Batch requests when possible
- Monitor API usage to avoid rate limits

### Security

- Never expose API tokens in client-side code
- Validate all input parameters
- Implement proper CORS headers
- Use HTTPS in production

## Troubleshooting

### Common Issues

**"Invalid API Token"**
- Check environment variables
- Regenerate token in ClickUp
- Verify token permissions

**"Rate limit exceeded"**
- Reduce request frequency
- Implement request queuing
- Consider upgrading ClickUp plan

**"No data returned"**
- Verify team has data
- Check API permissions
- Ensure correct team ID

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=clickup:*
```

This will log all API requests and responses.

---

For more information, see the [Setup Guide](SETUP.md) or check the ClickUp API documentation at https://clickup.com/api.

