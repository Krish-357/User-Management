const express = require("express");
const mongoose = require("mongoose");
const user = require("../models/usermodel");
const bcrypt = require("bcryptjs"); // For password hashing
const router = express.Router();

// Get All Users (Admin view)
router.get("/", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        res.status(500).send("Error retrieving users");
    }
});

// User Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ name, email, password: hashedPassword });
        await newUser.save();
        res.send("User registered successfully");
    } catch (error) {
        res.status(500).send("Registration failed");
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).send("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }

        // Successful login, send the user's name back in the response
        res.json({ message: "Login successful", redirect: "/dashboard", name: existingUser.name });
    } catch (error) {
        res.status(500).send("Login failed");
    }
});

router.post("/logout", (req, res) => {
    // Clear user session (if you're using sessions)
    // For this example, we are just sending a response
    res.send("Logout successful");
});

module.exports = router;