// ```javascript
// backend/server.js - ضعه في مشروعك
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 🔒 Security Middlewares
app.use(helmet()); // حماية Headers
app.use(cors()); // تفعيل CORS
app.use(express.json()); // تفعيل JSON parsing

// 📦 Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// 🚀 Basic Route (للاختبار)
app.get('/', (req, res) => {
    res.json({ message: 'MERN Todo API is running!' });
});

// 🔐 Authentication Route (سيكون في اليوم القادم)
app.post('/api/auth/register', (req, res) => {
    // Tomorrow's task
    res.json({ message: 'Register endpoint' });
});

// ⚡ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
});

// ```
