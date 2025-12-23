# 🚀 Quick Start Guide - Disaster Relief Platform

## ✅ What Was Fixed

1. **UI Components Structure** - Fixed missing shadcn/ui components directory
2. **Environment Variables** - Added support for configurable API URLs
3. **Error Handling** - Improved error messages and network error detection
4. **Health Check** - Added `/health` endpoint for monitoring
5. **Startup Scripts** - Created convenient PowerShell scripts for Windows
6. **Documentation** - Comprehensive README with troubleshooting

## 🎯 Quick Start (3 Steps)

### Step 1: Verify Setup
```powershell
.\verify-setup.ps1
```

### Step 2: Start Everything
```powershell
.\start-all.ps1
```

This will:
- ✅ Start backend on http://localhost:8000
- ✅ Start frontend on http://localhost:5173
- ✅ Open both in separate windows

### Step 3: Open Your Browser
- Frontend: http://localhost:5173
- Backend API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## 📋 Individual Commands

### Start Backend Only
```powershell
.\start-backend.ps1
```

### Start Frontend Only
```powershell
.\start-frontend.ps1
```

## 🔧 First Time Setup

If you haven't set up before:

### Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..
```

### Frontend
```powershell
cd sahay-react
npm install
cd ..
```

## 🐛 Common Issues & Solutions

### "Backend not running" error
**Solution:** Make sure backend is started first
```powershell
.\start-backend.ps1
```

### "Cannot connect to server"
**Solution:** 
1. Check backend is running: http://localhost:8000/health
2. Check CORS settings in `backend/config.py`
3. Verify API URL in browser console (F12)

### Port already in use
**Solution:**
- Backend: Change port in `start-backend.ps1` (line with `--port 8000`)
- Frontend: Vite will auto-use next available port

### Python/Node not found
**Solution:**
- Install Python 3.8+ from https://www.python.org/
- Install Node.js 18+ from https://nodejs.org/
- Restart PowerShell after installation

## 📱 Testing the App

1. **Sign Up** - Create a new account (user or volunteer)
2. **Login** - Use your credentials
3. **Create Request** - As a user, create a help request
4. **Apply to Help** - As a volunteer, apply to requests
5. **View Dashboard** - See your requests/volunteer opportunities

## 🎨 Features

- ✅ User & Volunteer registration
- ✅ Request creation with photos
- ✅ Status tracking (pending → help_on_the_way → completed)
- ✅ Location-based filtering
- ✅ Volunteer application system
- ✅ Modern UI with shadcn/ui components

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Run `.\verify-setup.ps1` to check setup
3. Check browser console (F12) for errors
4. Check backend terminal for error messages
5. Visit http://localhost:8000/docs for API documentation

---

**Ready to help! 🚀**








