import requests
import json

# First login to get a token
login_response = requests.post(
    "http://localhost:8000/login",
    data={"username": "testuser1767215113@example.com", "password": "testpass123"},
    headers={"Content-Type": "application/x-www-form-urlencoded"}
)

print(f"Login Status: {login_response.status_code}")
if login_response.status_code == 200:
    token_data = login_response.json()
    token = token_data.get('access_token')
    print(f"Got token: {token[:50]}...")

    # Now test profile endpoint
    profile_response = requests.get(
        "http://localhost:8000/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )

    print(f"Profile Status: {profile_response.status_code}")
    print(f"Content-Type: {profile_response.headers.get('content-type', 'unknown')}")
    print(f"Response: {profile_response.text}")
else:
    print(f"Login failed: {login_response.text}")




