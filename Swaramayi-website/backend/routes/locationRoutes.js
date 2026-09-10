const express = require('express');
const router = express.Router();
const { getLocations, getLocationBySlug, getCities, getSocieties, getPhases, createLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getLocations);
router.get('/cities', getCities);
router.get('/societies', getSocieties);
router.get('/phases', getPhases);
router.get('/:slug', getLocationBySlug);

router.post('/', protect, adminOnly, createLocation);

module.exports = router;
