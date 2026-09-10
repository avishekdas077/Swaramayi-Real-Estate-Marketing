const File = require('../models/File');

// @desc Get files/resources
// @route GET /api/files
const getFiles = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const files = await File.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: files });
  } catch (error) {
    next(error);
  }
};

// @desc Upload file (Admin)
// @route POST /api/files
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a valid file' });
    }

    const { title, category, description } = req.body;
    const newFile = await File.create({
      title: title || req.file.originalname,
      category: category || 'Company Profile',
      description: description || '',
      filePath: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
    });

    res.status(201).json({ success: true, data: newFile });
  } catch (error) {
    next(error);
  }
};

// @desc Delete file (Admin)
// @route DELETE /api/files/:id
const deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ success: false, message: 'File not found' });
    await file.deleteOne();
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFiles, uploadFile, deleteFile };
