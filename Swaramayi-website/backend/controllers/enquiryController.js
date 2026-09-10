const Enquiry = require('../models/Enquiry');

// @desc Submit property enquiry
// @route POST /api/enquiries
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, propertyInterested, propertyTitle, preferredVisitDate, preferredVisitTime } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and phone number' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      propertyInterested: propertyInterested || null,
      propertyTitle: propertyTitle || '',
      preferredVisitDate: preferredVisitDate || '',
      preferredVisitTime: preferredVisitTime || '',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our Swarnamayi agent will contact you shortly.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all enquiries (Admin)
// @route GET /api/enquiries
const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('propertyInterested', 'title location price slug')
      .populate('assignedAgent', 'name phone email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};

// @desc Update enquiry status / agent (Admin)
// @route PUT /api/enquiries/:id
const updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiry };
