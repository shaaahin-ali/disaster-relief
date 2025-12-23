# Disaster Relief Platform - Setup Verification Script
# This script checks if everything is set up correctly

Write-Host "🔍 Verifying Disaster Relief Platform Setup..." -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✅ Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Python not found" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check Backend Directory
Write-Host "Checking Backend..." -ForegroundColor Yellow
if (Test-Path "backend") {
    Write-Host "  ✅ Backend directory exists" -ForegroundColor Green
    
    if (Test-Path "backend\requirements.txt") {
        Write-Host "  ✅ requirements.txt found" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  requirements.txt not found" -ForegroundColor Yellow
    }
    
    if (Test-Path "backend\main.py") {
        Write-Host "  ✅ main.py found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ main.py not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ❌ Backend directory not found" -ForegroundColor Red
    $allGood = $false
}

# Check Frontend Directory
Write-Host "Checking Frontend..." -ForegroundColor Yellow
if (Test-Path "sahay-react") {
    Write-Host "  ✅ Frontend directory exists" -ForegroundColor Green
    
    if (Test-Path "sahay-react\package.json") {
        Write-Host "  ✅ package.json found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ package.json not found" -ForegroundColor Red
        $allGood = $false
    }
    
    if (Test-Path "sahay-react\src") {
        Write-Host "  ✅ src directory found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ src directory not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ❌ Frontend directory not found" -ForegroundColor Red
    $allGood = $false
}

# Check Startup Scripts
Write-Host "Checking Startup Scripts..." -ForegroundColor Yellow
if (Test-Path "start-backend.ps1") {
    Write-Host "  ✅ start-backend.ps1 found" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  start-backend.ps1 not found" -ForegroundColor Yellow
}

if (Test-Path "start-frontend.ps1") {
    Write-Host "  ✅ start-frontend.ps1 found" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  start-frontend.ps1 not found" -ForegroundColor Yellow
}

if (Test-Path "start-all.ps1") {
    Write-Host "  ✅ start-all.ps1 found" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  start-all.ps1 not found" -ForegroundColor Yellow
}

# Check Backend Dependencies
Write-Host "Checking Backend Dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\venv") {
    Write-Host "  ✅ Virtual environment exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Virtual environment not created yet" -ForegroundColor Yellow
    Write-Host "     Run: cd backend; python -m venv venv" -ForegroundColor Gray
}

# Check Frontend Dependencies
Write-Host "Checking Frontend Dependencies..." -ForegroundColor Yellow
if (Test-Path "sahay-react\node_modules") {
    Write-Host "  ✅ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  node_modules not installed yet" -ForegroundColor Yellow
    Write-Host "     Run: cd sahay-react; npm install" -ForegroundColor Gray
}

# Check Backend Server
Write-Host "Checking Backend Server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "  ✅ Backend is running!" -ForegroundColor Green
    Write-Host "     Status: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "  ⚠️  Backend is not running" -ForegroundColor Yellow
    Write-Host "     Start it with: .\start-backend.ps1" -ForegroundColor Gray
}

Write-Host ""
if ($allGood) {
    Write-Host "✅ Setup looks good! You can start the servers now." -ForegroundColor Green
    Write-Host ""
    Write-Host "Quick Start:" -ForegroundColor Cyan
    Write-Host "  .\start-all.ps1          # Start both servers" -ForegroundColor White
    Write-Host "  .\start-backend.ps1      # Start backend only" -ForegroundColor White
    Write-Host "  .\start-frontend.ps1     # Start frontend only" -ForegroundColor White
} else {
    Write-Host "❌ Some issues found. Please fix them before starting." -ForegroundColor Red
}

Write-Host ""

