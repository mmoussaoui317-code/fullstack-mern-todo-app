const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Todo title is required"],
        trim: true,
        maxLength: [100, "Title Can't exceed 100 Characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description cannot exceed 500 characters"]
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
    index: false,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;