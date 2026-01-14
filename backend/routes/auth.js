const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {userModule, useModule} = require("../module/User");
const bcrypt = require("bcrypt");
// const validate = require("../middleware/validation");

// Register Route
router.route('/register').post(asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // TODO: Add validation
    const userExist = await userModule.findOne({username: username});

    if(userExist) {
        return res.status(400).json({ 
            success: true, 
            message: 'Username Exist Change It!',
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new useModule({username, email, hashedPassword});
    await newUser.save();
    const token = newUser.generateJWT();
    res.status(200).json({ 
        success: true, 
        message: 'User registered successfully',
        user: { username, email }
    });
}));

// Login Route  
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // TODO: Add authentication
    

    const user = await userModule.findOne({email: email});

    if(user) {
        return res.status(200).json({ 
            success: true, 
            message: 'Logged in successfully',
            token: 'sample-jwt-token'
        });
    }

});

module.exports = router;
