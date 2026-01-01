# Sahay - Disaster Relief Platform

A modern, full-stack disaster relief platform connecting people in need with compassionate volunteers.

## 🚀 Features

- **User Registration**: Sign up as someone needing help or as a volunteer
- **Help Requests**: Create detailed requests for assistance with location and urgency levels
- **Volunteer Network**: Browse and offer help to those in need
- **Contact Information**: Secure sharing of contact details between requesters and volunteers
- **Real-time Updates**: Live status updates and notifications
- **Mobile-First Design**: Responsive design that works on all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **shadcn/ui** - Modern UI components

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database (easily configurable for PostgreSQL/MySQL)
- **JWT** - Secure authentication
- **Pydantic** - Data validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.8+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd disaster-relief2ui
pnpm install
```

## 🚀 Running the Application

### Development

1. **Start Backend:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   Backend will be available at: http://localhost:8000

2. **Start Frontend:**
   ```bash
   cd disaster-relief2ui
   pnpm run dev
   ```
   Frontend will be available at: http://localhost:3000

3. **Access API Documentation:**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 🌐 Production Deployment

### Backend Deployment

#### Option 1: Railway
1. Connect your GitHub repository
2. Set environment variables:
   ```
   SECRET_KEY=your-secure-secret-key-here
   DATABASE_URL=sqlite:///./disaster.db
   ```
3. Deploy automatically

#### Option 2: Vercel
1. Use Vercel's Python runtime
2. Set environment variables in dashboard
3. Deploy with `vercel --prod`

#### Option 3: Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Deployment

#### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
3. Deploy automatically

#### Manual Build
```bash
cd disaster-relief2ui
pnpm run build
pnpm start
```

## 🔧 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secure-secret-key-here
DATABASE_URL=sqlite:///./disaster.db
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
# For production:
# NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python test_backend_complete.py
```

### Frontend Tests
```bash
cd disaster-relief2ui
pnpm run build  # Check for build errors
```

## 📊 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /users/me` - Get current user profile

### Help Requests
- `POST /request/request-help` - Create help request
- `GET /request/` - List all requests
- `GET /request/{id}` - Get specific request
- `DELETE /request/{id}` - Delete request

### Volunteer Actions
- `POST /volunteer/apply/{request_id}` - Apply to help
- `GET /volunteer/view-requests` - View available requests
- `GET /request/{id}/volunteers` - View volunteers for request

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- CORS protection
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

## 🚀 Future Enhancements

- Real-time notifications with WebSockets
- Location-based request matching
- Volunteer verification system
- Emergency alert system
- Multi-language support
- Advanced analytics dashboard
- Mobile app companion


