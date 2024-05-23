const express = require("express");
const router = express.Router();
const {userMiddleware} = require('../middlewares/userMiddleware');
const { updateUserProfile, getUserProfile } = require("../controller/userController");

// Route to update user profile
router.put('/profile', userMiddleware, updateUserProfile);

// Route to get user profile
router.get('/profile', userMiddleware, getUserProfile);

module.exports = router;
