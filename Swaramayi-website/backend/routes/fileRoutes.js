const express = require('express');
const router = express.Router();
const { getFiles, uploadFile, deleteFile } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getFiles);
router.post('/', protect, adminOnly, upload.single('file'), uploadFile);
router.delete('/:id', protect, adminOnly, deleteFile);

module.exports = router;
