// models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide property title'],
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide property description'],
    maxlength: 1000
  },
  propertyType: {
    type: String,
    enum: ['House', 'Apartment'],
    required: [true, 'Please specify property type']
  },
  size: {
    value: {
      type: Number,
      required: [true, 'Please provide property size']
    },
    unit: {
      type: String,
      enum: ['Marla', 'Kanal'],
      required: [true, 'Please provide size unit']
    }
  },
  price: {
    type: Number,
    required: [true, 'Please provide property price']
  },
  purpose: {
    type: String,
    enum: ['Sale', 'Rent'],
    required: [true, 'Please specify if property is for sale or rent']
  },
  location: {
    city: {
      type: String,
      required: [true, 'Please provide city']
    },
    area: {
      type: String,
      required: [true, 'Please provide area']
    },
    address: {
      type: String,
      required: [true, 'Please provide complete address']
    }
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please provide number of bedrooms']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please provide number of bathrooms']
  },
  features: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    required: [true, 'Please upload at least one image'],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 6;
      },
      message: 'Upload minimum 1 and maximum 6 images'
    }
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', PropertySchema);