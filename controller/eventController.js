const Event = require('../models/event');
const User = require('../models/user');
const addEvent = async (req,res)=>{
    try {
        const eventData = req.body;
        const userId  = req.user.id;
        console.log("UserID = ",userId);
        // Fetch the user information
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found.',
          });
        }
    
        const newEvent = new Event(eventData);
        const addedEvent = await newEvent.save();
    
        res.status(200).json({
          success: true,
          message: 'Event added successfully',
          event: addedEvent
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'An error occurred while adding the event',
          error: error.message
        });
      }
}
module.exports = {
    addEvent
  };