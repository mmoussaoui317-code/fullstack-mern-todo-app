import re
# improved the script of the checker password
import hashlib

def check_password_strength(password):
    score = 0
    if len(password) > 8: score +=1
    if re.search(r"[A-Z]", password): score += 1
    if re.search(r"[a-z]", password): score += 1
    if re.search(r"\d", password): score += 1
    if re.search(r"[*@%^&|+-.><!?]", password): score += 1

    strength = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return strength[score]


print(check_password_strength("Test123!"))

class PasswordManager:
    def __init__(self):
        self.common_passwords = ['123456', 'password', '123456789', 'qwerty']

    def check_strength(self, password):
        score = 0
        checks = {
            'length': len(password) >= 8,
            'uppercase': bool(re.search(r"[A-Z]", password)),
            'lowercase': bool(re.search(r"[a-z]", password)),
            'digit': bool(re.search(r"[\d]", password)),
            # 'special': bool(re.search(r"@!%&"), password),
            'special': bool(re.search(r'[!@#$%^&*]', password)),
            'not_common': password not in self.common_passwords
        }

        score = sum(checks.values())

        return {
            'score': score,
            'checks': checks,
            'hash': hashlib.sha256(password.encode()).hexdigest()[10:] + '...'
        }


# print(check_strength(PasswordManager.self,"45aas7844"))
# print(check_strength(PasswordManager. "hello7845"))
pm = PasswordManager().check_strength("at#wQQ_hq@w785sd")

print(pm)