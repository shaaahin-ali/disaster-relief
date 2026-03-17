from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    phone_number = Column(String, nullable=True)
    role = Column(String, default="user")
    
    # Verification Fields
    is_verified = Column(Boolean, default=False)
    otp_code = Column(String, nullable=True)
    otp_expiry = Column(DateTime, nullable=True)

    # FIXED: updated to match model name
    applications = relationship("VolunteerApplication", back_populates="volunteer")
    requests = relationship("Request", back_populates="user")  # ✅ new relationship
