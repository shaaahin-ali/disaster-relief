"""
Script to add phone_number column to users table if it doesn't exist
"""
import sqlite3
import os
from pathlib import Path

# Get database path
db_path = Path(__file__).parent.parent / "disaster.db"

if not db_path.exists():
    print(f"Database not found at {db_path}")
    print("The database will be created automatically when you start the server.")
    exit(0)

# Connect to database
conn = sqlite3.connect(str(db_path))
cursor = conn.cursor()

try:
    # Check if phone_number column exists
    cursor.execute("PRAGMA table_info(users)")
    columns = [row[1] for row in cursor.fetchall()]
    
    if 'phone_number' not in columns:
        print("Adding phone_number column to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN phone_number VARCHAR")
        conn.commit()
        print("✅ Successfully added phone_number column!")
    else:
        print("✅ phone_number column already exists.")
        
except Exception as e:
    print(f"❌ Error: {e}")
    conn.rollback()
finally:
    conn.close()

