const express = require('express');
const router = express.Router();
const { addEvent,getAllEvents } = require('../controller/eventController');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/add', adminMiddleware, addEvent);
router.get('/get',getAllEvents);

module.exports = router;
