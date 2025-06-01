const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    enum: ['Vormittag', 'Nachmittag', 'Ganztags'],
    required: true
  },
  status: {
    type: String,
    enum: ['Bestätigt', 'Storniert'],
    default: 'Bestätigt'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexierung zur Beschleunigung von Abfragen für Verfügbarkeit
BookingSchema.index({ date: 1, table: 1, timeSlot: 1, status: 1 });

module.exports = mongoose.model('Booking', BookingSchema);