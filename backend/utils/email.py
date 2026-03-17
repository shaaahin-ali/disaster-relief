import smtplib
from email.message import EmailMessage
import os
import logging
from typing import Optional
from config import settings

logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, body: str) -> bool:
    """
    Sends a secure email using SMTP and TLS.
    Returns True if success, False otherwise.
    """
    smtp_server = os.getenv("SMTP_SERVER", settings.SMTP_SERVER)
    smtp_port = int(os.getenv("SMTP_PORT", settings.SMTP_PORT))
    smtp_user = os.getenv("SMTP_USERNAME", settings.SMTP_USERNAME)
    smtp_pass = os.getenv("SMTP_PASSWORD", settings.SMTP_PASSWORD)
    email_from = os.getenv("EMAIL_FROM", settings.EMAIL_FROM)

    if not smtp_user or not smtp_pass:
        logger.warning("SMTP credentials missing. Email not sent.")
        return False

    msg = EmailMessage()
    msg["From"] = email_from
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    print(f"\n--- [OUTGOING EMAIL] ---\nTo: {to_email}\nSubject: {subject}\nBody:\n{body}\n----------------------\n")

    try:
        with smtplib.SMTP(smtp_server, smtp_port, timeout=10) as server:
            server.set_debuglevel(1)  # Enable detailed SMTP debug output
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        logger.info(f"Email sent successfully to {to_email}")
        print(f"✅ Email technically sent to {to_email} (check inbox/spam)")
        return True
    except Exception as e:
        error_msg = f"❌ SMTP Error while sending to {to_email}: {str(e)}"
        print(error_msg)
        logger.error(error_msg)
        # We return false, and the caller should handle it or we should raise.
        # But for now, we've logged it clearly to the console.
        return False

def notify_volunteer(volunteer_email: str, volunteer_name: str, request_data: dict, notification_type: str):
    """
    Wraps email sending for background tasks and ensures context is provided.
    """
    if notification_type == "new_disaster":
        subject = f"🚨 URGENT: New Disaster Reported - {request_data['title']}"
        action = "reported"
    else:
        subject = f"🔄 UPDATE: Disaster Request Updated - {request_data['title']}"
        action = "updated"

    body = f"""
Hello {volunteer_name},

A disaster help request has been {action} that needs your attention.

Details:
- Title: {request_data['title']}
- Location: {request_data['location']}
- Urgency: {request_data['urgency_level'].upper()}
- Description: {request_data['description']}

Please log in to the Disaster Relief platform to view more details and provide assistance.

Stay safe,
Disaster Relief Team
    """
    
    send_email(to_email=volunteer_email, subject=subject, body=body)

    # Note: NotificationLog update should happen where this is called 
    # if we want to ensure atomicity with the DB session.

def send_otp_email(email: str, username: str, otp: str):
    """
    Sends a 6-digit OTP code for email verification.
    """
    subject = "🗝️ Your Verification Code - Disaster Relief Platform"
    
    body = f"""
Hello {username},

Welcome to the Disaster Relief Platform! To complete your registration and verify your email, please use the following One-Time Password (OTP):

 वेरिफिकेशन कोड (OTP): {otp}

This code is valid for 10 minutes. Please enter it on the verification page to activate your account.

If you did not request this, please ignore this email.

Stay safe,
Disaster Relief Team
    """
    
    send_email(to_email=email, subject=subject, body=body)
