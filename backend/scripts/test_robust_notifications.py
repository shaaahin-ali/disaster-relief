import sys
import os
from unittest.mock import MagicMock, patch

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from routers.request import trigger_volunteer_notifications
from models.request import Request
from models.user import User as UserModel
from models.notification import NotificationLog

def test_robust_notification_logic():
    print("Starting robust notification logic test...")
    
    # Mock DB session
    db = MagicMock()
    
    # Mock Request
    mock_request = Request(id=1, title="Flood", location="Kochi", description="Help", urgency_level="high")
    db.query(Request).filter().first.return_value = mock_request
    
    # Mock Volunteers
    volunteer1 = UserModel(id=1, username="Vol1", email="vol1@test.com", role="volunteer")
    volunteer2 = UserModel(id=2, username="Vol2", email="vol2@test.com", role="volunteer")
    db.query(UserModel).filter().all.return_value = [volunteer1, volunteer2]
    
    # Scenario 1: New notification (no existing logs)
    db.query(NotificationLog).filter_by().first.return_value = None
    
    with patch('routers.request.notify_volunteer') as mock_notify:
        trigger_volunteer_notifications(db, 1, "new_disaster")
        
        # Should notify both
        assert mock_notify.call_count == 2
        print("✅ Scenario 1: Both volunteers notified successfully.")
        
    # Scenario 2: Deduplication (already notified)
    db.query(NotificationLog).filter_by().first.return_value = NotificationLog(id=1)
    
    with patch('routers.request.notify_volunteer') as mock_notify:
        trigger_volunteer_notifications(db, 1, "new_disaster")
        
        # Should notify NONE because of existing log
        assert mock_notify.call_count == 0
        print("✅ Scenario 2: Deduplication prevents double emails.")

    print("✅ All robust notification tests passed!")

if __name__ == "__main__":
    try:
        test_robust_notification_logic()
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)
