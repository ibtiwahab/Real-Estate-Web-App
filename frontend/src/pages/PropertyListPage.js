import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import { FaSearch, FaFilter } from 'react-icons/fa';

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;
    const search = queryParams.get('search') || '';

    const newFilters = { ...filters };
    Object.keys(filters).forEach(key => {
      const value = queryParams.get(key);
      if (value) {
        newFilters[key] = value;
      }
    });

    setCurrentPage(Number(page));
    setSearchTerm(search);
    setFilters(newFilters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        queryParams.append('page', currentPage);
    
        if (searchTerm) {
          queryParams.append('search', searchTerm);
        }
    
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value);
          }
        });
    
        const response = await axios.get(`/api/v1/properties?${queryParams.toString()}`);
        const fetchedProperties = response.data.properties;
    
        setProperties(Array.isArray(fetchedProperties) ? fetchedProperties : []);
        setTotalPages(response.data.numOfPages || 1);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, filters, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('search', searchTerm);
    queryParams.set('page', '1');
    navigate(`/properties?${queryParams.toString()}`);
  };

  const handleFilterChange = (newFilters) => {
    const queryParams = new URLSearchParams(location.search);
    Object.keys(filters).forEach(key => queryParams.delete(key));
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });
    queryParams.set('page', '1');
    navigate(`/properties?${queryParams.toString()}`);
    setShowMobileFilters(false);
  };

  const handlePageChange = (page) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page.toString());
    navigate(`/properties?${queryParams.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex max-w-3xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location, property title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </form>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center"
          >
            <FaFilter className="mr-2" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Filters Sidebar */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block md:w-1/4 lg:w-1/5 pr-0 md:pr-6`}>
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Property Listings */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
            ) : Array.isArray(properties) && properties.length === 0 ? (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6 text-center">
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListPage;
