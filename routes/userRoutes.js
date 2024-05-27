const express = require("express");
const router = express.Router();
const {userMiddleware} = require('../middlewares/userMiddleware');
const { updateUserProfile, getUserProfile,bookmark,deleteBookmark,getBookmarkedEvents } = require("../controller/userController");


// Route to update user profile
router.put('/profile', userMiddleware, updateUserProfile);

// Route to get user profile
router.get('/profile', userMiddleware, getUserProfile);

// router to post bookmark
router.post('/bookmark',userMiddleware, bookmark);
// router to get bookmark
router.get('/bookmark',userMiddleware,getBookmarkedEvents);

// router to delete a bookmark
router.delete('/bookmark/:id',userMiddleware,deleteBookmark);

module.exports = router;
