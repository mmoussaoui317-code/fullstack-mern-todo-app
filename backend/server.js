const express = require('express');
const xssProtectionMiddleware = require("./middleware/xssProtection");
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require("./config/database");
const morgan =  require('morgan');
require("dotenv").config();

const app = express();
/**
 *  This Has More Errors 
 *  First I'm added the path of the backend and the path of the frontend
 *  and the  variable process.env.VITE_PORT is not the correct port number of the frontend
 *  credentials: true -> allow to send cookies but me i'm not use them in this project
 *  /**
 *   * also the origin: * and this credentials: true doesn't work together in the same time
 *  **\/
 */
// const corsOptions = {
//     // origin: [
//     //         "https://fullstack-mern-todo-app.onrender.com",
//     //         "https://mmoussaoui317-code-fullstack-mern-t.vercel.app",
//     //         "https://fullstack-mern-todo-b8x7vpgua-moussaouims-projects.vercel.app",
//     //         `http://localhost:${process.env.VITE_PORT}`,
//     //         `http://localhost:5173/`
//     //     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }

const allowedOrigins = [
    "http://localhost:5173",
    "https://fullstack-mern-todo-app.vercel.app",
    "https://mmoussaoui317-code-fullstack-mern-t.vercel.app",
    "https://fullstack-mern-todo-b8x7vpgua-moussaouims-projects.vercel.app",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Postman / curl

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));



// 🔒 Security Middlewares
app.use(helmet()); // security Headers
app.use(cors(corsOptions)); // enable CORS
app.use("*", cors(corsOptions));


app.use(morgan(`combined`)); //enable the register of the request
app.use(express.json()); // enable JSON parsing

// // 📦 Database Connection
connectDB();


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

// added the protection router from the XSS vulnerability
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