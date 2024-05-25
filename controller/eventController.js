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
const getAllEvents = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    if (events.length === 0) {
      // If no events found, send a message indicating no events
      res.status(404).json({
        success: false,
        message: 'No events found.'
      });
    } else {
      // Send a success response with the fetched events
      res.status(200).json({
        success: true,
        message: 'Events fetched successfully',
        events: events
      });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events. Please try again later.',
      error: error.message
    });
  }
}

module.exports = {
    addEvent,getAllEvents
  };