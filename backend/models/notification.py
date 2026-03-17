from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship

class NotificationLog(Base):
    __tablename__ = "notification_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    request_id = Column(Integer, ForeignKey("requests.id"))
    notification_type = Column(String)  # 'new_disaster' or 'update'
    status = Column(String, default="sent")
    sent_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    request = relationship("Request")
