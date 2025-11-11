# ClickUp HR Dashboard

A comprehensive HR dashboard built with Next.js and TypeScript that integrates with ClickUp's API to provide powerful employee management, task tracking, and performance analytics.

## 🚀 Features

### 📊 Dashboard Overview
- Real-time team performance metrics
- Task completion rates and trends
- Employee workload visualization
- Recent activity tracking

### 👥 Employee Management
- Complete team member directory
- Individual performance tracking
- Department-based organization
- Task statistics per employee

### ✅ Task Management
- Comprehensive task tracking
- Status-based filtering and sorting
- Assignment management
- Due date monitoring

### 📈 Analytics & Insights
- Team productivity metrics
- Department performance breakdown
- Completion rate trends
- Workload distribution analysis

### ⚙️ Configuration
- ClickUp API integration setup
- Notification preferences
- Dashboard customization
- Security settings

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: ClickUp API v2
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A ClickUp account with API access
- ClickUp API token
- ClickUp Team ID

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd clickup-dashboard
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your ClickUp credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your ClickUp credentials:

```env
CLICKUP_API_TOKEN=your_clickup_api_token_here
CLICKUP_TEAM_ID=your_team_id_here
```

### 3. Get Your ClickUp Credentials

#### API Token:
1. Go to ClickUp Settings → Apps
2. Click "Generate" next to API Token
3. Copy the generated token

#### Team ID:
1. Visit your ClickUp workspace
2. The Team ID is in the URL: `https://app.clickup.com/{TEAM_ID}/`
3. Or use the API: `GET https://api.clickup.com/api/v2/team`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Navigation bar
│   ├── DashboardWidget.tsx
│   ├── EmployeeCard.tsx
│   ├── TaskSummary.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Next.js pages
│   ├── index.tsx       # Landing page
│   ├── dashboard.tsx   # Main dashboard
│   ├── employees.tsx   # Employee management
│   ├── tasks.tsx       # Task management
│   ├── analytics.tsx   # Analytics page
│   ├── settings.tsx    # Configuration
│   └── api/            # API routes
│       └── clickup/    # ClickUp API endpoints
├── lib/                # Utility libraries
│   └── clickup-client.ts # ClickUp API client
├── services/           # Business logic
│   └── clickup-service.ts # HR-specific services
├── types/              # TypeScript definitions
│   └── clickup.ts      # ClickUp API types
├── hooks/              # Custom React hooks
│   └── useClickUpData.ts
└── styles/             # Global styles
    └── globals.css
```

## 🔧 Configuration

### ClickUp API Setup

1. **Generate API Token**:
   - Go to ClickUp → Settings → Apps
   - Generate a new API token
   - Add it to your `.env.local` file

2. **Find Team ID**:
   - Check your ClickUp workspace URL
   - Or use the API endpoint to list teams

3. **Permissions**:
   - Ensure your API token has access to:
     - Read team members
     - Read/write tasks
     - Read spaces and lists
     - Read time tracking data

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CLICKUP_API_TOKEN` | Your ClickUp API token | Yes |
| `CLICKUP_TEAM_ID` | Your ClickUp team/workspace ID | Yes |
| `NEXTAUTH_URL` | Application URL (for future auth) | No |
| `NEXTAUTH_SECRET` | NextAuth secret (for future auth) | No |

## 🎯 Usage

### Dashboard
- View team overview and key metrics
- Monitor recent task activity
- Track completion rates and trends

### Employee Management
- Browse team members by department
- View individual performance statistics
- Search and filter employees

### Task Tracking
- Monitor all team tasks
- Filter by status, assignee, or project
- Track due dates and priorities

### Analytics
- Analyze team productivity trends
- Compare department performance
- Identify top performers

## 🔌 API Endpoints

The application provides several API endpoints for integration:

- `GET /api/clickup/dashboard` - Dashboard summary data
- `GET /api/clickup/employees` - Employee list and stats
- `GET /api/clickup/tasks` - Task management
- `POST /api/clickup/tasks` - Create new tasks
- `PUT /api/clickup/tasks` - Update existing tasks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify
- Self-hosted with PM2

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Setup Guide](docs/SETUP.md)
2. Review the [API Documentation](docs/API.md)
3. Open an issue on GitHub

## 🔮 Roadmap

- [ ] Advanced analytics and reporting
- [ ] Slack integration for notifications
- [ ] Custom dashboard widgets
- [ ] Role-based access control
- [ ] Mobile app support
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Integration with other HR tools

---

Built with ❤️ for BlackstoneHR using ClickUp API
