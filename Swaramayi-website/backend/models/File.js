const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Property Brochures',
        'Project Brochures',
        'Floor Plans',
        'Price Lists',
        'RERA Documents',
        'Company Profile',
        'Property Guide',
        'Site Plans',
        'Location Maps',
        'Property Documents',
      ],
      default: 'Company Profile',
    },
    description: { type: String },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);
