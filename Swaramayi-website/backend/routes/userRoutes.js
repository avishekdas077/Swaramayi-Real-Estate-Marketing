const express = require('express');
const router = express.Router();
const { getUsers, updateUserStatus } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', protect, adminOnly, getUsers);
router.put('/:id', protect, adminOnly, updateUserStatus);

module.exports = router;
