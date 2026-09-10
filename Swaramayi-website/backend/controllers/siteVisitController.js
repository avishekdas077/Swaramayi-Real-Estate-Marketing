const SiteVisit = require('../models/SiteVisit');

// @desc Schedule a site visit
// @route POST /api/site-visits
const scheduleSiteVisit = async (req, res, next) => {
  try {
    const { name, email, phone, property, propertyTitle, visitDate, visitTime } = req.body;
    if (!name || !phone || !visitDate || !visitTime) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, visit date, and visit time' });
    }

    const visit = await SiteVisit.create({
      name,
      email: email || '',
      phone,
      property: property || null,
      propertyTitle: propertyTitle || '',
      visitDate,
      visitTime,
    });

    res.status(201).json({
      success: true,
      message: 'Site visit request submitted! Swarnamayi team will confirm your slot shortly.',
      data: visit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all site visits (Admin)
// @route GET /api/site-visits
const getSiteVisits = async (req, res, next) => {
  try {
    const visits = await SiteVisit.find()
      .populate('property', 'title location price slug')
      .populate('assignedAgent', 'name phone email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: visits });
  } catch (error) {
    next(error);
  }
};

// @desc Update site visit status (Admin)
// @route PUT /api/site-visits/:id
const updateSiteVisit = async (req, res, next) => {
  try {
    const visit = await SiteVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!visit) return res.status(404).json({ success: false, message: 'Site visit not found' });
    res.json({ success: true, data: visit });
  } catch (error) {
    next(error);
  }
};

module.exports = { scheduleSiteVisit, getSiteVisits, updateSiteVisit };
