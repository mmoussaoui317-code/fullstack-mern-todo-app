const mongoose = require('mongoose');

// ❌ الطريقة الخطرة (لا تستخدمها أبداً)
const dangerousQuery = (userInput) => {
    // هذا عرضة لـ SQL Injection
    const query = `SELECT * FROM users WHERE username = '${userInput}'`;
    return query;
};

// ✅ الطريقة الآمنة مع Mongoose
const safeQuery = async (userInput) => {
    // Mongoose يستخدم Prepared Statements تلقائياً
    const users = await mongoose.model('User').find({
        username: userInput  // Mongoose ينظف المدخلات تلقائياً
    });
    return users;
};

// ✅ حماية إضافية: Input Sanitization

const sanitizeInput = (input) => {
    return input
        .replace(/[;\-\-]/g, '') // إزالة الأحرف الخطرة
        .trim()
        .substring(0, 100); // تحديد الطول
};

module.exports = { safeQuery, sanitizeInput };
