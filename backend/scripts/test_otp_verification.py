import sys
import os
from unittest.mock import MagicMock, patch
from datetime import datetime, timedelta

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from routers.user import verify_otp
from models.user import User

def test_otp_verification_logic():
    print("Starting OTP verification logic test...")
    
    # Mock DB session
    db = MagicMock()
    
    # Mock User
    mock_user = MagicMock()
    mock_user.id = 1
    mock_user.email = "test@example.com"
    mock_user.otp_code = "123456"
    mock_user.otp_expiry = datetime.utcnow() + timedelta(minutes=10)
    mock_user.is_verified = False
    db.query.return_value.filter.return_value.first.return_value = mock_user
    
    # Scenario 1: Correct OTP
    response = verify_otp("test@example.com", "123456", db)
    assert response["message"] == "Email verified successfully"
    assert mock_user.is_verified == True
    assert mock_user.otp_code == None
    print("Scenario 1: Correct OTP verification passed.")
    
    # Reset user for next scenario
    mock_user.is_verified = False
    mock_user.otp_code = "123456"
    
    # Scenario 2: Incorrect OTP
    try:
        verify_otp("test@example.com", "654321", db)
        assert False, "Should have raised HTTPException"
    except Exception as e:
        assert "Invalid OTP code" in str(e)
        print("Scenario 2: Incorrect OTP handling passed.")
        
    # Scenario 3: Expired OTP
    mock_user.otp_expiry = datetime.utcnow() - timedelta(minutes=1)
    try:
        verify_otp("test@example.com", "123456", db)
        assert False, "Should have raised HTTPException"
    except Exception as e:
        assert "OTP code expired" in str(e)
        print("Scenario 3: Expired OTP handling passed.")

    print("All OTP verification tests passed!")

if __name__ == "__main__":
    try:
        test_otp_verification_logic()
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"X Test failed: {str(e)}")
        sys.exit(1)
