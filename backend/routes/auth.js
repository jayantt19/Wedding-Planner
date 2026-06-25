const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();



// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    console.log("Existing user:", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Before save");

    const savedUser = await user.save();

    console.log("After save:", savedUser);

    res.status(201).json({
      message: "Account created successfully",
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;