import smtplib
import os
from dotenv import load_dotenv

def diagnose_smtp():
    print("--- SMTP Diagnostic Tool ---")
    load_dotenv()
    
    server_addr = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USERNAME")
    password = os.getenv("SMTP_PASSWORD")
    
    print(f"Server: {server_addr}")
    print(f"Port: {port}")
    print(f"User: {user}")
    print(f"Password Length: {len(password) if password else 0}")
    
    if not user or not password:
        print("❌ Error: SMTP_USERNAME or SMTP_PASSWORD not found in .env")
        return

    try:
        print("Connecting to server...")
        server = smtplib.SMTP(server_addr, port, timeout=10)
        server.set_debuglevel(1)
        
        print("Starting TLS...")
        server.starttls()
        
        print("Logging in...")
        server.login(user, password)
        print("✅ SUCCESS: Login successful!")
        
        server.quit()
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        if "535" in str(e):
            print("Note: Error 535 usually means 'Authentication Failed'. Double check your App Password and ensure it has no spaces.")

if __name__ == "__main__":
    diagnose_smtp()
