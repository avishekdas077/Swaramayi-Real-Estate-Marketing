const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },

    developer: { type: String, required: true },
    city: { type: String, required: true, default: 'Kolkata' },
    location: { type: String, required: true }, // e.g. Rajarhat
    locality: { type: String },
    society: { type: String },

    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },

    propertyTypes: [{ type: String }],
    bhkOptions: [{ type: String }],

    totalUnits: { type: Number, default: 0 },

    constructionStatus: { type: String, enum: ['New Launch', 'Under Construction', 'Ready to Move'], default: 'Under Construction' },
    possessionStatus: { type: String, default: '2026 - 2028' },

    reraApproved: { type: Boolean, default: true },
    reraNumber: { type: String, default: '' },

    amenities: [{ type: String }],
    specifications: { type: String },

    images: [{ type: String }],
    floorPlans: [{ type: String }],
    masterPlan: { type: String },
    sitePlan: { type: String },
    brochure: { type: String },

    latitude: { type: Number },
    longitude: { type: Number },

    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
