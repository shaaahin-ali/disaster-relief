# Backend Testing Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the server:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

3. **Run the test script:**
   ```bash
   python test_api.py
   ```

4. **View API documentation:**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Manual Testing with cURL

### 1. Test Root Endpoint
```bash
curl http://localhost:8000/
```

### 2. Signup as User
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepass123",
    "role": "user"
  }'
```

### 3. Signup as Volunteer
```bash
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "volunteer1",
    "email": "volunteer@example.com",
    "password": "securepass123",
    "role": "volunteer"
  }'
```

### 4. Login
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john@example.com&password=securepass123"
```

Save the `access_token` from the response.

### 5. Get My Profile
```bash
curl http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 6. Create Help Request
```bash
curl -X POST http://localhost:8000/request/request-help \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "title=Need Food Supplies" \
  -F "description=We need immediate food supplies for affected families" \
  -F "location=Downtown Area" \
  -F "urgency_level=high"
```

### 7. Get All Requests
```bash
curl http://localhost:8000/request/
```

### 8. Get Request by ID
```bash
curl http://localhost:8000/request/1
```

### 9. Volunteer Dashboard
```bash
curl http://localhost:8000/volunteer/dashboard \
  -H "Authorization: Bearer VOLUNTEER_ACCESS_TOKEN"
```

### 10. Apply to Request (as Volunteer)
```bash
curl -X POST http://localhost:8000/volunteer/apply/1 \
  -H "Authorization: Bearer VOLUNTEER_ACCESS_TOKEN"
```

## Testing with Postman

1. Import the following collection structure:

### Collection: Disaster Relief API

#### Environment Variables:
- `base_url`: http://localhost:8000
- `token`: (set after login)

#### Requests:

1. **Root**
   - GET `{{base_url}}/`

2. **Signup**
   - POST `{{base_url}}/signup`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "email": "test@example.com",
       "password": "testpass123",
       "role": "user"
     }
     ```

3. **Login**
   - POST `{{base_url}}/login`
   - Body (form-data):
     - username: test@example.com
     - password: testpass123
   - Set `token` variable from response

4. **Get My Profile**
   - GET `{{base_url}}/users/me`
   - Headers: `Authorization: Bearer {{token}}`

5. **Create Request**
   - POST `{{base_url}}/request/request-help`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (form-data):
     - title: Test Request
     - description: Test description
     - location: Test Location
     - urgency_level: medium

6. **Get All Requests**
   - GET `{{base_url}}/request/`

7. **Apply to Request**
   - POST `{{base_url}}/volunteer/apply/1`
   - Headers: `Authorization: Bearer {{token}}`

## Common Issues

### 1. "Could not validate credentials"
- Check if token is expired (30 minutes default)
- Ensure token is in format: `Bearer YOUR_TOKEN`
- Login again to get a new token

### 2. "Only volunteers are allowed"
- Make sure you're logged in as a user with role "volunteer"
- Check user role in database or re-signup with role="volunteer"

### 3. "Email already registered"
- Use a different email or clear the database
- Run: `python scripts/clear_users.py` (if available)

### 4. File upload errors
- Check file size (max 5MB default)
- Check file extension (jpg, jpeg, png, gif, webp)
- Ensure uploads directory exists

## Environment Variables

Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Update `.env` with your configuration.

