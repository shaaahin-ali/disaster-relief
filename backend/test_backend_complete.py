"""
Complete Backend Test Script
Tests all endpoints to ensure they work correctly
"""
import requests
import json
from typing import Optional
import time

BASE_URL = "http://localhost:8000"

def print_test(name: str):
    print(f"\n{'='*60}")
    print(f"Testing: {name}")
    print(f"{'='*60}")

def test_signup():
    """Test user signup"""
    print_test("User Signup")

    # Test data with unique timestamp
    timestamp = str(int(time.time()))
    test_user = {
        "username": f"testuser{timestamp}",
        "email": f"testuser{timestamp}@example.com",
        "password": "testpass123",
        "phone_number": "1234567890",
        "role": "user"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/signup", json=test_user)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("SUCCESS: Signup successful!")
            return response.json()
        elif response.status_code == 400:
            print(f"WARNING: {response.json().get('detail', 'Bad request')}")
        else:
            print(f"ERROR: Unexpected status: {response.status_code}")
    except Exception as e:
        print(f"ERROR: {e}")
    
    return None

def test_volunteer_signup():
    """Test volunteer signup"""
    print_test("Volunteer Signup")

    # Test data with unique timestamp
    timestamp = str(int(time.time()))
    test_volunteer = {
        "username": f"volunteer{timestamp}",
        "email": f"volunteer{timestamp}@example.com",
        "password": "testpass123",
        "phone_number": "9876543210",
        "role": "volunteer"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/signup", json=test_volunteer)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("SUCCESS: Volunteer signup successful!")
            return response.json()
        elif response.status_code == 400:
            print(f"WARNING: {response.json().get('detail', 'Bad request')}")
        else:
            print(f"ERROR: Unexpected status: {response.status_code}")
    except Exception as e:
        print(f"ERROR: {e}")
    
    return None

def test_login(email: str, password: str):
    """Test user login"""
    print_test(f"Login: {email}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/login",
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("SUCCESS: Login successful!")
            print(f"Token: {data.get('access_token', '')[:50]}...")
            return data.get('access_token')
        else:
            print(f"ERROR: Login failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def test_get_profile(token: str):
    """Test getting user profile"""
    print_test("Get User Profile")
    
    try:
        response = requests.get(
            f"{BASE_URL}/users/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("SUCCESS: Profile retrieved successfully!")
            return response.json()
        else:
            print(f"ERROR: Failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def test_create_request(token: str):
    """Test creating a help request"""
    print_test("Create Help Request")

    request_data = {
        "title": "Test Disaster Request",
        "description": "This is a test request for disaster relief",
        "location": "Test Location",
        "urgency_level": "high"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/request/request-help",
            data=request_data,
            headers={"Authorization": f"Bearer {token}"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("SUCCESS: Request created successfully!")
            return response.json()
        else:
            print(f"ERROR: Failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def test_get_all_requests(token: Optional[str] = None):
    """Test getting all requests"""
    print_test("Get All Requests")
    
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    try:
        response = requests.get(
            f"{BASE_URL}/request/",
            headers=headers
        )
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Found {len(data)} requests")
        if data:
            print(f"Sample: {json.dumps(data[0], indent=2, default=str)}")
        
        if response.status_code == 200:
            print("SUCCESS: Requests retrieved successfully!")
            return data
        else:
            print(f"ERROR: Failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def test_volunteer_apply(token: str, request_id: int):
    """Test volunteer applying to help"""
    print_test(f"Volunteer Apply to Request {request_id}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/volunteer/apply/{request_id}",
            headers={"Authorization": f"Bearer {token}"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("SUCCESS: Application submitted successfully!")
            return response.json()
        else:
            print(f"ERROR: Failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def test_get_request_volunteers(token: str, request_id: int):
    """Test getting volunteers for a request"""
    print_test(f"Get Volunteers for Request {request_id}")
    
    try:
        response = requests.get(
            f"{BASE_URL}/request/{request_id}/volunteers",
            headers={"Authorization": f"Bearer {token}"}
        )
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Found {len(data)} volunteers")
        print(f"Response: {json.dumps(data, indent=2, default=str)}")
        
        if response.status_code == 200:
            print("SUCCESS: Volunteers retrieved successfully!")
            return data
        else:
            print(f"ERROR: Failed: {response.json().get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"ERROR: Error: {e}")
    
    return None

def main():
    print("\n" + "="*60)
    print("BACKEND COMPREHENSIVE TEST SUITE")
    print("="*60)

    # Test 1: Signup as user
    user_data = test_signup()
    if not user_data:
        print("\nWARNING: Skipping further tests - signup failed")
        return

    # Test 2: Login as user (use the email from signup response)
    user_email = user_data.get('email')
    user_token = test_login(user_email, "testpass123")
    if not user_token:
        print("\nWARNING: Skipping authenticated tests - login failed")
        return
    
    # Test 3: Get profile
    test_get_profile(user_token)
    
    # Test 4: Create request
    request_data = test_create_request(user_token)
    request_id = request_data.get('id') if request_data else None
    
    # Test 5: Get all requests
    test_get_all_requests()
    test_get_all_requests(user_token)
    
    # Test 6: Volunteer signup
    volunteer_data = test_volunteer_signup()

    # Test 7: Login as volunteer (use the email from signup response)
    volunteer_email = volunteer_data.get('email') if volunteer_data else None
    volunteer_token = test_login(volunteer_email, "testpass123") if volunteer_email else None
    
    if volunteer_token and request_id:
        # Test 8: Volunteer apply
        test_volunteer_apply(volunteer_token, request_id)
        
        # Test 9: Get volunteers for request (as user)
        if user_token:
            test_get_request_volunteers(user_token, request_id)
    
    print("\n" + "="*60)
    print("TEST SUITE COMPLETE")
    print("="*60 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nTest interrupted by user")
    except Exception as e:
        print(f"\n\nERROR: Test suite error: {e}")
        import traceback
        traceback.print_exc()

