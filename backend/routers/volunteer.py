from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import volunteer_application as models
from models import request as request_models
from schemas.user import UserOut
from dependencies.roles import require_volunteer

router = APIRouter(
    prefix="/volunteer",
    tags=["Volunteers"]
)

@router.get("/dashboard")
def volunteer_dashboard(current_user: UserOut = Depends(require_volunteer)):
    return {"message": f"Welcome, volunteer {current_user.username}!"}


@router.post("/apply/{request_id}", status_code=status.HTTP_201_CREATED)
def apply_to_help(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(require_volunteer)  # ✅ Only volunteers can apply
):
    req = db.query(request_models.Request).filter(request_models.Request.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found.")

    existing = db.query(models.VolunteerApplication).filter_by(
        volunteer_id=current_user.id,
        request_id=request_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this request.")

    application = models.VolunteerApplication(
        volunteer_id=current_user.id,
        request_id=request_id
    )
    db.add(application)
    db.commit()
    return {"message": "Application submitted successfully."}


@router.get("/view-requests")
def view_requests(
    db: Session = Depends(get_db),
    current_user: UserOut = Depends(require_volunteer)  # ✅ Cleaner
):
    requests = db.query(request_models.Request).all()
    return requests
