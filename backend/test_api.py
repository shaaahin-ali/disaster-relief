"""
Test script for Disaster Relief API
Run this after starting the server with: uvicorn main:app --reload
"""

import requests
import json
from typing import Optional

BASE_URL = "http://localhost:8000"

class APITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.token: Optional[str] = None
        self.user_email: Optional[str] = None
        self.user_password: Optional[str] = None
        
    def print_response(self, response, title: str):
        """Pretty print API response"""
        print(f"\n{'='*60}")
        print(f"{title}")
        print(f"{'='*60}")
        print(f"Status Code: {response.status_code}")
        try:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        except:
            print(f"Response: {response.text}")
        print(f"{'='*60}\n")
    
    def test_root(self):
        """Test root endpoint"""
        print("\n🔍 Testing Root Endpoint...")
        response = requests.get(f"{self.base_url}/")
        self.print_response(response, "GET /")
        return response.status_code == 200
    
    def test_signup(self, username: str, email: str, password: str, role: str = "user"):
        """Test user signup"""
        print(f"\n🔍 Testing Signup - {username} ({role})...")
        data = {
            "username": username,
            "email": email,
            "password": password,
            "role": role
        }
        response = requests.post(f"{self.base_url}/signup", json=data)
        self.print_response(response, f"POST /signup - {username}")
        
        if response.status_code == 201:
            self.user_email = email
            self.user_password = password
            return True
        return False
    
    def test_login(self, email: str, password: str):
        """Test user login"""
        print(f"\n🔍 Testing Login - {email}...")
        data = {
            "username": email,  # OAuth2 uses 'username' field for email
            "password": password
        }
        response = requests.post(
            f"{self.base_url}/login",
            data=data,  # Use 'data' not 'json' for OAuth2PasswordRequestForm
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        self.print_response(response, f"POST /login - {email}")
        
        if response.status_code == 200:
            self.token = response.json().get("access_token")
            print(f"✅ Token received: {self.token[:50]}...")
            return True
        return False
    
    def test_get_users(self):
        """Test get all users (requires auth)"""
        print("\n🔍 Testing Get All Users...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/users", headers=headers)
        self.print_response(response, "GET /users")
        return response.status_code == 200
    
    def test_get_my_profile(self):
        """Test get current user profile"""
        print("\n🔍 Testing Get My Profile...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/users/me", headers=headers)
        self.print_response(response, "GET /users/me")
        return response.status_code == 200
    
    def test_create_request(self, title: str, description: str, location: str, urgency: str = "medium"):
        """Test create help request"""
        print(f"\n🔍 Testing Create Request - {title}...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        data = {
            "title": title,
            "description": description,
            "location": location,
            "urgency_level": urgency
        }
        response = requests.post(
            f"{self.base_url}/request/request-help",
            data=data,
            headers=headers
        )
        self.print_response(response, f"POST /request/request-help - {title}")
        return response.status_code == 201
    
    def test_get_all_requests(self):
        """Test get all requests"""
        print("\n🔍 Testing Get All Requests...")
        response = requests.get(f"{self.base_url}/request/")
        self.print_response(response, "GET /request/")
        return response.status_code == 200
    
    def test_get_request_by_id(self, request_id: int):
        """Test get request by ID"""
        print(f"\n🔍 Testing Get Request by ID - {request_id}...")
        response = requests.get(f"{self.base_url}/request/{request_id}")
        self.print_response(response, f"GET /request/{request_id}")
        return response.status_code == 200
    
    def test_volunteer_dashboard(self):
        """Test volunteer dashboard"""
        print("\n🔍 Testing Volunteer Dashboard...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/volunteer/dashboard", headers=headers)
        self.print_response(response, "GET /volunteer/dashboard")
        return response.status_code == 200
    
    def test_view_requests_as_volunteer(self):
        """Test view requests as volunteer"""
        print("\n🔍 Testing View Requests as Volunteer...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/volunteer/view-requests", headers=headers)
        self.print_response(response, "GET /volunteer/view-requests")
        return response.status_code == 200
    
    def test_apply_to_request(self, request_id: int):
        """Test volunteer application"""
        print(f"\n🔍 Testing Apply to Request - {request_id}...")
        if not self.token:
            print("❌ No token available. Login first.")
            return False
        
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.post(
            f"{self.base_url}/volunteer/apply/{request_id}",
            headers=headers
        )
        self.print_response(response, f"POST /volunteer/apply/{request_id}")
        return response.status_code == 201
    
    def run_full_test_suite(self):
        """Run complete test suite"""
        print("\n" + "="*60)
        print("🚀 STARTING DISASTER RELIEF API TEST SUITE")
        print("="*60)
        
        results = []
        
        # 1. Test root
        results.append(("Root Endpoint", self.test_root()))
        
        # 2. Test signup - Regular user
        results.append(("Signup - User", self.test_signup(
            "testuser", "testuser@example.com", "testpass123", "user"
        )))
        
        # 3. Test signup - Volunteer
        results.append(("Signup - Volunteer", self.test_signup(
            "testvolunteer", "volunteer@example.com", "testpass123", "volunteer"
        )))
        
        # 4. Test login - User
        results.append(("Login - User", self.test_login("testuser@example.com", "testpass123")))
        user_token = self.token
        
        # 5. Test get my profile
        results.append(("Get My Profile", self.test_get_my_profile()))
        
        # 6. Test get all users
        results.append(("Get All Users", self.test_get_users()))
        
        # 7. Test create request
        results.append(("Create Request", self.test_create_request(
            "Need Food Supplies",
            "We need immediate food supplies for 50 families affected by flood",
            "Downtown Area, City",
            "high"
        )))
        
        # 8. Test get all requests
        results.append(("Get All Requests", self.test_get_all_requests()))
        
        # 9. Test get request by ID
        results.append(("Get Request by ID", self.test_get_request_by_id(1)))
        
        # 10. Test login as volunteer
        results.append(("Login - Volunteer", self.test_login("volunteer@example.com", "testpass123")))
        
        # 11. Test volunteer dashboard
        results.append(("Volunteer Dashboard", self.test_volunteer_dashboard()))
        
        # 12. Test view requests as volunteer
        results.append(("View Requests as Volunteer", self.test_view_requests_as_volunteer()))
        
        # 13. Test apply to request
        results.append(("Apply to Request", self.test_apply_to_request(1)))
        
        # Print summary
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        passed = sum(1 for _, result in results if result)
        total = len(results)
        
        for test_name, result in results:
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{status} - {test_name}")
        
        print(f"\nTotal: {passed}/{total} tests passed")
        print("="*60 + "\n")
        
        return passed == total


if __name__ == "__main__":
    import sys
    
    print("\n⚠️  Make sure the server is running!")
    print("Start server with: uvicorn main:app --reload")
    print("\nPress Enter to continue or Ctrl+C to exit...")
    
    try:
        input()
    except KeyboardInterrupt:
        print("\nExiting...")
        sys.exit(0)
    
    tester = APITester()
    success = tester.run_full_test_suite()
    
    if success:
        print("🎉 All tests passed!")
        sys.exit(0)
    else:
        print("⚠️  Some tests failed. Check the output above.")
        sys.exit(1)



