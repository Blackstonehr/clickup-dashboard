# Download and Install Node.js

## 🎯 Direct Download Link

**Click this link to download Node.js for Windows:**
👉 **[https://nodejs.org/](https://nodejs.org/)**

---

## 📥 Quick Download Steps

### Step 1: Go to Node.js Website
Open: **https://nodejs.org/**

### Step 2: Choose Version
You'll see TWO big buttons:
- **LTS (Long Term Support)** ✅ **CLICK THIS ONE** - Recommended
- Current - Has latest features but less stable

### Step 3: Download
- Click the **LTS** button
- The file will download automatically
- Filename will be: `node-v20.x.x-x64.msi` (or similar)

### Step 4: Install
1. Find the downloaded file (usually in Downloads folder)
2. Double-click the `.msi` file
3. Click "Next" through all screens
4. ✅ Check "Automatically install the necessary tools"
5. Click "Install"
6. Wait for it to finish
7. Click "Finish"

### Step 5: RESTART YOUR COMPUTER ⚠️ **MUST DO THIS**

---

## ✅ Verify Installation

After restarting your computer, open PowerShell and run:

```powershell
node --version
```

You should see: `v20.x.x` (or similar)

Then run:
```powershell
npm --version
```

You should see: `10.x.x` (or similar)

---

## 🎉 After Installation

Once Node.js is installed, you can:

1. **Run the setup helper:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File setup-helper.ps1
   ```

2. **Or install dependencies manually:**
   ```powershell
   npm install
   ```

3. **Then start the ClickUp Dashboard:**
   ```powershell
   npm run dev
   ```

---

## 🆘 Having Issues?

### "The website won't open"
- Try: https://nodejs.org/en/download/
- Or search for "nodejs download" on Google

### "The download won't start"
- Right-click the LTS button and choose "Save link as..."
- Or click here: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

### "Installer won't run"
- Right-click the `.msi` file
- Choose "Run as administrator"
- Allow Windows to make changes

### "Still says node not recognized after restart"
- Make sure you RESTARTED (not just logged off)
- Close and reopen PowerShell
- Try opening PowerShell as Administrator

---

## 📋 What You'll Get

Installing Node.js will install:
- ✅ Node.js runtime (v20.x)
- ✅ npm (Node Package Manager)
- ✅ Other development tools

This is everything you need to run the ClickUp Dashboard!

---

## 🔗 Alternative Downloads

If the main site doesn't work:

### Official Alternatives
- **GitHub**: https://github.com/nodejs/node/releases
- **NodeSource**: https://nodesource.com/
- **Chocolatey** (package manager): `choco install nodejs-lts`
- **Winget** (Windows package manager): `winget install OpenJS.NodeJS.LTS`

---

**Ready?** [Click here to download Node.js](https://nodejs.org/) 🚀

After downloading and installing, come back and run the setup helper!

