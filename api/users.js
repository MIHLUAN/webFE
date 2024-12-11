const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Lấy danh sách tất cả người dùng
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Tạo mới một người dùng
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Error creating user" });
    }
});

// Xóa người dùng theo ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting user" });
    }
});

// Cập nhật người dùng theo ID
app.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Error updating user" });
    }
});

module.exports = app;
