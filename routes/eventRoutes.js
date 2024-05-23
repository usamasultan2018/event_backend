const express = require('express');
const router = express.Router();
const { addEvent } = require('../controller/eventController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/add', adminMiddleware, addEvent);

module.exports = router;
