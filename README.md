# ClickUp HR Dashboard

A comprehensive HR dashboard built with Next.js and TypeScript that integrates with ClickUp's API to provide powerful employee management, task tracking, and performance analytics.

## 🚀 Quick Start

Get started in 5 minutes! See [QUICK_START.md](QUICK_START.md) for detailed instructions.

```bash
# Install dependencies
npm install

# Configure environment
copy .env.local.example .env.local
# Edit .env.local with your ClickUp credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- **[Setup Guide](docs/SETUP.md)** - Detailed setup instructions
- **[API Documentation](docs/API.md)** - API endpoint reference
- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)** - Technical details
- **[Project Summary](PROJECT_SUMMARY.md)** - Complete overview

## ✨ Features

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
- ClickUp API token (from [Settings → Apps](https://app.clickup.com/settings/apps))
- ClickUp Team ID (from your workspace URL)

## 🔧 Configuration

### Get Your ClickUp Credentials

**API Token:**
1. Go to ClickUp Settings → Apps
2. Click "Generate" next to API Token
3. Copy the generated token

**Team ID:**
1. Visit your ClickUp workspace
2. The Team ID is in the URL: `https://app.clickup.com/{TEAM_ID}/`
3. Or use the API: `GET https://api.clickup.com/api/v2/team`

### Environment Variables

Create `.env.local` with:

```env
CLICKUP_API_TOKEN=your_clickup_api_token_here
CLICKUP_TEAM_ID=your_team_id_here
```

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

## 🔍 Testing

### Manual Testing Checklist

- [ ] Dashboard loads with real data
- [ ] Employee list displays correctly
- [ ] Task filtering works
- [ ] Search functionality operational
- [ ] Analytics render properly
- [ ] Mobile responsive design
- [ ] Error handling displays correctly
- [ ] Auto-refresh works

## 🆘 Troubleshooting

**Error: "Invalid API Token"**
- Double-check your API token in `.env.local`
- Ensure there are no extra spaces or characters
- Regenerate the token if necessary

**Error: "Team not found"**
- Verify your Team ID is correct
- Make sure you have access to the team
- Try using the API to find your Team ID

**No data loading**
- Check browser console for errors
- Verify your team has spaces, lists, and tasks
- Ensure API token has proper permissions

**Port already in use**
```bash
npm run dev -- -p 3001
```

More help in [SETUP.md](docs/SETUP.md)

## 🔮 Roadmap

- [ ] Advanced analytics and reporting
- [ ] Slack integration for notifications
- [ ] Custom dashboard widgets
- [ ] Role-based access control
- [ ] Mobile app support
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Integration with other HR tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Setup Guide](docs/SETUP.md)
2. Review the [API Documentation](docs/API.md)
3. See [Quick Start](QUICK_START.md) for common issues
4. Open an issue on GitHub

---

Built with ❤️ for BlackstoneHR using ClickUp API