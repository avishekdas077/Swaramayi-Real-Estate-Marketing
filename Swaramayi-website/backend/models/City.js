const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String, default: 'West Bengal' },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('City', citySchema);
