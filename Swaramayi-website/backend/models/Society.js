const mongoose = require('mongoose');

const societySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    city: { type: String, default: 'Kolkata' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Society', societySchema);
