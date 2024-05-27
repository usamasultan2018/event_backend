const User = require('../models/user');
const Event = require('../models/event');

// Controller method to get user profile
const getUserProfile = async (req, res) => {
  try {
    // Extract user ID from the authenticated request

    const userId  = req.user.id;
        console.log("UserID = ",userId);
        // Fetch the user information
        const userProfile = await User.findById(userId);

    // Handle case when user profile is not found
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    // Return the user profile if found
    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully.',
      user: userProfile
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the user profile.',
      error: error.message
    });
  }
};

// Controller method to update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Extract user ID from the authenticated request
    const userId  = req.user.id;
        console.log("UserID = ",userId);
    // Extract updated data from the request body
    const updatedData = req.body;

    // Find and update the user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run validators for the updated fields
      context: 'query' // Ensure context is set to 'query'
    });

    // Handle case when user is not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Return the updated user profile
    res.status(200).json({
      success: true,
      message: 'User profile updated successfully.',
      user: updatedUser
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the user profile.',
      error: error.message
    });
  }
};


const bookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.'
      });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Ensure bookmarks is initialized
    if (!user.bookmarks) {
      user.bookmarks = [];
    }

    // Check if the event is already bookmarked
    if (user.bookmarks.includes(event._id)) {
      return res.status(400).json({
        success: false,
        message: 'Event is already bookmarked.'
      });
    }

    // Add event to bookmarks
    user.bookmarks.push(event._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Event bookmarked successfully.',
      bookmarks: user.bookmarks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while bookmarking the event.',
      error: error.message
    });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Ensure bookmarks is initialized
    if (!user.bookmarks) {
      user.bookmarks = [];
    }

    // Check if the event is bookmarked
    const index = user.bookmarks.indexOf(eventId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Event not found in bookmarks.'
      });
    }

    // Remove the item from the bookmarks array
    user.bookmarks.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Event removed from bookmarks successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while removing the event from bookmarks.',
      error: error.message
    });
  }
};

const getBookmarkedEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('bookmarks');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      bookmarks: user.bookmarks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching bookmarked events.',
      error: error.message
    });
  }
};
module.exports = {
  getUserProfile,
  updateUserProfile,
  bookmark,
  deleteBookmark,
  getBookmarkedEvents
};
