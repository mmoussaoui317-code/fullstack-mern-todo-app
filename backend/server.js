const express = require('express');
const xssProtectionMiddleware = require("./middleware/xssProtection");
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require("./config/database");
const morgan =  require('morgan');
require("dotenv").config();

const app = express();

// 🔒 Security Middlewares
app.use(helmet()); // security Headers
app.use(cors({
    origin: "https://fullstack-mern-todo-b8x7vpgua-moussaouims-projects.vercel.app/login",
    credentials: true,
    optionsSuccessStatus: 200
})); // enable CORS


app.use(morgan(`combined`)); //enable the register of the request
app.use(express.json()); // enable JSON parsing

// // 📦 Database Connection
connectDB();

// added the protection router from the XSS vulnerability

// 🚀 Router Represent The App 
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'MERN Todo APP Backend is Live!',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            docs: '/api-docs',
            auth: '/api/auth',
            todos: '/api/todos',
            health: '/health'
        }
    });
});

// creation of the health router checker
app.get('/health', (req, res) => {
    res.status(201).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});

app.use(xssProtectionMiddleware);
// 🔐 Authentication Route
app.use('/api/auth', require("./routes/auth"));

app.use('/api/todos', require("./routes/todos"));

// // handle the 404 error for the routes not found
// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: `Route ${req.originalUrl} not found`
//     });
// });

// // Error handler
// app.use((err, req, res, next) => {
//     console.error('server error:', err);
//     res.status(500).json({
//         success: false,
//         message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
//     });
// });

// ⚡ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}`);
});