# 🚀 Disaster Relief Platform - Production Deployment Guide

This guide covers deploying the Sahay disaster relief platform to production with security, scalability, and reliability in mind.

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All tests pass (`python test_backend_complete.py`)
- [ ] Frontend builds without errors (`pnpm run build`)
- [ ] No console errors in browser dev tools
- [ ] All TypeScript errors resolved
- [ ] Code formatted and linted

### ✅ Security
- [ ] Environment variables configured
- [ ] SECRET_KEY changed from default
- [ ] Database credentials secured
- [ ] CORS origins configured correctly
- [ ] HTTPS enabled
- [ ] Rate limiting configured

### ✅ Performance
- [ ] Images optimized
- [ ] Database queries optimized
- [ ] Frontend bundle size checked
- [ ] CDN configured for static assets

### ✅ Functionality
- [ ] User registration and login work
- [ ] Help requests can be created
- [ ] Volunteers can apply to requests
- [ ] Contact information is shared properly
- [ ] All CRUD operations work
- [ ] Error handling works correctly

## 🌐 Recommended Deployment Stack

### Frontend: Vercel
### Backend: Railway or Render
### Database: Railway (PostgreSQL) or PlanetScale

## 🚀 Backend Deployment

### Railway (Recommended)

1. **Connect Repository**
   ```bash
   # Railway will auto-detect Python app
   git push origin main
   ```

2. **Environment Variables**
   ```
   SECRET_KEY=your-secure-random-key-here
   DATABASE_URL=postgresql://user:pass@host:port/db
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```

3. **Database Migration**
   ```bash
   # Railway runs automatically on deploy
   # Check logs for any migration errors
   ```

### Render

1. **Create Web Service**
   - Runtime: Python 3.11
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables**
   ```
   SECRET_KEY=your-secure-random-key-here
   DATABASE_URL=postgresql://user:pass@host:port/db
   CORS_ORIGINS=https://your-frontend-domain.onrender.com
   ```

## 🎨 Frontend Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `pnpm run build`
   - Output Directory: `.next`

### Manual Deployment

```bash
# Build the application
pnpm run build

# Start production server
pnpm start
```

## 🗄️ Database Setup

### Production Database Options

#### Railway PostgreSQL
- Automatic scaling
- Built-in backups
- Connection pooling

#### PlanetScale
- Serverless MySQL
- Automatic scaling
- Schema migrations

#### Supabase
- PostgreSQL with real-time features
- Built-in authentication
- File storage included

### Database Migration

```python
# For schema changes in production
from database import Base, engine

# Create all tables
Base.metadata.create_all(bind=engine)
```

## 🔒 Security Configuration

### Environment Variables Template

```bash
# Backend .env
SECRET_KEY=your-super-secure-random-key-64-chars-minimum
DATABASE_URL=postgresql://user:password@host:port/database
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ACCESS_TOKEN_EXPIRE_MINUTES=60
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=5242880
ALLOWED_EXTENSIONS=.jpg,.jpeg,.png,.gif,.webp

# Frontend .env.local
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

### HTTPS & SSL

- **Vercel**: Automatic SSL certificates
- **Railway**: Automatic SSL certificates
- **Custom**: Use Cloudflare or Let's Encrypt

### Security Headers

Add to `main.py`:

```python
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

# Add security middleware
app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["yourdomain.com"])
```

## 📊 Monitoring & Analytics

### Backend Monitoring

```python
# Add to main.py
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### Frontend Analytics

```typescript
// In _app.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

## 🔄 Backup & Recovery

### Database Backups

- **Railway**: Automatic daily backups
- **PlanetScale**: Point-in-time recovery
- **Supabase**: Automatic backups

### File Storage Backups

```bash
# Backup uploads directory
aws s3 sync uploads/ s3://your-backup-bucket/uploads/
```

## 🚨 Error Monitoring

### Sentry Integration

```python
# Backend
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")

# Frontend
import * as Sentry from "@sentry/nextjs"
Sentry.init({ dsn: "your-sentry-dsn" })
```

## 📈 Performance Optimization

### Frontend

```bash
# Analyze bundle size
pnpm run build --analyze

# Optimize images
# Use next/image component
# Enable compression in Vercel
```

### Backend

```python
# Enable GZIP compression
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Database connection pooling
# Use connection pooling for PostgreSQL
```

## 🧪 Testing Production Deployment

### Automated Tests

```bash
# Run all tests
npm run test:e2e

# Load testing
npm run test:load
```

### Manual Testing Checklist

#### User Registration
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] Account creation successful
- [ ] Email confirmation sent

#### Authentication
- [ ] Login works
- [ ] JWT tokens valid
- [ ] Protected routes accessible
- [ ] Logout works

#### Help Requests
- [ ] Request creation works
- [ ] File uploads work
- [ ] Location data saved
- [ ] Urgency levels work

#### Volunteer System
- [ ] Request browsing works
- [ ] Contact info visible
- [ ] Application system works
- [ ] Notifications work

#### Mobile Responsiveness
- [ ] iPhone SE (375px)
- [ ] iPad (768px)
- [ ] Desktop (1440px)

#### Performance
- [ ] Page load < 3 seconds
- [ ] Image optimization works
- [ ] No console errors
- [ ] Lighthouse score > 90

## 🚀 Scaling Considerations

### Horizontal Scaling

```python
# Use Redis for session storage
# Implement caching layers
# Use load balancers
```

### Database Scaling

```sql
-- Add indexes for performance
CREATE INDEX idx_requests_location ON requests(location);
CREATE INDEX idx_requests_user_id ON requests(user_id);
CREATE INDEX idx_applications_volunteer_id ON volunteer_applications(volunteer_id);
```

## 📞 Support & Maintenance

### Monitoring Dashboards

- **Railway**: Built-in metrics
- **Vercel**: Analytics dashboard
- **Custom**: Grafana + Prometheus

### Backup Strategy

- **Daily**: Automated database backups
- **Weekly**: Full system backups
- **Monthly**: Offsite backups

### Emergency Contacts

- Development team
- Hosting provider support
- Domain registrar
- SSL certificate authority

## 🎯 Success Metrics

### User Engagement
- Daily active users
- Request creation rate
- Volunteer application rate
- User retention rate

### Performance Metrics
- Page load times
- API response times
- Error rates
- Uptime percentage

### Business Metrics
- Total users
- Total requests
- Successful connections
- User satisfaction scores

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ORIGINS environment variable
   - Verify HTTPS URLs in production

2. **Database Connection**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check connection limits

3. **File Upload Issues**
   - Check UPLOAD_DIR permissions
   - Verify MAX_UPLOAD_SIZE settings
   - Check file type restrictions

4. **Authentication Problems**
   - Verify SECRET_KEY is set
   - Check JWT token expiration
   - Validate CORS settings

### Debug Commands

```bash
# Check backend health
curl https://your-api-domain.com/health

# Check frontend build
npm run build

# Check database connection
python -c "from database import engine; print('Connected' if engine else 'Failed')"
```

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)

---

**Deployment Complete! 🎉**

Your disaster relief platform is now production-ready and can help connect people in need with compassionate volunteers worldwide.




