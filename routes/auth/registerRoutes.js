const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const  generateToken  = require('../../utils/generateToken');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists.',
      });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    // Generate a token for the new user
    const payload = {
      id: savedUser._id,
      username: savedUser.username,
    };
    const token = generateToken(payload);

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      user: savedUser,
      token:token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the user',
      error: error.message,
    });
  }
});

module.exports = router;
