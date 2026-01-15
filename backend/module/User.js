const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
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

userSchema.pre('save', async function(next) {
    if(!this.isModified('password'))
        return next();

    try {
        const salt = await bcrypt.hash(this.password, salt);
        next();
    } catch(error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateJWT = function() {
    return Jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
}

const useModule = mongoose.model("User", userSchema);



module.exports = {
    useModule
}
