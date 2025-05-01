import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : placeholderImage;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Property Image */}
      <Link to={`/properties/${property._id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={mainImage}
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Property Details */}
      <div className="p-4">
        {/* Tags & Price */}
        <div className="flex justify-between items-center mb-2">
          <span className={`
            text-xs font-medium px-2.5 py-0.5 rounded
            ${property.purpose === 'Sale' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'}
          `}>
            For {property.purpose}
          </span>
          <span className="text-lg font-bold text-green-600">
            PKR {property.price.toLocaleString()}
          </span>
        </div>

        {/* Title */}
        <Link to={`/properties/${property._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <span className="text-sm">
            {property.location?.city}, {property.location?.area}
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-between text-gray-600 text-sm mb-3">
          {property.size?.value && property.size?.unit && (
            <div className="flex items-center">
              <FaRulerCombined className="mr-1" />
              <span>{property.size.value} {property.size.unit}</span>
            </div>
          )}

          {property.bedrooms != null && (
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}

          {property.bathrooms != null && (
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* View Button */}
        <Link 
          to={`/properties/${property._id}`}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
