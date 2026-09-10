const express = require('express');
const router = express.Router();
const { scheduleSiteVisit, getSiteVisits, updateSiteVisit } = require('../controllers/siteVisitController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.post('/', scheduleSiteVisit);
router.get('/', protect, adminOnly, getSiteVisits);
router.put('/:id', protect, adminOnly, updateSiteVisit);

module.exports = router;
