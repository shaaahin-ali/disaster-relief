from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from schemas import user as schemas
import models.user as models
from models.user import User
from schemas.user import UserCreate, ShowUser, UserOut
from models.auth.hashing import Hash
from sqlalchemy.exc import IntegrityError
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from models.auth.token import create_access_token
from dependencies.oauth2 import get_current_user
from fastapi import BackgroundTasks
import random
import string
from datetime import datetime, timedelta
from utils.email import send_otp_email

router = APIRouter()




@router.post("/login")
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.email == request.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    try:
        if not Hash.verify(user.password, request.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Password verification failed: {str(e)}"
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified. Please verify your email to log in."
        )

    token = create_access_token(data={"sub": user.email, "role": user.role})


    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/users", response_model=list[schemas.ShowUser])
def get_users(db: Session = Depends(get_db), current_user: schemas.UserOut = Depends(get_current_user)):
    users = db.query(models.User).all()
    return users

@router.get("/users/me", response_model=schemas.UserOut)
def get_my_profile(current_user: schemas.UserOut = Depends(get_current_user)):
    return current_user

@router.post("/signup", response_model=ShowUser)
def create_user(user: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_user_email = db.query(User).filter(User.email == user.email).first()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_name = db.query(User).filter(User.username == user.username).first()
    if db_user_name:
        raise HTTPException(status_code=400, detail="Username already taken")

    hashed_pwd = Hash.bcrypt(user.password)

    # Generate OTP
    otp = ''.join(random.choices(string.digits, k=6))
    hashed_otp = Hash.bcrypt(otp)
    expiry = datetime.utcnow() + timedelta(minutes=5)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pwd,
        phone_number=user.phone_number,
        role=user.role,
        otp_code=hashed_otp,
        otp_expiry=expiry,
        is_verified=False
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Send PLAIN OTP in background
        background_tasks.add_task(send_otp_email, new_user.email, new_user.username, otp)
        
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not create user")

@router.post("/verify-otp")
def verify_otp(email: str, otp: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_verified:
        return {"message": "Email already verified"}
    
    if not user.otp_code or not user.otp_expiry:
        raise HTTPException(status_code=400, detail="No active verification code found")

    if datetime.utcnow() > user.otp_expiry:
        raise HTTPException(status_code=400, detail="OTP code expired")
    
    if not Hash.verify(user.otp_code, otp):
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    
    user.is_verified = True
    user.otp_code = None
    user.otp_expiry = None
    db.commit()
    
    return {"message": "Email verified successfully"}

@router.post("/resend-otp")
def resend_otp(email: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_verified:
        return {"message": "Email already verified"}
    
    # Generate new OTP
    otp = ''.join(random.choices(string.digits, k=6))
    hashed_otp = Hash.bcrypt(otp)
    expiry = datetime.utcnow() + timedelta(minutes=5)
    
    user.otp_code = hashed_otp
    user.otp_expiry = expiry
    db.commit()
    
    background_tasks.add_task(send_otp_email, user.email, user.username, otp)
    
    return {"message": "OTP resent successfully"}
