import sys
import os
from unittest.mock import MagicMock, patch

# Add backend to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.email import send_emergency_alert

def test_email_alert_logic():
    print("Starting email alert logic test...")
    
    # Sample data
    volunteer_email = "volunteer@example.com"
    volunteer_name = "Test Volunteer"
    request_data = {
        "title": "Flood Help Needed",
        "location": "Kochi, Kerala",
        "urgency_level": "high",
        "timestamp": "2026-01-19 12:00:00",
        "description": "Rising water levels in residential areas. Need evacuation support."
    }

    # Mock settings to ensure SMTP credentials exist for the test
    with patch('utils.email.settings') as mock_settings:
        mock_settings.SMTP_USERNAME = "test_user"
        mock_settings.SMTP_PASSWORD = "test_password"
        mock_settings.SMTP_SERVER = "smtp.test.com"
        mock_settings.SMTP_PORT = 587
        mock_settings.EMAIL_FROM = "alert@disaster.test"

        # Mock smtplib.SMTP
        with patch('smtplib.SMTP') as mock_smtp:
            instance = mock_smtp.return_value.__enter__.return_value
            
            # Run the function
            send_emergency_alert(volunteer_email, volunteer_name, request_data)
            
            # Verify SMTP interactions
            mock_smtp.assert_called_with("smtp.test.com", 587)
            instance.starttls.assert_called_once()
            instance.login.assert_called_with("test_user", "test_password")
            instance.send_message.assert_called_once()
            
            # Check message content (optional but good)
            call_args = instance.send_message.call_args[0][0]
            assert call_args["To"] == volunteer_email
            assert "Flood Help Needed" in call_args["Subject"]
            
            print("✅ Email alert logic test passed!")

if __name__ == "__main__":
    try:
        test_email_alert_logic()
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        sys.exit(1)
