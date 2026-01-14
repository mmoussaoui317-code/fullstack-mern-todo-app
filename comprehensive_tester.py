import requests
import json

class AppTester:
    def __init__(self, base_url):
        self.base_url = base_url

    def test_all_endpoints(self):
        tests = [
            ("GET", "/", "Homepage"),
            ("POST", "/api/auth/register", "Registration"),
            ("POST", "/api/auth/login", "Login")
        ]
    
        results = []
        for method, endpoint, description in tests:
            try:
                if method == "GET":
                    response = requests.get(self.base_url + endpoint)
                else :
                    response = requests.post(self.base_url + endpoint, json={})
                
                results.append({
                    "endpoint": endpoint,
                    "status": response.status_code,
                    "working": response.status_code < 500
                })
            except:
                results.append({
                    "endpoint": endpoint,
                    "status": "Error",
                    "working": False
                })


        print("\n" + "="*50)
        print("APPLICATION TEST RESULTS")
        print(50*"=")

        for result in results:
            status = "✅ Worked" if result["working"] else "❌ Not Working"
            print(f"{status} {result['endpoint']}: {result['status']}")
        
        return results
    

tester = AppTester("http://localhost:5000")
tester.test_all_endpoints()