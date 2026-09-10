const mongoose = require('mongoose');

const siteVisitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    propertyTitle: { type: String },
    visitDate: { type: String, required: true },
    visitTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['Requested', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
      default: 'Requested',
    },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteVisit', siteVisitSchema);
