import mongoose from 'mongoose';

// // ❌ the dangerous way without mongoose functions
// const dangerousQuery = (userInput) => {
//      this sql request is not safe because it is not sanitized
//     const query = `SELECT * FROM users WHERE username = '${userInput}'`;
//     return query;
// };

// ✅ the safe way with Mongoose
const safeQuery = async (userInput) => {
    // mongoose prepares the input and sql request in a safe way
    const users = await mongoose.model('User').find({
        username: userInput  // here mongoose sanitize the input
    });
    return users;
};

// ✅ add more protection: Input Sanitization

const sanitizeInput = (input) => {
    return input
        .replace(/[;\-\-]/g, '') // remove ; and -- dangerous characters
        .trim() // remove spaces
        .substring(0, 100); // limit the length
};

module.exports = { safeQuery, sanitizeInput };
