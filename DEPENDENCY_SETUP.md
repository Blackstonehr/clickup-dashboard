# Dependency & Credentials Setup Guide

## 🚨 Current Status

Node.js is **not installed** on this system. You'll need to install it first before proceeding.

## Step 1: Install Node.js

### Option A: Direct Download (Recommended)

1. **Go to Node.js website**: [https://nodejs.org/](https://nodejs.org/)
2. **Download the LTS version** (Long Term Support) - Version 18 or 20
3. **Run the installer** and follow the setup wizard
4. **Restart your terminal** after installation
5. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

### Option B: Using a Package Manager

#### Windows (Chocolatey)
```powershell
choco install nodejs-lts
```

#### Windows (Winget)
```powershell
winget install OpenJS.NodeJS.LTS
```

#### Windows (Scoop)
```powershell
scoop install nodejs-lts
```

## Step 2: Verify Node.js Installation

After installing Node.js, run these commands to verify:

```bash
# Check Node.js version (should be 18.x or higher)
node --version

# Check npm version (comes bundled with Node.js)
npm --version

# Check npm is in your PATH
where npm
```

Expected output:
```
v18.x.x or v20.x.x
9.x.x or 10.x.x
```

## Step 3: Install Project Dependencies

Navigate to your project directory and install dependencies:

```bash
cd "D:\Blackstone Contractor Solutions\OneDrive - Blackstone Contractor Solutions\Documents\clickup-dashboard"

# Install all dependencies (this may take 2-5 minutes)
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Lucide React
- date-fns
- And all other dependencies listed in `package.json`

Expected output:
```
added XXX packages, and audited XXX packages in XXs
```

## Step 4: Set Up ClickUp Credentials

### 4.1 Get Your ClickUp API Token

1. **Log in to ClickUp**: [https://app.clickup.com/](https://app.clickup.com/)
2. **Click your avatar** (bottom-left corner)
3. **Select "Settings"**
4. **Click "Apps"** in the sidebar
5. **Find "API Token"** section
6. **Click "Generate"** (or "Regenerate" if you already have one)
7. **Copy the token** - it starts with `pk_`
   - ⚠️ **Important**: Copy this token immediately - you won't be able to see it again!

### 4.2 Get Your ClickUp Team ID

**Method 1: From URL**
1. Go to your ClickUp workspace
2. Look at the URL in your browser
3. Extract the Team ID: `https://app.clickup.com/{TEAM_ID}/`
4. Copy just the `{TEAM_ID}` part (usually a 6-8 digit number)

**Method 2: Using API** (after you have your API token)
```bash
curl -H "Authorization: pk_YOUR_TOKEN_HERE" https://api.clickup.com/api/v2/team
```

The response will show your team information including the ID.

### 4.3 Create Environment File

1. **Copy the example file**:
   ```bash
   copy .env.local.example .env.local
   ```

2. **Edit `.env.local`** with your favorite text editor:
   ```env
   CLICKUP_API_TOKEN=pk_your_actual_token_here
   CLICKUP_TEAM_ID=your_actual_team_id_here
   ```

3. **Save the file**

⚠️ **Security Note**: Never commit `.env.local` to version control!

## Step 5: Test the Connection

### Start the Development Server

```bash
npm run dev
```

Expected output:
```
✓ Ready in X ms
○ Local: http://localhost:3000
```

### Open in Browser

1. Open your browser
2. Go to [http://localhost:3000](http://localhost:3000)
3. You should see the landing page
4. It will auto-redirect to the dashboard

### Verify Data is Loading

1. **Go to Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
2. **Look for**:
   - Employee count showing
   - Task statistics displaying
   - No error messages

If you see data, congratulations! ✅ Your setup is complete!

## 🔧 Troubleshooting

### Node.js Installation Issues

**"Node.js is not recognized"**
- Restart your terminal after installation
- Restart your computer if restarting terminal doesn't work
- Verify Node.js is in your PATH environment variable

**Wrong Node.js version**
```bash
# Check version
node --version

# If below 18.x, download and install latest LTS from nodejs.org
```

### NPM Installation Issues

**"npm is not recognized"**
- npm comes bundled with Node.js
- Reinstall Node.js if npm is missing
- Use the full installer from nodejs.org

**Installation fails or hangs**
```bash
# Clear npm cache
npm cache clean --force

# Try installing with verbose output
npm install --verbose

# Or try with different registry
npm install --registry https://registry.npmjs.org/
```

**Firewall/Corporate Network Issues**
```bash
# Configure npm proxy if behind corporate firewall
npm config set proxy http://your-proxy-server:port
npm config set https-proxy http://your-proxy-server:port
```

### ClickUp Credentials Issues

**"Invalid API Token"**
- Double-check token starts with `pk_`
- No extra spaces before or after
- Copy-paste directly, don't retype
- Regenerate token if still not working

**"Team not found"**
- Verify Team ID is correct
- Check you have access to that workspace
- Try using the API method to find Team ID

**"No data loading"**
- Open browser console (F12)
- Check for error messages
- Verify your ClickUp workspace has:
  - At least one Space
  - At least one List
  - At least one Task
  - At least one Team Member

### Port Already in Use

**Error: "Port 3000 is already in use"**
```bash
# Use a different port
npm run dev -- -p 3001

# Or find and kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Build Errors

**TypeScript errors during build**
```bash
# Check for type errors
npm run type-check

# Common fix: delete node_modules and reinstall
rm -r node_modules
npm install
```

**Module not found errors**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules
npm install
```

## 📋 Pre-Flight Checklist

Before starting the development server, ensure:

- [ ] Node.js 18+ is installed
- [ ] npm is working (`npm --version` returns a version)
- [ ] Project dependencies installed (`npm install` completed)
- [ ] `.env.local` file created
- [ ] ClickUp API token added to `.env.local`
- [ ] ClickUp Team ID added to `.env.local`
- [ ] No errors in terminal
- [ ] All files saved

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check TypeScript errors
npm run type-check

# Run linter
npm run lint
```

## 📞 Getting Help

### Still Having Issues?

1. **Check the error message** in your terminal
2. **Look at browser console** (F12 → Console tab)
3. **Review logs** for specific error patterns
4. **Verify credentials** are correct
5. **Check ClickUp API status**: [https://status.clickup.com/](https://status.clickup.com/)

### Useful Links

- **Node.js Installation**: [https://nodejs.org/](https://nodejs.org/)
- **ClickUp Settings**: [https://app.clickup.com/settings/apps](https://app.clickup.com/settings/apps)
- **ClickUp API Docs**: [https://developer.clickup.com/docs/authentication](https://developer.clickup.com/docs/authentication)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

## ✅ Success Indicators

You'll know everything is working when:

- ✅ `npm run dev` starts without errors
- ✅ Browser shows the landing page
- ✅ Dashboard displays real ClickUp data
- ✅ Employee list shows team members
- ✅ Tasks are visible
- ✅ No console errors
- ✅ Smooth navigation between pages

---

**Ready to get started?** Follow the steps above in order, and you'll be up and running in no time! 🚀

