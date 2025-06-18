const mongoose = require('mongoose');

const specialBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  datetime: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SpecialBooking', specialBookingSchema);