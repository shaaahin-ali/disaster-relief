from fastapi import Depends, HTTPException, status
from schemas.user import UserOut
from dependencies.oauth2 import get_current_user  # adjust path if needed


def require_volunteer(current_user: UserOut = Depends(get_current_user)):
    if current_user.role != "volunteer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only volunteers are allowed to access this resource."
        )
    return current_user


def require_user(current_user: UserOut = Depends(get_current_user)):
    if current_user.role != "user":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only users are allowed to access this resource."
        )
    return current_user
