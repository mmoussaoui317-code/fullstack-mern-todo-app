export const sanitizeUserInput = (input) => {
    if (!input) return '';
    
    // replace the operators can used in injections
    const dangerousChars = /[<>'"&;()|/{}]/g;
    let sanitized = input.replace(dangerousChars, '');
    
    // specify the long or len of the value
    sanitized = sanitized.substring(0, 100);
    
    // Delete the spaces from right and left the value
    sanitized = sanitized.trim();
    
    return sanitized;
};
