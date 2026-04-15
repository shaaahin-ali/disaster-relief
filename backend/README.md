# Sahay Backend API

FastAPI backend for the Sahay disaster relief platform.

## 🚀 Features

- **FastAPI Framework** - Modern, fast web framework
- **JWT Authentication** - Secure token-based authentication
- **SQLAlchemy ORM** - Robust database operations
- **Pydantic Validation** - Data validation and serialization
- **CORS Support** - Cross-origin resource sharing
- **File Upload** - Image upload for requests
- **Comprehensive API** - Full CRUD operations

## 📦 Installation

```bash
cd backend
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
```

## 🚀 Running

### Development
```bash
uvicorn main:app --reload
```

### Production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📊 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## 🧪 Testing

```bash
# Run comprehensive tests
python test_backend_complete.py

# Run individual tests
python -m pytest tests/
```

## 🔧 Configuration

### Environment Variables

```env
SECRET_KEY=your-secure-secret-key-here
DATABASE_URL=sqlite:///./disaster.db
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
ACCESS_TOKEN_EXPIRE_MINUTES=30
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=5242880
```

### Database Configuration

The app uses SQLite by default. For production, consider:

- **PostgreSQL**: `postgresql://user:password@localhost/dbname`
- **MySQL**: `mysql://user:password@localhost/dbname`

## 🏗️ Project Structure

```
backend/
├── main.py              # FastAPI application
├── config.py            # Configuration settings
├── database.py          # Database connection
├── models/              # SQLAlchemy models
│   ├── user.py
│   ├── request.py
│   └── volunteer_application.py
├── schemas/             # Pydantic schemas
│   ├── user.py
│   └── request.py
├── routers/             # API route handlers
│   ├── user.py
│   ├── request.py
│   └── volunteer.py
├── dependencies/        # Dependency injection
│   ├── oauth2.py
│   └── roles.py
├── auth/                # Authentication utilities
│   ├── hashing.py
│   └── token.py
└── uploads/             # File uploads directory
```

## 🔒 Security

- **JWT Tokens**: Secure authentication with expiration
- **Password Hashing**: bcrypt for secure password storage
- **CORS**: Configurable cross-origin policies
- **Input Validation**: Pydantic models prevent malicious input
- **SQL Injection Protection**: SQLAlchemy ORM protection

## 📊 Database Schema

### Users Table
- id: Primary key
- username: Unique username
- email: Unique email address
- password: Hashed password
- phone_number: Optional phone number
- role: 'user' or 'volunteer'

### Requests Table
- id: Primary key
- title: Request title
- description: Detailed description
- location: Location string
- urgency_level: 'low', 'medium', 'high'
- photo: Optional photo filename
- timestamp: Creation timestamp
- user_id: Foreign key to users

### Volunteer Applications Table
- id: Primary key
- volunteer_id: Foreign key to users
- request_id: Foreign key to requests
- application_date: Auto timestamp

## 🚀 Deployment

### Railway (Recommended)
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

### Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Vercel
1. Use Python runtime
2. Set environment variables
3. Deploy with custom commands

## 🔧 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration
- `GET /users/me` - Get current user

### Requests
- `POST /request/request-help` - Create request
- `GET /request/` - List all requests
- `GET /request/{id}` - Get request details
- `DELETE /request/{id}` - Delete request

### Volunteer
- `POST /volunteer/apply/{request_id}` - Apply to help
- `GET /volunteer/view-requests` - View available requests

## 📈 Monitoring

The API includes:
- Request logging
- Error handling
- Performance monitoring ready
- Health check endpoint at `/`

## 🐛 Error Handling

- Comprehensive error responses
- Proper HTTP status codes
- Detailed error messages in development
- Graceful degradation in production

## 🔄 Migrations

For database schema changes:
```bash
# Using Alembic (if configured)
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## 📚 Development

### Code Style
- Black for formatting
- isort for import sorting
- flake8 for linting
- mypy for type checking

### Pre-commit Hooks
```bash
pre-commit install
pre-commit run --all-files
```





