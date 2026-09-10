const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    profileImage: { type: String, default: '' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    designation: { type: String, default: 'Real Estate Consultant' },
    bio: { type: String, default: '' },
    experience: { type: String, default: '5+ Years' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', agentSchema);
