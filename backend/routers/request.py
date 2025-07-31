# routers/request.py

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session
from typing import Optional, List
import shutil
import os

from database import get_db
from models.request import Request

from schemas.request import ShowRequest
from dependencies.oauth2 import get_current_user
from schemas.user import UserOut

router = APIRouter(
    prefix="/request",
    tags=["Help Requests"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure upload dir exists

# POST /request-help (already working)
@router.post("/request-help", status_code=status.HTTP_201_CREATED, response_model=ShowRequest)
def create_request(
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    urgency_level: str = Form("medium"),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    photo_filename = None
    if photo:
        photo_filename = f"{current_user.id}_{photo.filename}"
        file_path = os.path.join(UPLOAD_DIR, photo_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)

    new_request = Request(
        title=title,
        description=description,
        location=location,
        urgency_level=urgency_level,
        photo=photo_filename,
        user_id=current_user.id
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

# ✅ GET /request - List all help requests
@router.get("/", response_model=List[ShowRequest])
def get_all_requests(db: Session = Depends(get_db)):
    requests = db.query(Request).all()
    return requests

# ✅ GET /request/{id} - Get a single help request by ID
@router.get("/{id}", response_model=ShowRequest)
def get_request(id: int, db: Session = Depends(get_db)):
    help_request = db.query(Request).filter(Request.id == id).first()
    if not help_request:
        raise HTTPException(status_code=404, detail="Request not found")
    return help_request
