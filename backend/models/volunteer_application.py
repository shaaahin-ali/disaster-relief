from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship

class VolunteerApplication(Base):
    __tablename__ = "volunteer_applications"

    id = Column(Integer, primary_key=True, index=True)
    volunteer_id = Column(Integer, ForeignKey("users.id"))
    request_id = Column(Integer, ForeignKey("requests.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())

    volunteer = relationship("User", back_populates="applications")  # FIXED name match
    request = relationship("Request", back_populates="applications")  # FIXED name match


