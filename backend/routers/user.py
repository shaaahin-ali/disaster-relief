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

    token = create_access_token(data={"sub": user.email, "role": user.role})


    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/users", response_model=list[schemas.ShowUser])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get("/users/me", response_model=schemas.UserOut)
def get_my_profile(current_user: schemas.UserOut = Depends(get_current_user)):
    return current_user

@router.post("/signup", response_model=ShowUser)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = Hash.bcrypt(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pwd,
        role=user.role
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not create user")
