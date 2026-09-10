const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Amenity', amenitySchema);
