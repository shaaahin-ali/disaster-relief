import requests
import json

url = "http://localhost:8000/signup"
data = {
    "username": "diag_user_" + str(hash("diag") % 1000),
    "email": f"diag_user_{hash('diag') % 1000}@example.com",
    "password": "password123",
    "phone_number": "1234567890",
    "role": "user"
}

print(f"Calling {url}...")
try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    try:
        print(json.dumps(response.json(), indent=2))
    except:
        print(response.text)
except Exception as e:
    print(f"Request failed: {e}")
