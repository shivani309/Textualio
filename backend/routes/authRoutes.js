import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("📨 Incoming register request:", req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("⚠️ Missing field");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    
    const newUser = new User({ name, email, password});
    await newUser.save();
    console.log("✅ User created:", newUser._id);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user with that email");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 🔍 Add these two lines to debug the password mismatch
    console.log("Entered password:", password);
    console.log("Stored (hashed) password:", user.password);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("❌ Wrong password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

export default router;
