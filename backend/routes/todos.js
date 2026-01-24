const express = require("express");
const router = express.Router();
const { create, find } = require("../modules/Todo");
const authMiddleware =require( "../middleware/authMiddleware.js");

router.post("/", authMiddleware, async(req, res) => {
    try {
        const {title, description} = req.body;

        const todo = await create({
            title,
            description,
            user: req.userId
        });

        res.status(201).json({
            success: true,
            data: todo
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Failed to create todo"
        });
    }
});

router.get("/", authMiddleware, async(req, res) => {
    try {
        const todos = await find({
            user: req.userId
        });

        res.json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "failed to fetch todos"
        });
    }
});

module.exports = router;