const express = require('express');
const router = express.Router();
const {userModule, useModule} = require("../module/User");
const { generateToken } = require("../utils/jwtUtils");
const { registerValidation } = require("../middleware/validation");
const { validate } = require("../middleware/validation");
const { Suspense } = require('react');

// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const validate = require("../middleware/validation");

// Register Route
router.route('/register').post(async (req, res) => {
    try {
    const { username, email, password } = req.body;
    // TODO: Add validation
    const existingUser = await userModule.findOne({ $or: [{username}, {email}]});

    if(existingUser) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username or email already exist Change It!',
        });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    
    // const newUser = new useModule({username, email, hashedPassword});
    // await newUser.save();
        // ******** the the difference between them create has the save method include
    const user = await useModule.create({
        username,
        email,
        password
    })

    const token = newUser.generateToken(user._id);

    res.status(200).json({ 
        success: true, 
        message: 'User registered successfully',
        token,
        user: { id: user._id, username: username, email:email, createAt: user.createAt }
    });
    } catch(error) {
        console.error("Registration Error: ", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        })
    }
});

// Login Route  
router.post('/login', async (req, res) => {
    try{
    const { email, password } = req.body;
        // TODO: Add authentication
        

        const user = await userModule.findOne({email: email}).select('+password');

        if(!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Logged in Invalid email or password',
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch(error) {
        console.log("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        })

    }
});

module.exports = router;
