"""
Comprehensive Backend Test Suite
Tests signup, login, and data fetching for both users and volunteers
"""
import requests
import json
import sys
from typing import Optional, Dict, Any

BASE_URL = "http://localhost:8000"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header(text: str):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{text:^70}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.RESET}\n")

def print_success(text: str):
    print(f"{Colors.GREEN}✅ {text}{Colors.RESET}")

def print_error(text: str):
    print(f"{Colors.RED}❌ {text}{Colors.RESET}")

def print_warning(text: str):
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.RESET}")

def print_info(text: str):
    print(f"{Colors.BLUE}ℹ️  {text}{Colors.RESET}")

def check_server():
    """Check if server is running"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print_success("Server is running and healthy")
            return True
        else:
            print_error(f"Server returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print_error(f"Cannot connect to server at {BASE_URL}")
        print_info("Please start the server with: uvicorn main:app --reload")
        return False
    except Exception as e:
        print_error(f"Error checking server: {e}")
        return False

def test_signup_user() -> Optional[Dict[str, Any]]:
    """Test user signup"""
    print_header("TEST 1: USER SIGNUP")
    
    test_user = {
        "username": "testuser_final",
        "email": "testuser_final@example.com",
        "password": "testpass123",
        "phone_number": "1234567890",
        "role": "user"
    }
    
    print_info(f"Signing up user: {test_user['username']}")
    try:
        response = requests.post(f"{BASE_URL}/signup", json=test_user, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print_success("User signup successful!")
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Verify all fields
            required_fields = ['id', 'username', 'email', 'role', 'phone_number']
            missing = [f for f in required_fields if f not in data]
            if missing:
                print_error(f"Missing fields in response: {missing}")
            else:
                print_success("All required fields present in response")
            
            if data.get('phone_number') == test_user['phone_number']:
                print_success("Phone number correctly saved and returned")
            else:
                print_error(f"Phone number mismatch: expected {test_user['phone_number']}, got {data.get('phone_number')}")
            
            return data
        elif response.status_code == 400:
            error_detail = response.json().get('detail', 'Unknown error')
            print_warning(f"Signup failed (might be expected if user exists): {error_detail}")
            if "already" in error_detail.lower():
                print_info("User already exists - this is OK for testing")
            return None
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print_error(f"Error during signup: {e}")
        return None

def test_signup_volunteer() -> Optional[Dict[str, Any]]:
    """Test volunteer signup"""
    print_header("TEST 2: VOLUNTEER SIGNUP")
    
    test_volunteer = {
        "username": "volunteer_final",
        "email": "volunteer_final@example.com",
        "password": "testpass123",
        "phone_number": "9876543210",
        "role": "volunteer"
    }
    
    print_info(f"Signing up volunteer: {test_volunteer['username']}")
    try:
        response = requests.post(f"{BASE_URL}/signup", json=test_volunteer, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print_success("Volunteer signup successful!")
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Verify all fields
            if data.get('role') == 'volunteer':
                print_success("Role correctly set to 'volunteer'")
            else:
                print_error(f"Role mismatch: expected 'volunteer', got {data.get('role')}")
            
            if data.get('phone_number') == test_volunteer['phone_number']:
                print_success("Phone number correctly saved and returned")
            
            return data
        elif response.status_code == 400:
            error_detail = response.json().get('detail', 'Unknown error')
            print_warning(f"Signup failed (might be expected if volunteer exists): {error_detail}")
            if "already" in error_detail.lower():
                print_info("Volunteer already exists - this is OK for testing")
            return None
        else:
            print_error(f"Unexpected status code: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print_error(f"Error during volunteer signup: {e}")
        return None

def test_login_user(email: str, password: str) -> Optional[str]:
    """Test user login"""
    print_header(f"TEST 3: USER LOGIN ({email})")
    
    print_info(f"Logging in as: {email}")
    try:
        response = requests.post(
            f"{BASE_URL}/login",
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success("User login successful!")
            
            if 'access_token' in data:
                token = data['access_token']
                print_success(f"Token received: {token[:50]}...")
                return token
            else:
                print_error("No access_token in response")
                return None
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Login failed: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error during login: {e}")
        return None

def test_login_volunteer(email: str, password: str) -> Optional[str]:
    """Test volunteer login"""
    print_header(f"TEST 4: VOLUNTEER LOGIN ({email})")
    
    print_info(f"Logging in as: {email}")
    try:
        response = requests.post(
            f"{BASE_URL}/login",
            data={"username": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success("Volunteer login successful!")
            
            if 'access_token' in data:
                token = data['access_token']
                print_success(f"Token received: {token[:50]}...")
                return token
            else:
                print_error("No access_token in response")
                return None
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Login failed: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error during login: {e}")
        return None

def test_get_user_profile(token: str) -> Optional[Dict[str, Any]]:
    """Test getting user profile"""
    print_header("TEST 5: GET USER PROFILE")
    
    print_info("Fetching user profile with token")
    try:
        response = requests.get(
            f"{BASE_URL}/users/me",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success("Profile retrieved successfully!")
            print(f"Profile Data: {json.dumps(data, indent=2)}")
            
            # Verify all fields
            required_fields = ['id', 'username', 'email', 'role', 'phone_number']
            missing = [f for f in required_fields if f not in data]
            if missing:
                print_error(f"Missing fields: {missing}")
            else:
                print_success("All required fields present in profile")
            
            return data
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Failed to get profile: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error fetching profile: {e}")
        return None

def test_create_request(token: str) -> Optional[Dict[str, Any]]:
    """Test creating a help request"""
    print_header("TEST 6: CREATE HELP REQUEST")
    
    request_data = {
        "title": "Test Disaster Request",
        "description": "This is a test request for disaster relief assistance",
        "location": "Test City, Test State",
        "urgency_level": "high"
    }
    
    print_info("Creating help request")
    try:
        response = requests.post(
            f"{BASE_URL}/request/request-help/",
            data=request_data,
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print_success("Request created successfully!")
            print(f"Request Data: {json.dumps(data, indent=2, default=str)}")
            
            # Verify fields
            if 'user_phone' in data:
                print_success(f"User phone number included: {data['user_phone']}")
            else:
                print_error("User phone number missing from request")
            
            return data
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Failed to create request: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error creating request: {e}")
        return None

def test_get_all_requests(token: Optional[str] = None) -> Optional[list]:
    """Test getting all requests"""
    print_header("TEST 7: GET ALL REQUESTS")
    
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
        print_info("Fetching requests with authentication")
    else:
        print_info("Fetching requests without authentication")
    
    try:
        response = requests.get(
            f"{BASE_URL}/request/",
            headers=headers,
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success(f"Retrieved {len(data)} requests")
            
            if data:
                print_info(f"Sample request: {json.dumps(data[0], indent=2, default=str)}")
                # Check if user_phone is in response
                if 'user_phone' in data[0]:
                    print_success("User phone numbers are included in requests")
                else:
                    print_error("User phone numbers missing from requests")
            else:
                print_info("No requests found (this is OK if database is empty)")
            
            return data
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Failed to get requests: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error fetching requests: {e}")
        return None

def test_volunteer_apply(token: str, request_id: int) -> bool:
    """Test volunteer applying to help"""
    print_header(f"TEST 8: VOLUNTEER APPLY TO REQUEST {request_id}")
    
    print_info(f"Volunteer applying to request ID: {request_id}")
    try:
        response = requests.post(
            f"{BASE_URL}/volunteer/apply/{request_id}",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print_success("Application submitted successfully!")
            print(f"Response: {json.dumps(data, indent=2)}")
            return True
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_warning(f"Application failed (might be expected if already applied): {error_detail}")
            return False
    except Exception as e:
        print_error(f"Error applying: {e}")
        return False

def test_get_volunteers_for_request(token: str, request_id: int) -> Optional[list]:
    """Test getting volunteers for a request"""
    print_header(f"TEST 9: GET VOLUNTEERS FOR REQUEST {request_id}")
    
    print_info(f"Fetching volunteers for request ID: {request_id}")
    try:
        response = requests.get(
            f"{BASE_URL}/request/{request_id}/volunteers",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success(f"Retrieved {len(data)} volunteers")
            print(f"Volunteers: {json.dumps(data, indent=2, default=str)}")
            
            if data:
                volunteer = data[0]
                if 'volunteer_name' in volunteer and 'volunteer_phone' in volunteer:
                    print_success("Volunteer name and phone number included")
                else:
                    print_error("Missing volunteer information")
            
            return data
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Failed to get volunteers: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error fetching volunteers: {e}")
        return None

def test_volunteer_view_requests(token: str) -> Optional[list]:
    """Test volunteer viewing requests"""
    print_header("TEST 10: VOLUNTEER VIEW REQUESTS")
    
    print_info("Volunteer fetching all requests")
    try:
        response = requests.get(
            f"{BASE_URL}/volunteer/view-requests",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_success(f"Volunteer can see {len(data)} requests")
            
            if data:
                request = data[0]
                print_info(f"Sample request: {json.dumps(request, indent=2, default=str)}")
                if 'user_phone' in request:
                    print_success("User phone numbers visible to volunteers")
                else:
                    print_error("User phone numbers missing")
            
            return data
        else:
            error_detail = response.json().get('detail', 'Unknown error')
            print_error(f"Failed: {error_detail}")
            return None
    except Exception as e:
        print_error(f"Error: {e}")
        return None

def main():
    print_header("BACKEND COMPREHENSIVE TEST SUITE")
    print_info("Testing all endpoints for users and volunteers\n")
    
    # Check if server is running
    if not check_server():
        print_error("\nPlease start the server first: uvicorn main:app --reload")
        sys.exit(1)
    
    results = {
        'user_signup': False,
        'volunteer_signup': False,
        'user_login': False,
        'volunteer_login': False,
        'user_profile': False,
        'create_request': False,
        'get_requests': False,
        'volunteer_apply': False,
        'get_volunteers': False,
        'volunteer_view': False
    }
    
    # Test 1: User Signup
    user_data = test_signup_user()
    if user_data:
        results['user_signup'] = True
    
    # Test 2: Volunteer Signup
    volunteer_data = test_signup_volunteer()
    if volunteer_data:
        results['volunteer_signup'] = True
    
    # Test 3: User Login
    user_token = test_login_user("testuser_final@example.com", "testpass123")
    if user_token:
        results['user_login'] = True
        
        # Test 5: Get User Profile
        profile = test_get_user_profile(user_token)
        if profile:
            results['user_profile'] = True
            if profile.get('phone_number'):
                print_success(f"Phone number in profile: {profile['phone_number']}")
            
            # Test 6: Create Request
            request_data = test_create_request(user_token)
            request_id = request_data.get('id') if request_data else None
            if request_data:
                results['create_request'] = True
            
            # Test 7: Get All Requests (as user)
            requests_list = test_get_all_requests(user_token)
            if requests_list is not None:
                results['get_requests'] = True
            
            # Test 9: Get Volunteers for Request (as user who created it)
            if request_id:
                volunteers = test_get_volunteers_for_request(user_token, request_id)
                if volunteers is not None:
                    results['get_volunteers'] = True
    
    # Test 4: Volunteer Login
    volunteer_token = test_login_volunteer("volunteer_final@example.com", "testpass123")
    if volunteer_token:
        results['volunteer_login'] = True
        
        # Test 10: Volunteer View Requests
        volunteer_requests = test_volunteer_view_requests(volunteer_token)
        if volunteer_requests is not None:
            results['volunteer_view'] = True
            # Volunteer should see user phone numbers
            if volunteer_requests and 'user_phone' in volunteer_requests[0]:
                print_success("Volunteers can see user phone numbers ✅")
        
        # Test 8: Volunteer Apply (need request_id from earlier)
        if 'request_id' in locals() and request_id:
            applied = test_volunteer_apply(volunteer_token, request_id)
            if applied:
                results['volunteer_apply'] = True
                
                # Test getting volunteers again (should now include the volunteer)
                if user_token:
                    volunteers_after = test_get_volunteers_for_request(user_token, request_id)
                    if volunteers_after and len(volunteers_after) > 0:
                        print_success(f"User can see {len(volunteers_after)} volunteer(s) who applied")
                        vol = volunteers_after[0]
                        if vol.get('volunteer_name') and vol.get('volunteer_phone'):
                            print_success(f"User can see volunteer name: {vol['volunteer_name']} and phone: {vol['volunteer_phone']}")
    
    # Summary
    print_header("TEST SUMMARY")
    total_tests = len(results)
    passed_tests = sum(1 for v in results.values() if v)
    
    for test_name, passed in results.items():
        status = f"{Colors.GREEN}✅ PASS{Colors.RESET}" if passed else f"{Colors.RED}❌ FAIL{Colors.RESET}"
        print(f"{test_name.replace('_', ' ').title():30} {status}")
    
    print(f"\n{Colors.BOLD}Total: {passed_tests}/{total_tests} tests passed{Colors.RESET}")
    
    if passed_tests == total_tests:
        print_success("\n🎉 All tests passed! Backend is fully functional!")
    else:
        print_warning(f"\n⚠️  {total_tests - passed_tests} test(s) failed. Check the output above for details.")
    
    return passed_tests == total_tests

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Test interrupted by user{Colors.RESET}")
        sys.exit(1)
    except Exception as e:
        print_error(f"\n\nTest suite error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

