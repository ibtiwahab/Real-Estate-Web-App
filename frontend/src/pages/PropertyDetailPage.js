import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt, 
  FaTag, 
  FaCalendarAlt,
  FaHome,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/properties/${id}`);
        setProperty(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load property details. Please try again later.');
        console.error('Error fetching property details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    // Here you would implement sending the contact form to the backend
    alert('Your message has been sent! The property owner will contact you soon.');
    // Reset form
    setContactFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <Link to="/properties" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const formattedPrice = property.price?.toLocaleString() || 'Price not available';
  const formattedDate = property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Date not available';
  const placeholderImage = 'https://via.placeholder.com/800x500?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-blue-600">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Property Details</span>
        </div>

        {/* Property Main Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Image Gallery */}
          <div className="relative h-96">
            {property.images && property.images.length > 0 ? (
              <>
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={`Property view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={handleNextImage} 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
                    >
                      <FaChevronRight />
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black bg-opacity-60 px-4 py-2 rounded-full">
                        <div className="flex space-x-2">
                          {property.images.map((_, index) => (
                            <button 
                              key={index} 
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <img 
                src={placeholderImage} 
                alt="No property image available" 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Property Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className={`
                    text-sm font-medium px-3 py-1 rounded-full
                    ${property.purpose === 'Sale' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'}
                  `}>
                    For {property.purpose}
                  </span>
                  <span className="ml-3 text-sm text-gray-600 flex items-center">
                    <FaCalendarAlt className="mr-1" /> Listed on {formattedDate}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-3xl font-bold text-green-600">PKR {formattedPrice}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{property.location?.address}, {property.location?.area}, {property.location?.city}</span>
            </div>

            <div className="flex flex-wrap gap-6 py-4">
              {property.propertyType && (
                <div className="flex items-center">
                  <FaHome className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Property Type</p>
                    <p className="font-semibold">{property.propertyType}</p>
                  </div>
                </div>
              )}
              
              {property.size?.value != null && property.size?.unit && (
                <div className="flex items-center">
                  <FaRulerCombined className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Property Size</p>
                    <p className="font-semibold">{property.size.value} {property.size.unit}</p>
                  </div>
                </div>
              )}
              
              {property.bedrooms != null && (
                <div className="flex items-center">
                  <FaBed className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
              )}
              
              {property.bathrooms != null && (
                <div className="flex items-center">
                  <FaBath className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features Section */}
          {property.features && property.features.length > 0 && (
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <FaList className="text-blue-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold mb-4">Contact Seller</h2>
              <form onSubmit={handleContactFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleContactFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="I am interested in this property and would like more information..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-fit">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold mb-4">Quick Contact</h2>
              <div className="space-y-4">
                <a href="tel:+923001234567" className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <div className="bg-green-500 p-3 rounded-full text-white mr-3">
                    <FaPhone />
                  </div>
                  <span>Call Now</span>
                </a>

                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <div className="bg-green-600 p-3 rounded-full text-white mr-3">
                    <FaWhatsapp />
                  </div>
                  <span>WhatsApp</span>
                </a>

                <a href="ibtihajwahab8@gmail.com" className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <div className="bg-blue-500 p-3 rounded-full text-white mr-3">
                    <FaEnvelope />
                  </div>
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Property ID */}
            <div className="p-6">
              <div className="flex items-center">
                <FaTag className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Property ID</p>
                  <p className="font-semibold">{property._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;