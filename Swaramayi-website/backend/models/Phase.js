const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    society: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Phase', phaseSchema);
