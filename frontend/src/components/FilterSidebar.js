import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    propertyType: '',
    purpose: '',
    minSize: '',
    maxSize: '',
    sizeUnit: 'Marla',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    city: ''
  });

  // Set local filter state when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Handle individual filter changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply all filters
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  // Reset all filters
  const handleResetFilters = () => {
    const resetFilters = {
      propertyType: '',
      purpose: '',
      minSize: '',
      maxSize: '',
      sizeUnit: 'Marla',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      city: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FaFilter className="mr-2" />
          Filters
        </h2>
      </div>

      {/* Filter Form */}
      <div className="space-y-4">
        {/* Purpose */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Purpose
          </label>
          <select
            name="purpose"
            value={localFilters.purpose}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Property Type
          </label>
          <select
            name="propertyType"
            value={localFilters.propertyType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Price Range (PKR)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Size
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="number"
              name="minSize"
              value={localFilters.minSize}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxSize"
              value={localFilters.maxSize}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            name="sizeUnit"
            value={localFilters.sizeUnit}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Marla">Marla</option>
            <option value="Kanal">Kanal</option>
            <option value="Square Feet">Square Feet</option>
            <option value="Square Meter">Square Meter</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Bedrooms
          </label>
          <select
            name="bedrooms"
            value={localFilters.bedrooms}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Bathrooms
          </label>
          <select
            name="bathrooms"
            value={localFilters.bathrooms}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            City
          </label>
          <select
            name="city"
            value={localFilters.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Multan">Multan</option>
            <option value="Faisalabad">Faisalabad</option>
          </select>
        </div>

        {/* Filter Action Buttons */}
        <div className="pt-2 space-y-3">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Apply Filters
          </button>
          <button
            onClick={handleResetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;