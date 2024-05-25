const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');
const sendMail = require("../utils/sendMails");



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
  if(!user.verifiedUser){
    return res.status(401).json({
      success: false,
      message: "Account not verified",
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
    const otp = generateOTP();
    newUser.otp = otp;
    await newUser.save();
    const savedUser = await newUser.save();

     // Schedule deletion of unverified user after 10 minutes
     setTimeout(async () => {
      const user = await User.findById(newUser._id);
      if (user && !user.verifiedUser) {
        await User.findByIdAndDelete(newUser._id);
        console.log(`Deleted unverified user with ID: ${newUser._id}`);
      }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    const emailText = `Your OTP for account verification is: ${otp}.`;
    await sendMail({ to: email, subject: "Account Verification", text: emailText });
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

const verifyUser = async(req,res)=>{

  try{

    const {email,otp}  = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({
          success: false,
          message: 'User not found.'
      });
  }
  
   // Verify OTP
   if (user.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP.' });
}

user.verifiedUser = true,
user.otp = undefined;

await user.save();
res.status(200).json({ success: true, message: 'Account verified successfully' });

  }
  catch(error){
    res.status(500).json({ success: false, message: 'Internal server error.' ,error:error.message});
  }
}

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    const emailText = `Your OTP for account verification is: ${otp}.`;
    await sendMail({ to: email, subject: "Account Verification", text: emailText });

    res.status(200).json({
      success: true,
      message: 'New OTP sent to your email address.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while resending the OTP.',
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  resendOTP
};
