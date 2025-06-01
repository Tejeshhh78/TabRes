const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  room: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', TableSchema);