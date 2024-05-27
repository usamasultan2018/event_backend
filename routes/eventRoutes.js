const express = require('express');
const router = express.Router();
const { addEvent,getAllEvents,deleteEvent,updateEvent} = require('../controller/eventController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {userMiddleware} = require('../middlewares/userMiddleware');

router.post('/event',adminMiddleware, addEvent);
router.get('/event',getAllEvents);
router.delete('/event/:id',adminMiddleware,deleteEvent);
router.put("/event/:id",adminMiddleware,updateEvent);

module.exports = router;
