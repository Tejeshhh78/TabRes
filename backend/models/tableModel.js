const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  room: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    enum: ['Monitor', 'Dockingstation', 'Höhenverstellbar', 'Spezial-PC', 'Telefonanlage']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', TableSchema);