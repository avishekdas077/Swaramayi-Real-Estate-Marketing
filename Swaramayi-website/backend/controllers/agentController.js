const Agent = require('../models/Agent');

// @desc Get agents
// @route GET /api/agents
const getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find({ status: 'Active' });
    res.json({ success: true, data: agents });
  } catch (error) {
    next(error);
  }
};

// Admin CRUD
const createAgent = async (req, res, next) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(201).json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

const updateAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    res.json({ success: true, data: agent });
  } catch (error) {
    next(error);
  }
};

const deleteAgent = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
    await agent.deleteOne();
    res.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAgents, createAgent, updateAgent, deleteAgent };
