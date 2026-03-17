import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "secret_disaster_key_change_in_production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./disaster.db")
    
    # File Upload
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MAX_UPLOAD_SIZE: int = int(os.getenv("MAX_UPLOAD_SIZE", "5242880"))  # 5MB default
    ALLOWED_EXTENSIONS: set = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    
    # CORS - Allow production and dev ports
    _cors_raw = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001")
    CORS_ORIGINS: list = [origin.strip() for origin in _cors_raw.split(",") if origin.strip()]

    # SMTP Settings (User to configure in .env)
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "disaster-relief@example.com")

settings = Settings()

# Diagnostics
print("--- [CONFIG LOADED] ---")
print(f"DATABASE_URL: {settings.DATABASE_URL}")
print(f"SMTP USER: {settings.SMTP_USERNAME}")
print(f"SMTP PASS SET: {'Yes' if settings.SMTP_PASSWORD else 'No'}")
print(f"SMTP PASS LEN: {len(settings.SMTP_PASSWORD) if settings.SMTP_PASSWORD else 0}")
print("-----------------------")

