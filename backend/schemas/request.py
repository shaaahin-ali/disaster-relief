from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RequestCreate(BaseModel):
    title: str
    description: str
    location: str
    urgency_level: Optional[str] = "medium"  # low, medium, high

class ShowRequest(BaseModel):
    id: int
    title: str
    description: str
    location: str
    urgency_level: str
    photo: Optional[str] = None
    timestamp: datetime
    user_id: int
    user: Optional[dict] = None  # Include user information
    volunteers: Optional[list] = None  # Include volunteer applications (for request owners only)

    class Config:
        from_attributes = True
