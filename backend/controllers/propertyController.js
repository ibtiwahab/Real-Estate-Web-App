const Property = require('../models/Property');

// Create property
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, size, price, purpose, location, bedrooms, bathrooms, features, images } = req.body;

    // If images array is provided, set the first image as the mainImage
    const mainImage = images && images.length > 0 ? images[0] : '';

    const property = new Property({
      title,
      description,
      propertyType,
      size,
      price,
      purpose,
      location,
      bedrooms,
      bathrooms,
      features,
      images,
      mainImage, // Set mainImage here
      createdBy: req.user._id,  // Link the property to the authenticated user
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all properties with pagination and comprehensive filtering
const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      propertyType,
      purpose,
      minSize,
      maxSize,
      sizeUnit,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      city
    } = req.query;

    // Build the query object
    const query = {};

    // Handle search
    if (search) {
      // Use regex search instead of $text for more flexible search
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { 'location.city': { $regex: searchRegex } },
        { 'location.area': { $regex: searchRegex } },
        { 'location.address': { $regex: searchRegex } }
      ];
    }

    // Handle property type filter
    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Handle purpose filter (Sale or Rent)
    if (purpose) {
      query.purpose = purpose;
    }

    // Handle city filter
    if (city) {
      query['location.city'] = city;
    }

    // Handle size range filter
    if (minSize || maxSize) {
      query.size = query.size || {};
      
      if (sizeUnit) {
        query['size.unit'] = sizeUnit;
      }
      
      if (minSize) {
        query['size.value'] = { ...query['size.value'], $gte: Number(minSize) };
      }
      
      if (maxSize) {
        query['size.value'] = { ...query['size.value'], $lte: Number(maxSize) };
      }
    }

    // Handle price range filter
    if (minPrice || maxPrice) {
      query.price = query.price || {};
      
      if (minPrice) {
        query.price = { ...query.price, $gte: Number(minPrice) };
      }
      
      if (maxPrice) {
        query.price = { ...query.price, $lte: Number(maxPrice) };
      }
    }

    // Handle bedroom filter
    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    // Handle bathroom filter
    if (bathrooms) {
      query.bathrooms = { $gte: Number(bathrooms) };
    }

    // Execute query with pagination
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalProperties = await Property.countDocuments(query);
    const numOfPages = Math.ceil(totalProperties / limit);

    res.status(200).json({
      properties,
      numOfPages,
      currentPage: Number(page),
      totalProperties
    });
  } catch (error) {
    console.error('Error in getAllProperties:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single property by ID
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    // Update property fields
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get properties of the authenticated user
const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ createdBy: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
};