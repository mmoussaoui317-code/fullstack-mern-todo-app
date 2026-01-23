// const mongoose = require('mongoose');
const express = require('express');
const xssProtectionMiddleware = require("./middleware/xssProtection")
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Security Middlewares
app.use(helmet()); // حماية Headers
app.use(cors()); // تفعيل CORS
app.use(express.json()); // تفعيل JSON parsing

// added the protection router from the XSS vulnerability
app.use(xssProtectionMiddleware);

// // 📦 Database Connection

// .then(() => console.log('✅ MongoDB Connected'))
// .catch(err => console.log('❌ MongoDB Error:', err));
const connectDB = require("./config/database");

connectDB();

// // 🚀 Basic Route (للاختبار)
// app.get('/', (req, res) => {
//     res.json({ message: 'MERN Todo API is running!' });
// });

// 🔐 Authentication Route
app.use('/api/auth', require("./routes/auth"));

// // app.use('api/test-xss', require('./routes/xss'));
// app.get("/xss", async (req, res) => {
//     res.render(require("../test.ejs"));
//     return res.status(201).json({ message: 'router worked!!' })
// });

// ⚡ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
});