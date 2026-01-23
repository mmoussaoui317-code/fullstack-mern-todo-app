import DOMPurify from 'dompurify';

export const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [], // لا تسمح بأي tags
        ALLOWED_ATTR: []  // لا تسمح بأي attributes
    });
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return {
        isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
        errors: {
            length: !minLength ? 'Must be at least 8 characters' : null,
            uppercase: !hasUpperCase ? 'Must contain uppercase letter' : null,
            lowercase: !hasLowerCase ? 'Must contain lowercase letter' : null,
            numbers: !hasNumbers ? 'Must contain number' : null
        }
    };
};
