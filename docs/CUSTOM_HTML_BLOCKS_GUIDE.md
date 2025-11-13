# Custom HTML Blocks for ClickUp Dashboard

This guide provides you with ready-to-use custom HTML blocks that you can integrate into your ClickUp dashboard to enhance your HR and project management workflow.

## 📦 Available Blocks

### 1. **Task Progress Block**
Displays completion percentage with visual progress bar
- Shows completed vs total tasks
- Customizable colors
- Animated progress bar

### 2. **Team Performance Metrics Block**
Comprehensive team performance overview
- Tasks completed
- Average completion time
- Active projects count
- Team efficiency percentage

### 3. **Priority Tasks Alert Block**
Highlights urgent and high-priority tasks
- Animated alert indicator
- Color-coded priority levels
- Task count badges

### 4. **Employee Status Block**
Real-time team availability status
- Online/Busy/Away/Offline indicators
- Color-coded status dots
- Total team member count

### 5. **Project Timeline Block**
Visual project progress tracking
- Due dates
- Progress percentages
- Status indicators (on-track, at-risk, delayed)
- Color-coded status badges

### 6. **Quick Stats Dashboard Block**
Daily overview with key metrics
- Total tasks
- Completed today
- Overdue tasks
- Upcoming deadlines

### 7. **Activity Feed Block**
Recent team activity stream
- User actions
- Timestamps
- Activity type icons
- Scrollable feed

## 🚀 Implementation Options

### Option 1: React/TypeScript Components
Use the components in `src/components/CustomHtmlBlocks.tsx` for your Next.js application:

```tsx
import { TaskProgressBlock, TeamMetricsBlock } from './components/CustomHtmlBlocks';

// Example usage
<TaskProgressBlock 
  title="Sprint Progress" 
  completed={18} 
  total={25} 
  color="green" 
/>
```

### Option 2: Standalone HTML
Use the complete HTML file `src/components/StandaloneHtmlBlocks.html` for direct integration:
- Self-contained HTML with Tailwind CSS
- No dependencies required
- Copy and paste ready
- Interactive JavaScript included

### Option 3: Individual Block Integration
Copy specific blocks from the HTML file for targeted use in your existing dashboard.

## 🎨 Customization

### Colors
All blocks use Tailwind CSS classes. Common color variants:
- `blue-500`, `green-500`, `red-500`, `yellow-500`, `purple-500`
- `bg-blue-50`, `text-blue-600` for backgrounds and text

### Data Integration
Replace sample data with your ClickUp API data:

```javascript
// Example: Fetch from ClickUp API
const fetchTaskData = async () => {
  const response = await fetch('/api/clickup/tasks');
  const data = await response.json();
  return {
    completed: data.completed_tasks,
    total: data.total_tasks
  };
};
```

## 📊 Sample Data Structure

### Team Metrics
```javascript
const teamMetrics = {
  tasksCompleted: 47,
  avgCompletionTime: "2.3d",
  activeProjects: 8,
  teamEfficiency: 87
};
```

### Employee Status
```javascript
const employees = {
  online: 12,
  busy: 5,
  away: 3,
  offline: 2
};
```

### Project Timeline
```javascript
const projects = [
  {
    name: "HR System Upgrade",
    dueDate: "Dec 15, 2024",
    progress: 75,
    status: 'on-track'
  }
];
```

## 🔧 Integration with ClickUp API

### Authentication
```javascript
const CLICKUP_API_TOKEN = 'your_api_token';
const headers = {
  'Authorization': CLICKUP_API_TOKEN,
  'Content-Type': 'application/json'
};
```

### Fetching Tasks
```javascript
const fetchTasks = async (listId) => {
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task`,
    { headers }
  );
  return response.json();
};
```

### Fetching Team Members
```javascript
const fetchTeamMembers = async (teamId) => {
  const response = await fetch(
    `https://api.clickup.com/api/v2/team/${teamId}/member`,
    { headers }
  );
  return response.json();
};
```

## 🎯 Best Practices

1. **Real-time Updates**: Implement WebSocket connections or periodic API calls for live data
2. **Error Handling**: Add loading states and error boundaries
3. **Responsive Design**: All blocks are mobile-responsive using Tailwind CSS
4. **Performance**: Use React.memo() for components that don't change frequently
5. **Accessibility**: Ensure proper ARIA labels and keyboard navigation

## 🔄 Auto-refresh Implementation

```javascript
// Auto-refresh every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    fetchDashboardData();
  }, 30000);
  
  return () => clearInterval(interval);
}, []);
```

## 📱 Mobile Responsiveness

All blocks use responsive Tailwind classes:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- `text-sm md:text-base lg:text-lg`
- `p-4 md:p-6`

## 🎨 Theme Customization

Create custom themes by modifying the color schemes:

```css
/* Dark theme example */
.dark-theme {
  --bg-primary: #1f2937;
  --text-primary: #f9fafb;
  --accent-color: #3b82f6;
}
```

## 📈 Analytics Integration

Track block interactions:

```javascript
const trackBlockClick = (blockType, action) => {
  // Your analytics implementation
  analytics.track('Dashboard Block Interaction', {
    block_type: blockType,
    action: action,
    timestamp: new Date().toISOString()
  });
};
```

## 🚀 Getting Started

1. Choose your implementation method (React components or standalone HTML)
2. Copy the relevant files to your project
3. Replace sample data with your ClickUp API data
4. Customize colors and styling to match your brand
5. Add real-time data fetching
6. Test responsiveness across devices

## 📞 Support

For questions or customization requests, refer to the ClickUp API documentation or create an issue in your project repository.

