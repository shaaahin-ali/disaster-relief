from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import user,request,volunteer,resources
from database import Base, engine
from models import user as user_model
from fastapi.staticfiles import StaticFiles
from config import settings
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Disaster Relief API",
    description="API for managing disaster relief requests and volunteer applications",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://disaster-relief-lake.vercel.app","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(request.router)
app.include_router(volunteer.router, tags=["Volunteer"])
app.include_router(resources.router)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "message": str(exc) if settings.SECRET_KEY.startswith("secret") else "An error occurred"}
    )

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Disaster Relief API is running"}

@app.get("/")
@limiter.limit("100/minute")
def read_root(request: Request):
    return {"message": "🚀 Disaster Relief API is running", "version": "1.0.0", "status": "healthy"}
