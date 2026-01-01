import requests
import json
import time

# Test signup with CORS
BASE_URL = "http://localhost:8000"

def test_signup():
    timestamp = str(int(time.time()))
    test_user = {
        "username": f"testuser{timestamp}",
        "email": f"testuser{timestamp}@example.com",
        "password": "testpass123",
        "phone_number": "1234567890",
        "role": "user"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/signup",
            json=test_user,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")

        if response.status_code == 200:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing signup...")
    success = test_signup()
    if success:
        print("SUCCESS: Signup worked!")
    else:
        print("FAILED: Signup failed!")


