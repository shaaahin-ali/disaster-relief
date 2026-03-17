import requests
import json
import time

API_BASE_URL = "http://localhost:8000"

def test_otp_flow():
    # 1. Signup
    signup_data = {
        "username": f"test_sec_{int(time.time())}",
        "email": f"test_sec_{int(time.time())}@example.com",
        "password": "password123",
        "phone_number": "1234567890",
        "role": "user"
    }
    
    print(f"Signing up {signup_data['email']}...")
    resp = requests.post(f"{API_BASE_URL}/signup", json=signup_data)
    if resp.status_code != 200:
        print(f"Signup failed: {resp.text}")
        return
    print("Signup successful.")

    # 2. Try login before verification
    print("Trying login before verification...")
    resp = requests.post(f"{API_BASE_URL}/login", data={"username": signup_data["email"], "password": signup_data["password"]})
    print(f"Login status (expected 403): {resp.status_code}")
    if resp.status_code != 403:
        print("FAIL: Login should be blocked for unverified users.")
    else:
        print("PASS: Login blocked.")

    # 3. Verify OTP (Manual check needed or mock)
    # Since we can't easily get the OTP from email here without DB access or mock,
    # This test assumes you check the logs/terminal for the OTP.
    print("\n--- ACTION REQUIRED ---")
    print(f"Please find the 6-digit OTP in the backend terminal logs for {signup_data['email']}")
    otp = input("Enter the OTP from logs: ")

    # 4. Verify OTP
    print(f"Verifying OTP {otp}...")
    resp = requests.post(f"{API_BASE_URL}/verify-otp?email={signup_data['email']}&otp={otp}")
    print(f"Verify response: {resp.json()}")
    
    if resp.status_code == 200:
        print("PASS: Email verified.")
    else:
        print(f"FAIL: Verification failed: {resp.text}")
        return

    # 5. Try login after verification
    print("Trying login after verification...")
    resp = requests.post(f"{API_BASE_URL}/login", data={"username": signup_data["email"], "password": signup_data["password"]})
    print(f"Login status (expected 200): {resp.status_code}")
    if resp.status_code == 200:
        print("PASS: Login successful.")
    else:
        print(f"FAIL: Login failed after verification: {resp.text}")

    # 6. Try verify again (should fail/clear)
    print("Trying verification again (expected fail/already verified)...")
    resp = requests.post(f"{API_BASE_URL}/verify-otp?email={signup_data['email']}&otp={otp}")
    print(f"Re-verify response: {resp.json()}")

if __name__ == "__main__":
    test_otp_flow()
