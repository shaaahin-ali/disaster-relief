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

    class Config:
        from_attributes = True
