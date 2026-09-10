const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, updateEnquiry } = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.post('/', createEnquiry);
router.get('/', protect, adminOnly, getEnquiries);
router.put('/:id', protect, adminOnly, updateEnquiry);

module.exports = router;
