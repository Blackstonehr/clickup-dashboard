# Quick Start Guide

Get your ClickUp HR Dashboard up and running in 5 minutes!

## ⚡ Prerequisites

- Node.js 18 or higher ([Download](https://nodejs.org/))
- ClickUp account with API access

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Get Your ClickUp Credentials

#### Get API Token:
1. Go to [ClickUp Settings → Apps](https://app.clickup.com/settings/apps)
2. Click **Generate** next to "API Token"
3. Copy your token (starts with `pk_`)

#### Get Team ID:
1. Open your ClickUp workspace
2. Look at the URL: `https://app.clickup.com/{TEAM_ID}/`
3. Copy the `{TEAM_ID}` part

### Step 3: Configure Environment

```bash
copy .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
CLICKUP_API_TOKEN=pk_your_actual_token_here
CLICKUP_TEAM_ID=your_actual_team_id_here
```

### Step 4: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ What You'll See

1. **Landing Page** - Beautiful intro with auto-redirect
2. **Dashboard** - Key metrics and team overview
3. **Employees** - Full team directory
4. **Tasks** - All your ClickUp tasks
5. **Analytics** - Performance insights
6. **Settings** - Configure preferences

## 🔧 Troubleshooting

### "npm is not recognized"
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

### "Invalid API Token"
- Double-check your token in `.env.local`
- Make sure there are no extra spaces
- Regenerate the token if needed

### "Team not found"
- Verify your Team ID is correct
- Ensure you have access to that team
- Try the API endpoint: `GET /api/v2/team`

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

## 📚 Next Steps

- Read the full [Setup Guide](docs/SETUP.md)
- Explore the [API Documentation](docs/API.md)
- Check the [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- Customize colors in `tailwind.config.js`
- Configure dashboard settings in Settings page

## 🐛 Need Help?

Check the [Setup Guide](docs/SETUP.md) for detailed troubleshooting.

---

**Happy coding! 🎉**

