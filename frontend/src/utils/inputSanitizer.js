export const sanitizeUserInput = (input) => {
    if (!input) return '';
    
    // إزالة الأحرف الخطرة
    const dangerousChars = /[<>'"&;()]/g;
    let sanitized = input.replace(dangerousChars, '');
    
    // تحديد الطول
    sanitized = sanitized.substring(0, 100);
    
    // إزالة المسافات الزائدة
    sanitized = sanitized.trim();
    
    return sanitized;
};

// استخدامه في React Component
import { sanitizeUserInput } from './utils/inputSanitizer';

const handleInputChange = (e) => {
    const rawInput = e.target.value;
    const cleanInput = sanitizeUserInput(rawInput);
    setInput(cleanInput);
};
