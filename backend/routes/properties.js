const express = require('express');
const router = express.Router();

const {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getUserProperties,
} = require('../controllers/propertyController');

const authenticateUser = require('../middleware/authentication');

// ===================
// Public Routes
// ===================

// Get all properties (with filters, search, pagination if supported)
router.get('/', getAllProperties);

// Get a specific property by ID
router.get('/:id', getProperty);

// ===================
// Protected Routes (require login)
// ===================

// Get all properties created by the logged-in user
// ⚠️ Place this route before '/:id' to avoid conflict
router.get('/user/properties', authenticateUser, getUserProperties);

// Create a new property
router.post('/', authenticateUser, createProperty);

// Update a property by ID
router.patch('/:id', authenticateUser, updateProperty);

// Delete a property by ID
router.delete('/:id', authenticateUser, deleteProperty);

module.exports = router;
