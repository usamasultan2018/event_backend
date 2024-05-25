const User = require('../models/user');
const generateOTP = require('../utils/generateOTP');
const sendMail = require("../utils/sendMails");

// Controller method to change user password
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // Check if current password matches
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect.'
            });
        }

        // Update user password
        user.password = newPassword;
        await user.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Password changed successfully.'
        });
    } catch (error) {
        // Handle errors
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while changing the password.',
            error: error.message
        });
    }
};

// Controller method to handle forgot password request
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // Generate OTP and save it to user document
        const otp = generateOTP();
        user.otp = otp;
        await user.save();

        // Send password reset email with OTP
        const emailText = `Your OTP for password reset is: ${otp}.`;
        await sendMail({ to: email, subject: "Password Reset OTP", text: emailText });

        res.status(200).json({
            success: true,
            message: 'Password reset OTP sent to email.'
        });

    } catch (error) {
        // Handle errors
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request.',
            error: error.message
        });
    }
};

// Controller method to handle reset password request
const resetPassword = async(req,res)=>{
    try{
          // Get user input (email, OTP, new password)
          const { email, otp, newPassword } = req.body;
           // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
         // Verify OTP
         if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }

        // Reset password
        user.password = newPassword;
        user.otp = undefined; // Clear OTP after password reset
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
          
       
    }
    catch(error){
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

module.exports = {
    changePassword,
    forgotPassword,
    resetPassword
};
