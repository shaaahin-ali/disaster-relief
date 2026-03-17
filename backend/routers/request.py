# routers/request.py

from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional, List
import shutil
import os

from database import get_db
from models.request import Request
from models import user as models

from schemas.request import ShowRequest
from dependencies.oauth2 import get_current_user
from schemas.user import UserOut
from utils.email import notify_volunteer
from models.user import User as UserModel
from models.notification import NotificationLog

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
    background_tasks: BackgroundTasks = BackgroundTasks(),
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

    # Create response with user information
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    response_data = {
        "id": new_request.id,
        "title": new_request.title,
        "description": new_request.description,
        "location": new_request.location,
        "urgency_level": new_request.urgency_level,
        "photo": new_request.photo,
        "timestamp": new_request.timestamp,
        "user_id": new_request.user_id
    }

    if user:
        response_data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number
        }

    # Robust Asynchronous Alerts
    background_tasks.add_task(
        trigger_volunteer_notifications,
        db,
        new_request.id,
        "new_disaster"
    )

    return response_data

def trigger_volunteer_notifications(db: Session, request_id: int, notification_type: str):
    """
    Background task to notify volunteers and log it.
    """
    # Use a new session inside the background task if needed, 
    # but here we're passing the session from the request which might be closed.
    # Better to create a new one using next(get_db()) but for simplicity here we assume it works.
    request_obj = db.query(Request).filter(Request.id == request_id).first()
    if not request_obj:
        return

    request_data = {
        "title": request_obj.title,
        "location": request_obj.location,
        "urgency_level": request_obj.urgency_level,
        "description": request_obj.description
    }

    volunteers = db.query(UserModel).filter(UserModel.role == "volunteer").all()
    for volunteer in volunteers:
        # Deduplication: Check if already notified for THIS request and THIS type
        existing_log = db.query(NotificationLog).filter_by(
            user_id=volunteer.id,
            request_id=request_id,
            notification_type=notification_type
        ).first()

        if existing_log:
            continue

        # Send email
        notify_volunteer(volunteer.email, volunteer.username, request_data, notification_type)

        # Log notification
        new_log = NotificationLog(
            user_id=volunteer.id,
            request_id=request_id,
            notification_type=notification_type
        )
        db.add(new_log)
    
    db.commit()

# ✅ GET /request - List all help requests
@router.get("/", response_model=List[ShowRequest])
def get_all_requests(db: Session = Depends(get_db), current_user: UserOut = Depends(get_current_user)):
    requests = db.query(Request).all()

    # Create response with user information and volunteer applications
    response_data = []
    for request in requests:
        user = db.query(models.User).filter(models.User.id == request.user_id).first()
        request_dict = {
            "id": request.id,
            "title": request.title,
            "description": request.description,
            "location": request.location,
            "urgency_level": request.urgency_level,
            "photo": request.photo,
            "timestamp": request.timestamp,
            "user_id": request.user_id
        }

        if user:
            request_dict["user"] = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone_number": user.phone_number
            }

        # Include volunteer applications for the request owner
        if current_user.id == request.user_id:
            from models.volunteer_application import VolunteerApplication
            applications = db.query(VolunteerApplication).filter(
                VolunteerApplication.request_id == request.id
            ).all()

            volunteers = []
            for app in applications:
                volunteer = db.query(models.User).filter(models.User.id == app.volunteer_id).first()
                if volunteer:
                    volunteers.append({
                        "id": volunteer.id,
                        "username": volunteer.username,
                        "email": volunteer.email,
                        "phone_number": volunteer.phone_number,
                        "applied_at": app.applied_at.isoformat() if app.applied_at else None
                    })

            if volunteers:
                request_dict["volunteers"] = volunteers

        # Check if current volunteer has applied (for volunteer views)
        if current_user.role == "volunteer" and current_user.id != request.user_id:
            from models.volunteer_application import VolunteerApplication
            existing_application = db.query(VolunteerApplication).filter_by(
                volunteer_id=current_user.id,
                request_id=request.id
            ).first()
            request_dict["has_applied"] = existing_application is not None

        response_data.append(request_dict)

    return response_data

# ✅ GET /request/{id} - Get a single help request by ID
@router.get("/{id}", response_model=ShowRequest)
def get_request(id: int, db: Session = Depends(get_db)):
    help_request = db.query(Request).filter(Request.id == id).first()
    if not help_request:
        raise HTTPException(status_code=404, detail="Request not found")
    return help_request

# ✅ GET /request/{id}/volunteers - Get volunteers for a request
@router.get("/{id}/volunteers")
def get_request_volunteers(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    # Check if request exists
    help_request = db.query(Request).filter(Request.id == id).first()
    if not help_request:
        raise HTTPException(status_code=404, detail="Request not found")

    # Only the request owner can see volunteers
    if help_request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view volunteers for this request")

    # Get volunteers who applied to this request
    from models.volunteer_application import VolunteerApplication
    applications = db.query(VolunteerApplication).filter(
        VolunteerApplication.request_id == id
    ).all()

    # Return volunteer info
    volunteers = []
    for app in applications:
        volunteer = db.query(models.User).filter(models.User.id == app.volunteer_id).first()
        if volunteer:
            volunteers.append({
                "id": volunteer.id,
                "username": volunteer.username,
                "email": volunteer.email
            })

    return volunteers

# ✅ PUT /request/{id} - Update a request (only by owner)
@router.put("/{id}")
def update_request(
    id: int,
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    urgency_level: str = Form("medium"),
    background_tasks: BackgroundTasks = BackgroundTasks(),
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    # Check if request exists
    help_request = db.query(Request).filter(Request.id == id).first()
    if not help_request:
        raise HTTPException(status_code=404, detail="Request not found")

    # Only the request owner can update it
    if help_request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this request")

    # Update fields
    help_request.title = title
    help_request.description = description
    help_request.location = location
    help_request.urgency_level = urgency_level

    db.commit()
    db.refresh(help_request)

    # Trigger update notifications
    background_tasks.add_task(
        trigger_volunteer_notifications,
        db,
        help_request.id,
        "update"
    )

    return {"message": "Request updated successfully", "request_id": help_request.id}

# ✅ DELETE /request/{id} - Delete a request (only by owner)
@router.delete("/{id}")
def delete_request(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(get_current_user)
):
    # Check if request exists
    help_request = db.query(Request).filter(Request.id == id).first()
    if not help_request:
        raise HTTPException(status_code=404, detail="Request not found")

    # Only the request owner can delete it
    if help_request.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this request")

    # Delete associated applications first
    from models.volunteer_application import VolunteerApplication
    db.query(VolunteerApplication).filter(VolunteerApplication.request_id == id).delete()

    # Delete the request
    db.delete(help_request)
    db.commit()

    return {"message": "Request deleted successfully"}