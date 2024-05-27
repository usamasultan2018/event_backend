const express = require("express");
const router = express.Router();
const {userMiddleware} = require('../middlewares/userMiddleware');
const {bookEvent} = require('../controller/bookController');



router.post('/book/:id', userMiddleware, bookEvent);
 
module.exports = router;