const express = require('express');
const router = express.Router();
const User = require("../modules/User");
const {generateToken, verifyToken} = require("../utils/jwtUtils");
const bcrypt = require("bcryptjs/dist/bcrypt");
// const { registerValidation } = require("../middleware/validation");
// const { validate } = require("../middleware/validation");
// const { Suspense } = require('react');
// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const validate = require("../middleware/validation");

// Register Route

router.route('/register').post(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // TODO: Add validation
        const existingUser = await User.findOne({ $or: [{username}, {email}]});

        if(existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username or email already exist Change It!',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        /**
        * // const salt = await bcrypt.genSalt(10);
        * // const hashedPassword = await bcrypt.hash(password, salt);

        * // const newUser = new useModule({username, email, hashedPassword});
        * // await newUser.save();
            */
        // ******** the the difference between them create has the save method include
        const user = await User.create({
            username,
            email,
            password: passwordHashed
        });

        const token = generateToken(user._id);

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
        });
    }
});

// Login Router  
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        // TODO: Add authentication
        // console.log(email, password);
        const user = await User.findOne({email: email}).select('+password');

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
        });

    } catch(error) {
        console.log("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });

    }
});

router.get('/me', async (req, res) => {
    try {
        const { token } = req.query;

        const { id } = verifyToken(token);

        // console.log(response);

        const meUser = await User.findOne({ _id: id }).select('-isAdmin -password -createdAt -updatedAt -_id');

        if(!meUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // console.log(meUser);

        return res.status(200).json({
            success: true,
            message: 'the current user connected is me !!',
            user: { username: meUser.username, email: meUser.email }
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: "Server Error During Fetch Data",
        });
    }
});

module.exports = router;
