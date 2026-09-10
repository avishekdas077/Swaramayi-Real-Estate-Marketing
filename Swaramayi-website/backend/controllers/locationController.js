const Location = require('../models/Location');
const City = require('../models/City');
const Society = require('../models/Society');
const Phase = require('../models/Phase');
const Property = require('../models/Property');
const slugify = require('../utils/slugGenerator');

// @desc Get all Kolkata locations
// @route GET /api/locations
const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().sort({ name: 1 });
    res.json({ success: true, data: locations });
  } catch (error) {
    next(error);
  }
};

// @desc Get location by slug
// @route GET /api/locations/:slug
const getLocationBySlug = async (req, res, next) => {
  try {
    const location = await Location.findOne({ slug: req.params.slug });
    if (!location) return res.status(404).json({ success: false, message: 'Location not found' });

    // Fetch properties for this location
    const properties = await Property.find({
      location: new RegExp(location.name, 'i'),
      published: true,
    }).limit(12);

    res.json({ success: true, data: { location, properties } });
  } catch (error) {
    next(error);
  }
};

// @desc Get cities
// @route GET /api/cities
const getCities = async (req, res, next) => {
  try {
    const cities = await City.find();
    res.json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};

// @desc Get societies
// @route GET /api/societies
const getSocieties = async (req, res, next) => {
  try {
    const societies = await Society.find();
    res.json({ success: true, data: societies });
  } catch (error) {
    next(error);
  }
};

// @desc Get phases
// @route GET /api/phases
const getPhases = async (req, res, next) => {
  try {
    const phases = await Phase.find();
    res.json({ success: true, data: phases });
  } catch (error) {
    next(error);
  }
};

// Admin CRUD for Location
const createLocation = async (req, res, next) => {
  try {
    const { name } = req.body;
    let slug = slugify(name);
    const location = await Location.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLocations, getLocationBySlug, getCities, getSocieties, getPhases, createLocation };
