# scripts/clear_users.py

from database import SessionLocal
from models import user as models

db = SessionLocal()

# Delete all users
db.query(models.User).delete()
db.commit()

print("✅ All users deleted successfully.")
