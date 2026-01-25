const mongoose = require("mongoose");
// const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters"]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [8, "Password must be at least 8 characters"],
        select: false // must to search of it the password not returned after the  ..
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    }
},{
        timestamps: true,
        index: false,
        versionKey: false
    }
);

/***
 * this like a trigger in the database RDBMS 
 * so this function run before save the user
 * and i'm forget to generate bycrypt.salt after hashing the password
 */
// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password'))
//         return next();

//     try {
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     } catch(error) {
//         next();
//     }
// });

/***
 * this occurred an error says the next function is not a function
 * so i will hashed the password in the register function after the creation
 * follow this ../routes/auth
 */

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
    
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     } catch (error) {
//         console.error("Generate password error: " + error);
//     }

//     next();
// });


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


/**
 * this method generateJWT create before added file JwtUtils
 *  this file contain the same function 
 * so this commented to because i don't need more
 */
// userSchema.methods.generateJWT = function() {
//     return Jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
// }

// const generateToken = (userId) => {
//     return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "1h"})
// }

const User = mongoose.model("User", userSchema);

module.exports = User