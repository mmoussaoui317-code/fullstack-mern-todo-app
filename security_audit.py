import requests
import json

class SecurityAudit:
    def __init__(self, base_url):
        self.base_url = base_url
        self.results = []
    
    def check_xss_vulnerability(self):
        test_payloads = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert(1)>",
            "'><script>alert(1)</script>"
        ]
        
        for payload in test_payloads:
            data = {"title": payload, "description": "test"}
            try:
                response = requests.post(f"{self.base_url}/api/todos", json=data)
                
                if payload in response.text:
                    self.results.append(f"❌ XSS Vulnerability found: {payload}")
                else:
                    self.results.append(f"✅ Protected against: {payload}")
                    
            except Exception as e:
                self.results.append(f"⚠️ Error testing {payload}: {str(e)}")
        
        return self.results

# Utilize the SecurityAudit class
audit = SecurityAudit("http://localhost:5000")
print("\n".join(audit.check_xss_vulnerability()))
