#!/usr/bin/env python3
"""
Test script to verify that users can see volunteer information when volunteers apply to their requests.
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_volunteer_info_flow():
    print("TESTING: Volunteer Information Flow")
    print("=" * 50)

    # Step 1: Create a user account
    print("\n1. Creating user account...")
    user_data = {
        "username": f"user_{int(time.time())}",
        "email": f"user_{int(time.time())}@test.com",
        "password": "testpass123",
        "phone_number": "+1234567890",
        "role": "user"
    }

    response = requests.post(f"{BASE_URL}/signup", json=user_data)
    if response.status_code != 200:
        print(f"ERROR: User signup failed: {response.status_code}")
        return False

    user_result = response.json()
    user_id = user_result.get("id")
    print(f"SUCCESS: User created: {user_result['username']}")

    # Step 2: Login as user
    print("\n2. Logging in as user...")
    login_data = {
        "username": user_data["email"],
        "password": user_data["password"]
    }
    response = requests.post(f"{BASE_URL}/login", data=login_data)
    if response.status_code != 200:
        print(f"ERROR: User login failed: {response.status_code}")
        return False

    user_token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {user_token}"}
    print("SUCCESS: User logged in successfully")

    # Step 3: Create a help request
    print("\n3. Creating help request...")
    request_data = {
        "title": "Test Request for Volunteer Info",
        "description": "This request is to test if users can see volunteer information",
        "location": "Test City",
        "urgency_level": "medium"
    }

    response = requests.post(f"{BASE_URL}/request/request-help", data=request_data, headers=headers)
    if response.status_code != 201:
        print(f"ERROR: Request creation failed: {response.status_code}")
        return False

    request_result = response.json()
    request_id = request_result["id"]
    print(f"SUCCESS: Help request created: ID {request_id}")

    # Step 4: Create a volunteer account
    print("\n4. Creating volunteer account...")
    volunteer_data = {
        "username": f"volunteer_{int(time.time())}",
        "email": f"volunteer_{int(time.time())}@test.com",
        "password": "testpass123",
        "phone_number": "+1987654321",
        "role": "volunteer"
    }

    response = requests.post(f"{BASE_URL}/signup", json=volunteer_data)
    if response.status_code != 200:
        print(f"ERROR: Volunteer signup failed: {response.status_code}")
        return False

    volunteer_result = response.json()
    volunteer_id = volunteer_result.get("id")
    print(f"SUCCESS: Volunteer created: {volunteer_result['username']}")

    # Step 5: Login as volunteer
    print("\n5. Logging in as volunteer...")
    login_data = {
        "username": volunteer_data["email"],
        "password": volunteer_data["password"]
    }
    response = requests.post(f"{BASE_URL}/login", data=login_data)
    if response.status_code != 200:
        print(f"ERROR: Volunteer login failed: {response.status_code}")
        return False

    volunteer_token = response.json()["access_token"]
    volunteer_headers = {"Authorization": f"Bearer {volunteer_token}"}
    print("SUCCESS: Volunteer logged in successfully")

    # Step 6: Volunteer applies to the request
    print("\n6. Volunteer applying to request...")
    response = requests.post(f"{BASE_URL}/volunteer/apply/{request_id}", headers=volunteer_headers)
    if response.status_code != 201:
        print(f"ERROR: Volunteer application failed: {response.status_code}")
        return False

    print("SUCCESS: Volunteer application submitted successfully")

    # Step 7: Check if user can see volunteer information
    print("\n7. Checking if user can see volunteer information...")
    response = requests.get(f"{BASE_URL}/request/", headers=headers)
    if response.status_code != 200:
        print(f"ERROR: Failed to fetch requests: {response.status_code}")
        return False

    requests_data = response.json()
    user_request = None
    for req in requests_data:
        if req["id"] == request_id:
            user_request = req
            break

    if not user_request:
        print("ERROR: User's request not found in response")
        return False

    if "volunteers" not in user_request or not user_request["volunteers"]:
        print("ERROR: No volunteer information found in user's request")
        print(f"Request data: {json.dumps(user_request, indent=2)}")
        return False

    volunteer_info = user_request["volunteers"][0]
    print("SUCCESS: Volunteer information visible to user:")
    print(f"   - Name: {volunteer_info['username']}")
    print(f"   - Email: {volunteer_info['email']}")
    print(f"   - Phone: {volunteer_info.get('phone_number', 'Not provided')}")
    print(f"   - Applied at: {volunteer_info.get('applied_at', 'Unknown')}")

    # Verify all expected information is present
    expected_fields = ['id', 'username', 'email', 'phone_number', 'applied_at']
    for field in expected_fields:
        if field not in volunteer_info:
            print(f"ERROR: Missing field in volunteer info: {field}")
            return False

    print("\nSUCCESS: User can see complete volunteer information!")
    return True

if __name__ == "__main__":
    success = test_volunteer_info_flow()
    if success:
        print("\nSUCCESS: All tests passed! Volunteer information flow is working correctly.")
    else:
        print("\nFAILED: Tests failed. Volunteer information flow needs fixing.")
