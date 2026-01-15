"""
Minimal entry point for the FastAPI application.
This file imports the app from main.py to allow uvicorn to run with 'min:app'
"""
from main import app

__all__ = ["app"]
