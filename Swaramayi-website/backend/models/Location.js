const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    city: { type: String, default: 'Kolkata' },
    description: { type: String },
    image: { type: String },
    popular: { type: Boolean, default: false },
    propertyCount: { type: Number, default: 0 },

    // Factual details for Kolkata location pages
    connectivity: { type: String },
    schools: { type: String },
    hospitals: { type: String },
    shopping: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
