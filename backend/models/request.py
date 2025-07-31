from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship


class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    location = Column(String)
    urgency_level = Column(String, default="medium")
    photo = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="requests")  # ✅ new backref

    # FIXED: model name must match
    applications = relationship("VolunteerApplication", back_populates="request")
