const User = require('../models/user');

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

module.exports = {
  getUserProfile,
  updateUserProfile
};
