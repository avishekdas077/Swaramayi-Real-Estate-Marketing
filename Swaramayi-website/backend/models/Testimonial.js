const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Property Buyer' },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    avatar: { type: String, default: '' },
    isDemo: { type: Boolean, default: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
