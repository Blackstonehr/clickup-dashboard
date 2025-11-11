# Setup Guide

This guide will walk you through setting up the ClickUp HR Dashboard from scratch.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- ClickUp account with admin access
- Git (for version control)

## Step 1: ClickUp API Setup

### 1.1 Generate API Token

1. Log into your ClickUp account
2. Go to **Settings** (click your avatar in the bottom left)
3. Navigate to **Apps** in the left sidebar
4. Find the **API Token** section
5. Click **Generate** to create a new token
6. **Important**: Copy this token immediately - you won't be able to see it again!

### 1.2 Find Your Team ID

**Method 1: From URL**
1. Go to your ClickUp workspace
2. Look at the URL: `https://app.clickup.com/{TEAM_ID}/`
3. The number after `clickup.com/` is your Team ID

**Method 2: Using API**
1. Use a tool like Postman or curl
2. Make a GET request to: `https://api.clickup.com/api/v2/team`
3. Include header: `Authorization: YOUR_API_TOKEN`
4. The response will contain your team information

### 1.3 Verify Permissions

Ensure your API token has access to:
- ✅ Read team members
- ✅ Read/write tasks
- ✅ Read spaces and lists
- ✅ Read time tracking data
- ✅ Read custom fields

## Step 2: Project Setup

### 2.1 Clone Repository

```bash
git clone <repository-url>
cd clickup-dashboard
```

### 2.2 Install Dependencies

```bash
npm install
# or
yarn install
```

### 2.3 Environment Configuration

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your credentials:
```env
# Required - ClickUp API Configuration
CLICKUP_API_TOKEN=pk_your_actual_token_here
CLICKUP_TEAM_ID=your_team_id_here

# Optional - Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

**Security Note**: Never commit your `.env.local` file to version control!

## Step 3: Test Connection

### 3.1 Start Development Server

```bash
npm run dev
```

### 3.2 Verify Setup

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the landing page
3. Navigate to the Dashboard
4. If setup is correct, you'll see your team data loading

### 3.3 Troubleshooting Connection Issues

**Error: "Invalid API Token"**
- Double-check your API token in `.env.local`
- Ensure there are no extra spaces or characters
- Regenerate the token if necessary

**Error: "Team not found"**
- Verify your Team ID is correct
- Make sure you have access to the team
- Try using the API method to find your Team ID

**Error: "No data loading"**
- Check browser console for errors
- Verify your team has spaces, lists, and tasks
- Ensure API token has proper permissions

## Step 4: Data Verification

### 4.1 Check Team Members

1. Go to **Employees** page
2. Verify team members are loading
3. Check that task statistics appear

### 4.2 Verify Task Data

1. Go to **Tasks** page
2. Confirm tasks are displaying
3. Check that filters work properly

### 4.3 Test Dashboard Metrics

1. Return to **Dashboard**
2. Verify all widgets show data
3. Check that recent activity appears

## Step 5: Customization

### 5.1 Configure Settings

1. Go to **Settings** page
2. Update notification preferences
3. Set dashboard refresh intervals
4. Configure default views

### 5.2 Department Setup

The system automatically detects departments from user roles. To optimize:

1. In ClickUp, ensure team members have descriptive roles
2. Use keywords like "HR", "Engineering", "Marketing" in roles
3. The system will automatically categorize employees

## Step 6: Production Deployment

### 6.1 Environment Variables

For production, set these environment variables:

```env
CLICKUP_API_TOKEN=your_production_token
CLICKUP_TEAM_ID=your_team_id
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secure_random_secret
```

### 6.2 Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

### 6.3 Deployment Platforms

**Vercel (Recommended)**
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically

**Other Platforms**
- Netlify: Use `npm run build` and deploy `out/` folder
- Railway: Connect repository and set environment variables
- Heroku: Use Node.js buildpack

## Common Issues and Solutions

### Issue: API Rate Limiting

**Symptoms**: Slow loading, timeout errors
**Solution**: 
- Reduce refresh frequency in settings
- Implement caching (future feature)
- Contact ClickUp for rate limit increase

### Issue: Missing Task Data

**Symptoms**: Tasks not appearing, empty lists
**Solution**:
- Check ClickUp permissions
- Verify spaces and lists exist
- Ensure tasks are not archived

### Issue: Performance Problems

**Symptoms**: Slow page loads, browser freezing
**Solution**:
- Reduce number of tasks loaded
- Check browser console for errors
- Clear browser cache

### Issue: Authentication Errors

**Symptoms**: "Unauthorized" errors, login loops
**Solution**:
- Regenerate API token
- Check token permissions
- Verify team membership

## Getting Help

If you encounter issues not covered here:

1. Check the [API Documentation](API.md)
2. Review browser console errors
3. Check ClickUp API status
4. Open an issue on GitHub with:
   - Error messages
   - Browser console logs
   - Steps to reproduce

## Next Steps

Once setup is complete:

1. Explore all dashboard features
2. Set up regular data monitoring
3. Configure team notifications
4. Plan for advanced features

---

**Need more help?** Check our [API Documentation](API.md) or open an issue on GitHub.

