const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { blacklist } = require("../middleware/authMiddleware");

// Route to handle user registration
router.post("/register", async (req, res) => {
  try {
    // Extract user registration data from request body
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to handle user login
router.post("/login", async (req, res) => {
  try {
    // Extract login credentials from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    // Return the token as JSON response
    res.json({ token });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    // Add token to blacklist
    blacklist.add(token);
  }
  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
