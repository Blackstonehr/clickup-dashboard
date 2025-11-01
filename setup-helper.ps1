# ClickUp HR Dashboard - Setup Helper Script
# This script will guide you through the setup process

Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "           CLICKUP HR DASHBOARD - SETUP HELPER" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    # Check if version is 18 or higher
    $majorVersion = [int]($nodeVersion -replace 'v(\d+).*', '$1')
    if ($majorVersion -lt 18) {
        Write-Host "⚠️  Warning: Node.js version is below 18. Please install Node.js 18 or higher." -ForegroundColor Red
        Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
        exit
    }
} catch {
    Write-Host "❌ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download the LTS version" -ForegroundColor White
    Write-Host "3. Run the installer" -ForegroundColor White
    Write-Host "4. RESTART your computer" -ForegroundColor White
    Write-Host "5. Run this script again" -ForegroundColor White
    exit
}

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is NOT installed!" -ForegroundColor Red
    Write-Host "npm should come with Node.js. Please reinstall Node.js." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "Step 1: Installing Dependencies" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "⚠️  node_modules folder exists. Checking if dependencies are installed..." -ForegroundColor Yellow
    
    # Check if package.json dependencies match installed packages
    $shouldReinstall = Read-Host "Do you want to reinstall dependencies? (y/n)"
    if ($shouldReinstall -eq 'y' -or $shouldReinstall -eq 'Y') {
        Write-Host "Removing node_modules..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
        Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
    }
}

# Install dependencies
Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error installing dependencies!" -ForegroundColor Red
    Write-Host "Try running: npm cache clean --force" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "Step 2: Setting Up Environment Variables" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "Creating .env.local from .env.local.example..." -ForegroundColor Yellow
    
    if (Test-Path ".env.local.example") {
        Copy-Item ".env.local.example" ".env.local"
        Write-Host "✅ Created .env.local file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env.local.example not found. Creating default .env.local..." -ForegroundColor Yellow
        @"
# ClickUp API Configuration
CLICKUP_API_TOKEN=pk_your_clickup_api_token_here
CLICKUP_TEAM_ID=your_team_id_here
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "✅ Created .env.local file" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: You need to edit .env.local with your ClickUp credentials!" -ForegroundColor Red
    Write-Host ""
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "Step 3: Get Your ClickUp Credentials" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "You need to get your ClickUp credentials:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. API Token:" -ForegroundColor White
Write-Host "   - Go to: https://app.clickup.com/settings/apps" -ForegroundColor Cyan
Write-Host "   - Click 'Generate' next to API Token" -ForegroundColor White
Write-Host "   - Copy the token (starts with 'pk_')" -ForegroundColor White
Write-Host ""
Write-Host "2. Team ID:" -ForegroundColor White
Write-Host "   - Go to your ClickUp workspace" -ForegroundColor White
Write-Host "   - Look at the URL: https://app.clickup.com/{TEAM_ID}/" -ForegroundColor White
Write-Host "   - Copy the {TEAM_ID} number" -ForegroundColor White
Write-Host ""

$editNow = Read-Host "Do you want to open .env.local to edit it now? (y/n)"
if ($editNow -eq 'y' -or $editNow -eq 'Y') {
    notepad .env.local
}

Write-Host ""
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "Step 4: Start the Development Server" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

$startServer = Read-Host "Do you want to start the development server now? (y/n)"
if ($startServer -eq 'y' -or $startServer -eq 'Y') {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Yellow
    Write-Host "Once it's ready, open: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    
    npm run dev
} else {
    Write-Host ""
    Write-Host "==================================================================================" -ForegroundColor Cyan
    Write-Host "Setup Complete!" -ForegroundColor Green
    Write-Host "==================================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To start the development server later, run:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Don't forget to edit .env.local with your ClickUp credentials!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "For more help, see:" -ForegroundColor Cyan
    Write-Host "   - QUICK_START.md" -ForegroundColor White
    Write-Host "   - SETUP_INSTRUCTIONS.txt" -ForegroundColor White
    Write-Host "   - DEPENDENCY_SETUP.md" -ForegroundColor White
    Write-Host ""
}

