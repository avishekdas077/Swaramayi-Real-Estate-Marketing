const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    description: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Developer', developerSchema);
