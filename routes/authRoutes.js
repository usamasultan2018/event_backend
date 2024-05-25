const express = require('express');
const router = express.Router();
const { loginUser, registerUser,verifyUser,resendOTP } = require('../controller/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/verify',verifyUser);
router.post('/resend-otp',resendOTP)


module.exports = router;
