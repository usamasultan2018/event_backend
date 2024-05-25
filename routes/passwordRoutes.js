const express = require("express");
const router = express.Router();
const {userMiddleware} = require('../middlewares/userMiddleware');
const {changePassword,forgotPassword,resetPassword} = require('../controller/passwordController');

router.post('/change',userMiddleware,changePassword);
router.post('/forgot',forgotPassword);
router.post('/reset',resetPassword);

module.exports  = router;