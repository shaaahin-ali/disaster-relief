"""Quick test to verify signup and login endpoints"""
import requests
import json

BASE = "http://localhost:8000"

print("Testing Signup and Login Endpoints\n")

# Test User Signup
print("1. Testing USER SIGNUP...")
user_data = {
    "username": "quicktest_user",
    "email": "quicktest_user@test.com",
    "password": "test123",
    "phone_number": "1111111111",
    "role": "user"
}
try:
    r = requests.post(f"{BASE}/signup", json=user_data, timeout=5)
    print(f"   Status: {r.status_code}")
    if r.status_code == 201:
        print(f"   ✅ SUCCESS: {json.dumps(r.json(), indent=6)}")
        user_token_data = None
        # Test Login
        print("\n2. Testing USER LOGIN...")
        login_r = requests.post(
            f"{BASE}/login",
            data={"username": user_data["email"], "password": user_data["password"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=5
        )
        print(f"   Status: {login_r.status_code}")
        if login_r.status_code == 200:
            user_token_data = login_r.json()
            print(f"   ✅ SUCCESS: Got token")
            # Test Profile
            print("\n3. Testing GET USER PROFILE...")
            profile_r = requests.get(
                f"{BASE}/users/me",
                headers={"Authorization": f"Bearer {user_token_data['access_token']}"},
                timeout=5
            )
            print(f"   Status: {profile_r.status_code}")
            if profile_r.status_code == 200:
                print(f"   ✅ SUCCESS: {json.dumps(profile_r.json(), indent=6)}")
            else:
                print(f"   ❌ FAILED: {profile_r.text}")
        else:
            print(f"   ❌ FAILED: {login_r.text}")
    else:
        print(f"   ❌ FAILED: {r.text}")
except Exception as e:
    print(f"   ❌ ERROR: {e}")

# Test Volunteer Signup
print("\n4. Testing VOLUNTEER SIGNUP...")
volunteer_data = {
    "username": "quicktest_volunteer",
    "email": "quicktest_volunteer@test.com",
    "password": "test123",
    "phone_number": "2222222222",
    "role": "volunteer"
}
try:
    r = requests.post(f"{BASE}/signup", json=volunteer_data, timeout=5)
    print(f"   Status: {r.status_code}")
    if r.status_code == 201:
        print(f"   ✅ SUCCESS: {json.dumps(r.json(), indent=6)}")
        # Test Login
        print("\n5. Testing VOLUNTEER LOGIN...")
        login_r = requests.post(
            f"{BASE}/login",
            data={"username": volunteer_data["email"], "password": volunteer_data["password"]},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=5
        )
        print(f"   Status: {login_r.status_code}")
        if login_r.status_code == 200:
            volunteer_token_data = login_r.json()
            print(f"   ✅ SUCCESS: Got token")
            # Test Profile
            print("\n6. Testing GET VOLUNTEER PROFILE...")
            profile_r = requests.get(
                f"{BASE}/users/me",
                headers={"Authorization": f"Bearer {volunteer_token_data['access_token']}"},
                timeout=5
            )
            print(f"   Status: {profile_r.status_code}")
            if profile_r.status_code == 200:
                print(f"   ✅ SUCCESS: {json.dumps(profile_r.json(), indent=6)}")
            else:
                print(f"   ❌ FAILED: {profile_r.text}")
        else:
            print(f"   ❌ FAILED: {login_r.text}")
    else:
        print(f"   ❌ FAILED: {r.text}")
except Exception as e:
    print(f"   ❌ ERROR: {e}")

print("\n✅ Quick test completed!")




