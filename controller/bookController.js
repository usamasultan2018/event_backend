const Booking = require('../models/booking');
const Event = require('../models/event');
const User = require('../models/user');


const bookEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const userId = req.user.id;
      const { ticketQuantity } = req.body;
  
      // Ensure the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.'
        });
      }
  
      // Ensure the event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found.'
        });
      }
  
      // Calculate total price
      const totalPrice = event.price * ticketQuantity;
  
      // Create a new booking
      const booking = new Booking({
        user: userId,
        event: eventId,
        status: 'booked',
        ticketQuantity: ticketQuantity,
        totalPrice: totalPrice 
      });
      await booking.save();
      
      if (ticketQuantity > event.ticketQty) {
        return res.status(400).json({
          success: false,
          message: `Sorry, there are only ${event.ticketQty} tickets available for this event.`
        });
      }
      
      
      event.ticketQty -= ticketQuantity;
      await event.save();
  
      res.status(201).json({
        success: true,
        message: 'Event booked successfully.',
        booking:  booking
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while booking the event.',
        error: error.message
      });
    }
  };
  
  
  module.exports = {
    bookEvent
  }