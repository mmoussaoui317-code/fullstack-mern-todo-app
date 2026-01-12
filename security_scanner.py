import requests
import json

class BasicSecurityScanner:
    def __init__(self, url):
        self.url = url
        self.results = []

    def check_headers(self):
        response = requests.get(self.url)
        headers = response.headers

        security_headers = {
            'X-Frame-Options': 'Protects against clickjacking',
            'X-Content-Type-Options': 'Prevents MIME sniffing',
            'Strict-Transport-Security': 'Enforces HTTPS'
        }
            
        for header, description in security_headers.items():
            if header in headers:
                self.results.append(f"✅ {header}: Present ({description})")
            else:
                self.results.append(f"⚠️  {header}: Missing ({description})")

        return self.results
    

scanner = BasicSecurityScanner('http://localhost:5000')
print("\n".join(scanner.check_headers()))

