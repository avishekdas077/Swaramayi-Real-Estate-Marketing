const express = require('express');
const router = express.Router();
const { getAgents, createAgent, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/', getAgents);
router.post('/', protect, adminOnly, createAgent);
router.put('/:id', protect, adminOnly, updateAgent);
router.delete('/:id', protect, adminOnly, deleteAgent);

module.exports = router;
