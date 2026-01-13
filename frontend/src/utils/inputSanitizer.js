export const sanitizeUserInput = (input) => {
    if (!input) return '';
    
    // إزالة الأحرف الخطرة
    const dangerousChars = /[<>'"&;()|/{}]/g;
    let sanitized = input.replace(dangerousChars, '');
    
    // تحديد الطول
    sanitized = sanitized.substring(0, 100);
    
    // إزالة المسافات الزائدة
    sanitized = sanitized.trim();
    
    return sanitized;
};
