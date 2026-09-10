const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: '' },
    propertyInterested: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    propertyTitle: { type: String, default: '' },
    preferredVisitDate: { type: String },
    preferredVisitTime: { type: String },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-up', 'Site Visit Scheduled', 'Interested', 'Converted', 'Closed'],
      default: 'New',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
