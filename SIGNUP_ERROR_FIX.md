# Signup Error - Solution

## 🔍 Problem Identified

The signup is failing because **the backend server is not running**.

The error you're seeing is likely:
- "Cannot connect to server"
- "Connection refused"
- Network error in browser console

## ✅ Solution

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

### Step 2: Verify Backend is Running

Open your browser and go to:
```
http://localhost:8000/docs
```

You should see the API documentation (Swagger UI).

### Step 3: Start the Frontend (if not already running)

In a **new terminal**:

```bash
cd sahay-react
npm run dev
```

### Step 4: Try Signup Againcd backe

Now go to your frontend (usually `http://localhost:5173`) and try to signup again.

## 🔧 Improved Error Messages

I've updated the signup component to show better error messages:

1. **Network errors** - Will show: "Cannot connect to server. Please make sure the backend is running on http://localhost:8000"
2. **Server errors** - Will show the exact error message from the backend
3. **Validation errors** - Will show specific validation messages

## 📋 Common Signup Errors

### "Email already registered"
- **Solution:** Use a different email address

### "Username already taken"
- **Solution:** Choose a different username

### "Password must be at least 6 characters long"
- **Solution:** Use a password with at least 6 characters

### "Cannot connect to server"
- **Solution:** Make sure backend is running (see Step 1 above)

## 🧪 Test Backend Connection

You can test if the backend is running by:

1. **Browser:** Visit `http://localhost:8000/docs`
2. **Command line:**
   ```bash
   curl http://localhost:8000/
   ```
   Should return: `{"message":"🚀 Disaster Relief API is running","version":"1.0.0"}`

## 📝 Quick Checklist

- [ ] Backend server is running (`uvicorn main:app --reload`)
- [ ] Backend is accessible at `http://localhost:8000`
- [ ] Frontend is running (`npm run dev`)
- [ ] No firewall blocking port 8000
- [ ] Using a unique email and username

## 🐛 Still Having Issues?

1. **Check browser console** (F12) for detailed error messages
2. **Check backend terminal** for server errors
3. **Verify CORS** - Backend should allow `http://localhost:5173`
4. **Check network tab** in browser DevTools to see the actual request/response

## 💡 Pro Tip

Keep both terminals open:
- **Terminal 1:** Backend server (`uvicorn main:app --reload`)
- **Terminal 2:** Frontend dev server (`npm run dev`)

This way you can see errors from both sides!

