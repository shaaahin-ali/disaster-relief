import sys
import os

# Add the parent directory to sys.path to allow imports from database and models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models.request import Request
from models.volunteer_application import VolunteerApplication
from models.user import User

def clear_test_data():
    db = SessionLocal()
    try:
        # Delete volunteer applications first due to foreign key constraints
        print("Clearing volunteer applications...")
        num_apps = db.query(VolunteerApplication).delete()
        
        # Delete requests
        print("Clearing requests...")
        num_reqs = db.query(Request).delete()
        
        # Optionally delete test users (keeping only real ones if they existed)
        # For now, let's just clear requests as specifically asked
        
        db.commit()
        print(f"✅ Successfully deleted {num_reqs} requests and {num_apps} volunteer applications.")
    except Exception as e:
        db.rollback()
        print(f"❌ Error clearing data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    clear_test_data()
