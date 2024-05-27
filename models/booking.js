// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'canceled'],
    default: 'booked'
  },
  ticketQuantity: {
    type: Number,
    required: true
  },
  bookedAt: {
    type: Date,
    default: Date.now
  },
  totalPrice :{
    type:Number,
    required:true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
