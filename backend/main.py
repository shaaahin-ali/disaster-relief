from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user,request,volunteer
from database import Base, engine
from models import user as user_model
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Disaster Relief API",
    description="API for managing disaster relief requests and volunteer applications",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(request.router)
app.include_router(volunteer.router, tags=["Volunteer"])
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
@app.get("/")
def read_root():
    return {"message": "🚀 Disaster Relief API is running"}
