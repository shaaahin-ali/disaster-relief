# 400 Bad Request Error - Analysis & Solutions

## 🔍 Common Causes of 400 Bad Request

### 1. **Invalid Email Format** (Most Common)
**Error:** `value is not a valid email address`

**Solution:**
- Email must contain `@` symbol
- Email must have valid format (e.g., `user@example.com`)
- Examples of INVALID emails:
  - `test` ❌
  - `test@` ❌
  - `@example.com` ❌
  - `test..test@example.com` ❌

**Valid email examples:**
- `user@example.com` ✅
- `test.user@domain.co.uk` ✅
- `user123@test-domain.com` ✅

### 2. **Password Too Short**
**Error:** `Password must be at least 6 characters long`

**Solution:**
- Password must be at least 6 characters
- Examples: `password123` ✅, `pass` ❌

### 3. **Email Already Registered**
**Error:** `Email already registered`

**Solution:**
- Use a different email address
- Or delete the existing user from database

### 4. **Username Already Taken**
**Error:** `Username already taken`

**Solution:**
- Choose a different username

### 5. **Invalid Role Value**
**Error:** `Input should be 'user' or 'volunteer'`

**Solution:**
- Role must be exactly `"user"` or `"volunteer"` (lowercase)
- Frontend should handle this, but if sending manually, ensure correct value

### 6. **Missing Required Fields**
**Error:** `Field required`

**Solution:**
- Ensure all fields are filled:
  - `username` (required)
  - `email` (required)
  - `password` (required)
  - `role` (optional, defaults to "user")

## 🧪 Testing the Signup Endpoint

### Test with Valid Data
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser123",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Test with Invalid Email
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "invalid-email",
    "password": "pass123",
    "role": "user"
  }'
```
**Expected:** 400 with email validation error

### Test with Short Password
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "test@test.com",
    "password": "123",
    "role": "user"
  }'
```
**Expected:** 400 with password length error

## 🔧 Improved Error Handling

I've updated the backend and frontend to show detailed validation errors:

### Backend Changes:
- Added custom validation error handler
- Returns detailed error messages with field names
- Format: `{"detail": "error message", "errors": ["field -> error"]}`

### Frontend Changes:
- Better error parsing
- Shows all validation errors
- More user-friendly error messages

## 📋 Debugging Steps

1. **Check Browser Console (F12)**
   - Look for the exact error message
   - Check Network tab → see the request/response

2. **Check Backend Logs**
   - Look at terminal where backend is running
   - See if there are any validation errors

3. **Test with cURL**
   - Use the test commands above
   - See the exact error response

4. **Verify Request Format**
   - Ensure JSON is properly formatted
   - Check Content-Type header is `application/json`

## 💡 Common Mistakes

1. **Email without @ symbol** - Most common!
2. **Password less than 6 characters**
3. **Using existing email/username**
4. **Missing quotes in JSON** (if testing manually)
5. **Wrong Content-Type header**

## ✅ Quick Fix Checklist

- [ ] Email has `@` symbol and valid format
- [ ] Password is at least 6 characters
- [ ] Username is unique
- [ ] Email is unique
- [ ] All required fields are filled
- [ ] Role is either "user" or "volunteer" (if provided)

## 🐛 Still Getting 400?

1. **Check the exact error message** in browser console
2. **Copy the error** and check which validation failed
3. **Try with a different email/username** to rule out duplicates
4. **Test with cURL** to see raw response

