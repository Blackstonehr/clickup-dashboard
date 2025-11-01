# Node.js Installation Helper for Windows
# This script will help you download and install Node.js

Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "           NODE.JS INSTALLATION HELPER FOR WINDOWS" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is already installed
Write-Host "Checking if Node.js is already installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is already installed: $nodeVersion" -ForegroundColor Green
    Write-Host ""
    
    $majorVersion = [int]($nodeVersion -replace 'v(\d+).*', '$1')
    if ($majorVersion -ge 18) {
        Write-Host "✅ Your Node.js version is compatible! (Need 18+)" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now proceed to install project dependencies:" -ForegroundColor Yellow
        Write-Host "   npm install" -ForegroundColor White
        exit
    } else {
        Write-Host "⚠️  Your Node.js version is too old (need 18+)" -ForegroundColor Yellow
        Write-Host "You should upgrade to the latest LTS version." -ForegroundColor Yellow
        Write-Host ""
    }
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
}

Write-Host ""
Write-Host "This script will help you download and install Node.js." -ForegroundColor Yellow
Write-Host ""

# Ask user if they want to proceed
$continue = Read-Host "Do you want to open the Node.js download page? (y/n)"
if ($continue -ne 'y' -and $continue -ne 'Y') {
    Write-Host "Installation cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Opening Node.js download page in your browser..." -ForegroundColor Green
Write-Host ""

# Open the Node.js download page
Start-Process "https://nodejs.org/"

Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host "INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host "==================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. On the Node.js website, you'll see TWO versions:" -ForegroundColor White
Write-Host "   - LTS (Long Term Support) ✅ RECOMMENDED" -ForegroundColor Green
Write-Host "   - Current (Latest features)" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Click the BIG GREEN BUTTON labeled 'LTS'" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. The installer (.msi file) will download automatically" -ForegroundColor White
Write-Host ""
Write-Host "4. When download completes:" -ForegroundColor White
Write-Host "   - Double-click the downloaded file" -ForegroundColor White
Write-Host "   - Click 'Next' through all installation screens" -ForegroundColor White
Write-Host "   - Accept the license agreement" -ForegroundColor White
Write-Host "   - Keep default settings" -ForegroundColor White
Write-Host "   - Make sure 'Automatically install tools' is checked" -ForegroundColor White
Write-Host "   - Click 'Install' and wait for it to finish" -ForegroundColor White
Write-Host ""
Write-Host "5. ⚠️  IMPORTANT: RESTART YOUR COMPUTER after installation!" -ForegroundColor Red
Write-Host ""
Write-Host "6. After restart, come back and run:" -ForegroundColor White
Write-Host "   powershell -ExecutionPolicy Bypass -File setup-helper.ps1" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter when you have completed the installation and restarted your computer"

# Check if Node.js is now installed
Write-Host ""
Write-Host "Verifying installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ SUCCESS! Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "==================================================================================" -ForegroundColor Cyan
    Write-Host "NODE.JS INSTALLATION COMPLETE!" -ForegroundColor Green
    Write-Host "==================================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Now you can install the ClickUp Dashboard dependencies:" -ForegroundColor Yellow
    Write-Host "   npm install" -ForegroundColor White
    Write-Host ""
    
    $installDeps = Read-Host "Do you want to install ClickUp Dashboard dependencies now? (y/n)"
    if ($installDeps -eq 'y' -or $installDeps -eq 'Y') {
        Write-Host ""
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        npm install
        Write-Host ""
        Write-Host "✅ Dependencies installed!" -ForegroundColor Green
    }
    
} catch {
    Write-Host "❌ Node.js is still not detected." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please make sure:" -ForegroundColor Yellow
    Write-Host "1. You completed the installation" -ForegroundColor White
    Write-Host "2. You RESTARTED your computer" -ForegroundColor White
    Write-Host "3. You closed and reopened PowerShell" -ForegroundColor White
    Write-Host ""
    Write-Host "If still not working, try installing manually:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download the Windows Installer" -ForegroundColor White
    Write-Host "3. Run the installer" -ForegroundColor White
    Write-Host "4. Restart computer" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

