from fastapi import FastAPI
from routers import user,request,volunteer
from database import Base, engine
from models import user as user_model
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(request.router)
app.include_router(volunteer.router, tags=["Volunteer"])
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
@app.get("/")
def read_root():
    return {"message": "🚀 Disaster Relief API is running"}
