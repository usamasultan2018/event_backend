const express = require("express");
const router = express.Router();
const {userMiddleware} = require('../middlewares/userMiddleware');
const {changePassword,forgotPassword,resetPassword,resendOTP} = require('../controller/passwordController');

router.post('/change',userMiddleware,changePassword);
router.post('/forgot',forgotPassword);
router.post('/reset',resetPassword);
router.post('/resend-otp',resendOTP);


module.exports  = router;