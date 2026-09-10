const Project = require('../models/Project');
const slugify = require('../utils/slugGenerator');

// @desc Get projects
// @route GET /api/projects
const getProjects = async (req, res, next) => {
  try {
    const { status, featured, location } = req.query;
    const query = { published: true };

    if (status) query.constructionStatus = status;
    if (featured === 'true') query.featured = true;
    if (location) query.location = new RegExp(location, 'i');

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc Get project by slug
// @route GET /api/projects/:slug
const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc Create project (Admin)
// @route POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const { name, developer, location, priceMin, priceMax } = req.body;
    let slug = slugify(name);
    const existing = await Project.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const project = await Project.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc Update project (Admin)
// @route PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    if (req.body.name && req.body.name !== project.name) {
      req.body.slug = slugify(req.body.name);
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc Delete project (Admin)
// @route DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, getProjectBySlug, createProject, updateProject, deleteProject };
