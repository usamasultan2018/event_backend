const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided email address.",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = generateToken(payload);

    return res.status(200).json({
      user: user._id,
      success: true,
      message: "Login successful! Welcome back.",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during login. Please try again later.",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists.',
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
      username: savedUser.username,
    };
    const token = generateToken(payload);

    return res.status(200).json({
      success: true,
      message: 'User added successfully',
      user: savedUser,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the user',
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser
};
