const mongoose = require("mongoose")
const Jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
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

userSchema.methods.generateJWT = function() {
    return Jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
}

const useModule = mongoose.model("User", userSchema);



module.exports = {
    useModule
}
