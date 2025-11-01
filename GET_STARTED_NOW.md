# 🚀 GET STARTED RIGHT NOW!

## ⚡ Quick Decision Tree

Are you ready to set up the ClickUp HR Dashboard? Follow these steps:

```
START HERE
    |
    ├─> Do you have Node.js installed?
    |   |
    |   NO ──→ [INSTALL NODE.JS FIRST] ← Go to Section A below
    |   |
    |   YES ──→ Continue to next step ✓
    |
    ├─> Are dependencies installed?
    |   |
    |   NO ──→ [INSTALL DEPENDENCIES] ← Go to Section B below
    |   |
    |   YES ──→ Continue to next step ✓
    |
    ├─> Do you have ClickUp credentials?
    |   |
    |   NO ──→ [GET CREDENTIALS] ← Go to Section C below
    |   |
    |   YES ──→ Continue to next step ✓
    |
    └─> Configure and run! ──→ [SECTION D] ✓
```

---

## 📍 SECTION A: Install Node.js

**⏱ Time: 5 minutes**

### Windows (Current System)

1. **Download Node.js**
   - Open: https://nodejs.org/
   - Click the big green "LTS" button (v20.x.x)
   - The .msi file will download

2. **Install Node.js**
   - Double-click the downloaded file
   - Click "Next" through all screens
   - Check "Automatically install the necessary tools"
   - Click "Finish"

3. **RESTART YOUR COMPUTER** ⚠️ **IMPORTANT**

4. **Verify Installation**
   - Open PowerShell
   - Run: `node --version`
   - Should show: `v20.x.x`
   - Run: `npm --version`  
   - Should show: `10.x.x`

✅ **Once you see both versions, come back here and go to Section B**

---

## 📦 SECTION B: Install Project Dependencies

**⏱ Time: 2-5 minutes**

1. **Open PowerShell** in this folder:
   ```
   D:\Blackstone Contractor Solutions\OneDrive - Blackstone Contractor Solutions\Documents\clickup-dashboard
   ```

2. **Run this command:**
   ```powershell
   npm install
   ```

3. **Wait for it to finish**
   - You'll see: `added XXX packages in XXs`
   - This is normal and takes a few minutes

4. **If you get errors**, run these in order:
   ```powershell
   npm cache clean --force
   npm install
   ```

✅ **Once dependencies are installed, go to Section C**

---

## 🔑 SECTION C: Get ClickUp Credentials

**⏱ Time: 3 minutes**

### Get Your API Token

1. **Sign in to ClickUp**
   - Go to: https://app.clickup.com/
   - Use your BlackstoneHR account

2. **Navigate to Settings**
   - Click your avatar (bottom-left)
   - Click "Settings"
   - Click "Apps" (left sidebar)

3. **Generate API Token**
   - Find "API Token" section
   - Click "Generate" or "Regenerate"
   - **IMMEDIATELY COPY THE TOKEN**
   - It starts with `pk_`
   - ⚠️ You can't see it again!

### Get Your Team ID

**Easiest Method:**

1. Go to your ClickUp workspace
2. Look at the URL in your browser
3. Copy the number after `/`: `https://app.clickup.com/12345678/`
4. Your Team ID is: `12345678`

✅ **You now have both credentials! Go to Section D**

---

## ⚙️ SECTION D: Configure and Run

**⏱ Time: 2 minutes**

### Configure Environment

1. **Create the environment file**
   ```powershell
   copy .env.local.example .env.local
   ```

2. **Edit the file**
   - Right-click `.env.local`
   - Choose "Open with Notepad"
   - Edit these two lines:
   ```env
   CLICKUP_API_TOKEN=pk_your_actual_token_here
   CLICKUP_TEAM_ID=your_actual_team_id_here
   ```
   - Replace with your actual values
   - Save and close

### Start the Application

1. **Run the development server**
   ```powershell
   npm run dev
   ```

2. **Wait for it to start**
   - You'll see: `✓ Ready in X ms`
   - You'll see: `○ Local: http://localhost:3000`

3. **Open your browser**
   - Go to: http://localhost:3000
   - You should see the ClickUp HR Dashboard! 🎉

✅ **YOU'RE DONE! The dashboard is running!**

---

## 🎯 Quick Reference Commands

```powershell
# Check Node.js installation
node --version
npm --version

# Install dependencies
npm install

# Create environment file
copy .env.local.example .env.local

# Start development server
npm run dev

# Stop server
Ctrl+C

# Use different port if 3000 is busy
npm run dev -- -p 3001
```

---

## 🆘 Having Problems?

### "Node.js is not recognized"
→ Install Node.js from nodejs.org and **RESTART your computer**

### "npm is not recognized"  
→ Reinstall Node.js and **RESTART your computer**

### "Port 3000 already in use"
→ Use a different port: `npm run dev -- -p 3001`

### "Invalid API Token"
→ Make sure token starts with `pk_` and has no extra spaces

### "Team not found"
→ Double-check your Team ID number is correct

### Still stuck?
→ See [SETUP_INSTRUCTIONS.txt](SETUP_INSTRUCTIONS.txt) for detailed help

---

## 📚 What's Next?

Once the dashboard is running:

1. **Explore the Dashboard** - See your team metrics
2. **View Employees** - Browse your team directory
3. **Check Tasks** - See all ClickUp tasks
4. **Analytics** - Review performance insights
5. **Settings** - Customize preferences

---

## 🎉 Success Checklist

Your setup is complete when:

- ✅ `npm run dev` runs without errors
- ✅ Browser shows http://localhost:3000
- ✅ Dashboard displays real data
- ✅ No console errors
- ✅ Navigation works smoothly

**Congratulations! You now have a working ClickUp HR Dashboard!** 🚀

---

**Need more help?**

- [QUICK_START.md](QUICK_START.md) - Quick reference
- [SETUP_INSTRUCTIONS.txt](SETUP_INSTRUCTIONS.txt) - Detailed instructions  
- [DEPENDENCY_SETUP.md](DEPENDENCY_SETUP.md) - Dependency help
- [docs/SETUP.md](docs/SETUP.md) - Full documentation

---

*Follow these steps in order and you'll be up and running in about 10 minutes!*

