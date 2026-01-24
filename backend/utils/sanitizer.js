function sanitizeInput(input) {

    if(typeof input !== "string")
        return input;

    const dangerousPatterns = [
        { pattern: /<script\b[^>]*>[\s\S]*?<\/script>/gi, replace: '' },
        { pattern: /javascript:/gi, replace: 'blocked:' },
        { pattern: /on\w+=(["'])[^"']*\1/gi, replace: '' },
        { pattern: /on\w+=\w+/gi, replace: '' },
        { pattern: /<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, replace: '' },
        { pattern: /<object\b[^>]*>[\s\S]*?<\/object>/gi, replace: '' },
        { pattern: /<embed\b[^>]*>[\s\S]*?<\/embed>/gi, replace: '' },
        { pattern: /data:text\/html/gi, replace: 'data:blocked' }
    ];

    let clean = input;

    dangerousPatterns.forEach(({pattern, replace}) => {
        clean.replace(pattern, replace);
    });

    const specialChars = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
    };
    
    clean = clean.replace(/[<>"'&]/g, char => specialChars[char]);
    
    return clean;
}

function sanitizeObject(obj) {
    if(!obj || typeof obj !== 'object') 
        return obj;

    const sanitized = {};

    Object.entries().forEach(({key, value}) => {
        if(typeof value === 'string') {
            sanitized[key] = sanitizeInput(value);
        } else if(typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    });

    return sanitized;
}


module.exports =  { sanitizeInput, sanitizeObject }