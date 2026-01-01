from pydantic import BaseModel, EmailStr
from typing import Literal
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    phone_number: str = None
    role: Literal["user", "volunteer"] = "user"

class ShowUser(BaseModel):
    username: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True  # use from_attributes instead of orm_mode in Pydantic v2

# ✅ Add this for volunteer routes (fixes your ImportError)
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str  # assuming your User model includes a 'role' field

    class Config:
        from_attributes = True
