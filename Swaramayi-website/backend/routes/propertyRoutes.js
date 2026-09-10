const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyBySlug,
  getFeaturedProperties,
  getRecentProperties,
  getSoldProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/recent', getRecentProperties);
router.get('/sold', getSoldProperties);
router.get('/:slug', getPropertyBySlug);

// Admin Routes
router.post('/', protect, adminOnly, createProperty);
router.put('/:id', protect, adminOnly, updateProperty);
router.delete('/:id', protect, adminOnly, deleteProperty);

module.exports = router;
