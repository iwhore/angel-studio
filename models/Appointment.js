const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  phone:    { type: String, required: true },
  service:  { type: String, required: true },
  time:     { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);