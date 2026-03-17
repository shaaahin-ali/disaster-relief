import smtplib
from email.message import EmailMessage
import os
import logging
from typing import Optional
from config import settings

logger = logging.getLogger(__name__)

def send_email(to_email: str, subject: str, body: str) -> bool:
    """
    Email sending disabled in production due to Render SMTP restrictions.
    Logs the email content for debugging purposes.
    Returns True to indicate "success" for flow continuity.
    """
    # Log the email content
    print(f"\n--- [EMAIL DISABLED - LOG ONLY] ---")
    print(f"To: {to_email}")
    print(f"Subject: {subject}")
    print(f"Body:\n{body}")
    print(f"----------------------\n")
    
    logger.info(f"Email to {to_email} logged (sending disabled)")
    return True

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
