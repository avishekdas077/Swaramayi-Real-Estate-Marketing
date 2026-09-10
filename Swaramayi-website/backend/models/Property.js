const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },

    category: { type: String, enum: ['Buy', 'Rent', 'Commercial', 'PG'], default: 'Buy', index: true },
    propertyType: {
      type: String,
      enum: [
        'Apartment',
        'Flat',
        'Villa',
        'Independent House',
        'Builder Floor',
        'Studio Apartment',
        'Penthouse',
        'Plot',
        'Land',
        'Luxury Property',
        'Commercial Office',
        'Retail Shop',
        'Showroom',
        'Warehouse',
        'Industrial Property',
        'Commercial Building',
        'Co-working Space',
      ],
      required: true,
      index: true,
    },
    listingType: { type: String, enum: ['Sale', 'Rent', 'Lease'], default: 'Sale' },
    priceType: { type: String, enum: ['Sale Price', 'Monthly Rent', 'Price Per Sqft'], default: 'Sale Price' },

    price: { type: Number, required: true, index: true },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    pricePerSqft: { type: Number },

    city: { type: String, required: true, default: 'Kolkata', index: true },
    location: { type: String, required: true, index: true }, // e.g. New Town, Rajarhat
    locality: { type: String },
    society: { type: String },
    phase: { type: String },

    developer: { type: String },

    bedrooms: { type: Number, default: 0, index: true },
    bathrooms: { type: Number, default: 0, index: true },
    balconies: { type: Number, default: 0 },

    areaSqft: { type: Number, required: true, index: true },
    carpetArea: { type: Number },
    builtUpArea: { type: Number },
    plotArea: { type: Number },

    floor: { type: Number },
    totalFloors: { type: Number },

    facing: { type: String, enum: ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'] },
    furnishing: { type: String, enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'], default: 'Unfurnished' },
    parking: { type: String, enum: ['Covered', 'Open', 'None', 'Both'], default: 'Covered' },

    propertyAge: { type: String, default: 'New Construction' },

    constructionStatus: { type: String, enum: ['Ready to Move', 'Under Construction', 'New Launch'], default: 'Ready to Move' },
    possessionStatus: { type: String, default: 'Immediate' },

    reraApproved: { type: Boolean, default: false },
    reraNumber: { type: String, default: '' },

    amenities: [{ type: String }],

    images: [{ type: String }],
    videos: [{ type: String }],
    floorPlans: [{ type: String }],
    brochure: { type: String, default: '' },

    latitude: { type: Number },
    longitude: { type: Number },

    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },

    featured: { type: Boolean, default: false, index: true },
    verified: { type: Boolean, default: true, index: true },
    premium: { type: Boolean, default: false },
    published: { type: Boolean, default: true, index: true },
    isSold: { type: Boolean, default: false, index: true },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

propertySchema.index({ city: 1, location: 1, propertyType: 1, price: 1 });
propertySchema.index({ title: 'text', description: 'text', location: 'text', society: 'text' });

module.exports = mongoose.model('Property', propertySchema);
