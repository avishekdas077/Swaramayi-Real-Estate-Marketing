const Property = require('../models/Property');
const slugify = require('../utils/slugGenerator');
const { getPagination, formatPaginatedResponse } = require('../utils/pagination');

// @desc Get properties with filtering, sorting, pagination
// @route GET /api/properties
const getProperties = async (req, res, next) => {
  try {
    const {
      city,
      location,
      locality,
      society,
      phase,
      category,
      propertyType,
      listingType,
      priceType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      minSqft,
      maxSqft,
      furnishing,
      parking,
      facing,
      developer,
      constructionStatus,
      possessionStatus,
      reraApproved,
      featured,
      verified,
      premium,
      amenities,
      search,
      sort,
    } = req.query;

    const query = { published: true };

    if (city) query.city = new RegExp(city, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (locality) query.locality = new RegExp(locality, 'i');
    if (society) query.society = new RegExp(society, 'i');
    if (phase) query.phase = new RegExp(phase, 'i');

    if (category) query.category = category;
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (priceType) query.priceType = priceType;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (bathrooms) query.bathrooms = Number(bathrooms);

    if (minSqft || maxSqft) {
      query.areaSqft = {};
      if (minSqft) query.areaSqft.$gte = Number(minSqft);
      if (maxSqft) query.areaSqft.$lte = Number(maxSqft);
    }

    if (furnishing) query.furnishing = furnishing;
    if (parking) query.parking = parking;
    if (facing) query.facing = facing;
    if (developer) query.developer = new RegExp(developer, 'i');
    if (constructionStatus) query.constructionStatus = constructionStatus;
    if (possessionStatus) query.possessionStatus = new RegExp(possessionStatus, 'i');

    if (reraApproved === 'true') query.reraApproved = true;
    if (featured === 'true') query.featured = true;
    if (verified === 'true') query.verified = true;
    if (premium === 'true') query.premium = true;
    if (req.query.isSold === 'true') query.isSold = true;
    if (req.query.isSold === 'false') query.isSold = false;

    if (amenities) {
      const amenList = Array.isArray(amenities) ? amenities : amenities.split(',');
      query.amenities = { $all: amenList };
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { society: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'most_viewed') sortOptions = { views: -1 };
    if (sort === 'featured') sortOptions = { featured: -1, createdAt: -1 };

    const { page, limit, skip } = getPagination(req.query);

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate('agent', 'name profileImage phone email designation');

    res.json(formatPaginatedResponse(properties, total, page, limit));
  } catch (error) {
    next(error);
  }
};

// @desc Get single property by slug
// @route GET /api/properties/:slug
const getPropertyBySlug = async (req, res, next) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug }).populate(
      'agent',
      'name profileImage phone email designation bio experience'
    );
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Increment views counter asynchronously
    property.views += 1;
    await property.save();

    res.json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc Get featured properties
// @route GET /api/properties/featured
const getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ featured: true, published: true })
      .limit(6)
      .sort({ createdAt: -1 })
      .populate('agent', 'name phone email');
    res.json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc Get recent properties
// @route GET /api/properties/recent
const getRecentProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ published: true })
      .limit(8)
      .sort({ createdAt: -1 })
      .populate('agent', 'name phone email');
    res.json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
};

// @desc Get sold properties
// @route GET /api/properties/sold
const getSoldProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ isSold: true, published: true })
      .limit(6)
      .sort({ updatedAt: -1 })
      .populate('agent', 'name phone email');
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
    if (!propertyData.title || !propertyData.price || !propertyData.location || !propertyData.areaSqft) {
      return res.status(400).json({ success: false, message: 'Please provide title, price, location, and areaSqft' });
    }

    let slug = slugify(propertyData.title);
    const existing = await Property.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const property = await Property.create({ ...propertyData, slug });
    res.status(201).json({ success: true, data: property });
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
    res.json({ success: true, data: property });
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
