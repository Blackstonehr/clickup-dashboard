# Get Your ClickUp API Credentials

You need **two things** from ClickUp to run the dashboard:

## 🔑 Credential #1: API Token

### How to Get It:

1. **Open ClickUp** in your browser:
   👉 [https://app.clickup.com/](https://app.clickup.com/)

2. **Sign in** with your BlackstoneHR account

3. **Click your profile picture** (bottom-left corner)

4. **Click "Settings"**

5. **Click "Apps"** in the left sidebar

6. **Find "API Token"** section

7. **Click "Generate"** (or "Regenerate" if you already have one)

8. **IMMEDIATELY COPY THE TOKEN**
   - It starts with `pk_`
   - Example: `pk_12345_abcdefghijklmnopqrstuvwxyz`
   - ⚠️ **You can only see it once!**

---

## 🆔 Credential #2: Team ID

### Method 1: From URL (Easiest)

1. **Go to your ClickUp workspace** (any workspace)

2. **Look at the URL** in your browser's address bar

3. **It will look like this:**
   ```
   https://app.clickup.com/12345678/v/li/123456789
   ```

4. **Your Team ID is the number right after `/`:**
   ```
   https://app.clickup.com/12345678/...
                                ^^^^^^^^
                            This is your Team ID
   ```

5. **Copy just that number** (usually 6-8 digits)

### Method 2: Using API

After you have your API token, you can find your Team ID with:

1. Open PowerShell
2. Run this command (replace `YOUR_TOKEN` with your actual token):
   ```powershell
   curl -H "Authorization: pk_YOUR_TOKEN" https://api.clickup.com/api/v2/team
   ```
3. Look for `"id":` in the response - that's your Team ID

---

## ✅ Checklist

Before proceeding, make sure you have:

- [ ] API Token (starts with `pk_`)
- [ ] Team ID (6-8 digit number)

---

## 📝 Next Steps

Once you have both credentials:

1. **Create environment file:**
   ```powershell
   copy .env.local.example .env.local
   ```

2. **Edit the file** with Notepad:
   ```powershell
   notepad .env.local
   ```

3. **Add your credentials:**
   ```env
   CLICKUP_API_TOKEN=pk_your_actual_token_here
   CLICKUP_TEAM_ID=your_actual_team_id_here
   ```
   
4. **Save and close**

5. **Continue with installation**

---

## 🔗 Quick Links

- **ClickUp Settings**: [https://app.clickup.com/settings/apps](https://app.clickup.com/settings/apps)
- **ClickUp Workspace**: [https://app.clickup.com/](https://app.clickup.com/)
- **API Documentation**: [https://developer.clickup.com/docs/authentication](https://developer.clickup.com/docs/authentication)

---

## 🆘 Help

**"I can't find the Settings menu"**
→ Click your avatar/profile picture in the bottom-left corner, then "Settings"

**"There's no Apps option"**
→ Make sure you're in the Settings page, then look in the left sidebar

**"API Token section doesn't exist"**
→ You might need admin access. Contact your ClickUp workspace admin.

**"I can't find my Team ID in the URL"**
→ Try Method 2 using the API instead

**"I lost my API token"**
→ You can't recover it. Generate a new one by clicking "Regenerate"

---

**Ready?** Get both credentials and then we'll configure everything!

