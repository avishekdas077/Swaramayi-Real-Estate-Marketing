const Property = require('../models/Property');
const slugify = require('../utils/slugGenerator');
const { getPagination, formatPaginatedResponse } = require('../utils/pagination');

// Helper to normalize CRM MongoDB properties for Website frontend display
const normalizeProperty = (doc) => {
  if (!doc) return null;
  const p = typeof doc.toObject === 'function' ? doc.toObject() : doc;

  const rawTitle = p.title || p.property_title || 'Swaramayi Premium Property';
  const rawPrice = p.price || p.final_price || p.final_estimated_price || p.base_price || 7500000;
  const rawLocality = p.location || p.locality || p.city || 'Kolkata';
  const rawArea = p.areaSqft || p.carpet_area_sqft || p.built_up_area_sqft || 1200;
  const rawType = p.propertyType || p.property_type || 'Apartment';
  const rawSlug = p.slug || slugify(rawTitle) + '-' + (p.property_code || p._id || Date.now());

  let bhk = p.bedrooms || 0;
  if (!bhk && p.configuration) {
    const match = (p.configuration || '').match(/(\d+)\s*BHK/i);
    if (match) bhk = parseInt(match[1], 10);
  }

  return {
    ...p,
    title: rawTitle,
    slug: rawSlug,
    price: Number(rawPrice) || 7500000,
    location: rawLocality,
    locality: rawLocality,
    areaSqft: Number(rawArea) || 1200,
    propertyType: rawType,
    bedrooms: bhk || 2,
    bathrooms: p.bathrooms || Math.max(1, bhk - 1) || 2,
    images: p.images && p.images.length > 0 ? p.images : ['/images/property-placeholder.jpg'],
    featured: p.featured !== undefined ? p.featured : true,
    published: p.published !== undefined ? p.published : true,
    verified: p.verified !== undefined ? p.verified : true,
  };
};

// @desc Get properties with filtering, sorting, pagination
// @route GET /api/properties
const getProperties = async (req, res, next) => {
  try {
    const {
      city,
      location,
      locality,
      society,
      category,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      search,
      sort,
    } = req.query;

    const query = { is_deleted: { $ne: true } };

    if (city) query.$or = [{ city: new RegExp(city, 'i') }, { location: new RegExp(city, 'i') }];
    if (location || locality) {
      const locStr = location || locality;
      query.$or = [
        { location: new RegExp(locStr, 'i') },
        { locality: new RegExp(locStr, 'i') },
        { city: new RegExp(locStr, 'i') }
      ];
    }

    if (category) query.category = category;
    if (propertyType) {
      query.$or = [
        { propertyType: propertyType },
        { property_type: propertyType }
      ];
    }

    if (minPrice || maxPrice) {
      const pMin = minPrice ? Number(minPrice) : 0;
      const pMax = maxPrice ? Number(maxPrice) : 999999999;
      query.$or = [
        { price: { $gte: pMin, $lte: pMax } },
        { final_price: { $gte: pMin, $lte: pMax } },
        { base_price: { $gte: pMin, $lte: pMax } }
      ];
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { property_title: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { locality: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };

    const { page, limit, skip } = getPagination(req.query);

    const total = await Property.countDocuments(query);
    const propertiesDocs = await Property.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('agent', 'name profileImage phone email designation');

    const properties = propertiesDocs.map(normalizeProperty);

    res.json(formatPaginatedResponse(properties, total, page, limit));
  } catch (error) {
    next(error);
  }
};

// @desc Get single property by slug
// @route GET /api/properties/:slug
const getPropertyBySlug = async (req, res, next) => {
  try {
    let propertyDoc = await Property.findOne({ 
      $or: [{ slug: req.params.slug }, { property_code: req.params.slug }, { _id: req.params.slug }] 
    }).populate('agent', 'name profileImage phone email designation bio experience');

    if (!propertyDoc) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    propertyDoc.views = (propertyDoc.views || 0) + 1;
    await propertyDoc.save();

    const normalized = normalizeProperty(propertyDoc);
    res.json({ success: true, data: normalized });
  } catch (error) {
    next(error);
  }
};

// @desc Get featured properties
// @route GET /api/properties/featured
const getFeaturedProperties = async (req, res, next) => {
  try {
    const docs = await Property.find({ is_deleted: { $ne: true } })
      .limit(6)
      .sort({ createdAt: -1 })
      .populate('agent', 'name phone email');

    const properties = docs.map(normalizeProperty);
    res.json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc Get recent properties
// @route GET /api/properties/recent
const getRecentProperties = async (req, res, next) => {
  try {
    const docs = await Property.find({ is_deleted: { $ne: true } })
      .limit(8)
      .sort({ createdAt: -1 })
      .populate('agent', 'name phone email');

    const properties = docs.map(normalizeProperty);
    res.json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc Get sold properties
// @route GET /api/properties/sold
const getSoldProperties = async (req, res, next) => {
  try {
    const docs = await Property.find({ $or: [{ isSold: true }, { availability_status: 'SOLD' }, { property_status: 'SOLD' }] })
      .limit(6)
      .sort({ updatedAt: -1 })
      .populate('agent', 'name phone email');

    const properties = docs.map(normalizeProperty);
    res.json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc Create property (Admin)
// @route POST /api/properties
const createProperty = async (req, res, next) => {
  try {
    const propertyData = req.body;
    if (!propertyData.title && !propertyData.property_title) {
      return res.status(400).json({ success: false, message: 'Please provide property title' });
    }

    const title = propertyData.title || propertyData.property_title;
    let slug = slugify(title);
    const existing = await Property.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const property = await Property.create({ ...propertyData, title, slug });
    res.status(201).json({ success: true, data: normalizeProperty(property) });
  } catch (error) {
    next(error);
  }
};

// @desc Update property (Admin)
// @route PUT /api/properties/:id
const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (req.body.title && req.body.title !== property.title) {
      req.body.slug = slugify(req.body.title);
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: normalizeProperty(property) });
  } catch (error) {
    next(error);
  }
};

// @desc Delete property (Admin)
// @route DELETE /api/properties/:id
const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    await property.deleteOne();
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProperties,
  getPropertyBySlug,
  getFeaturedProperties,
  getRecentProperties,
  getSoldProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};
