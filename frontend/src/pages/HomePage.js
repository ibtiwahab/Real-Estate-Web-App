import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.png';
import featureImage1 from '../assets/images/feature-1.jpg';
import featureImage2 from '../assets/images/feature-2.jpg';
import { FaSearch, FaHome, FaBuilding, FaMoneyCheckAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section relative h-[600px]">
        <div 
          className="hero-image absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Property in Pakistan
            </h1>
            <p className="text-xl mb-8">
              Browse thousands of properties for sale and rent across Pakistan. 
              Our platform makes it easy to find your perfect home.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/properties" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Browse Properties
              </Link>
              <Link 
                to="/properties/new" 
                className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Properties by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Sale */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-blue-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <FaHome className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Properties for Sale</h3>
              <p className="text-gray-600 mb-5">
                Find a wide range of residential properties available for purchase.
              </p>
              <Link 
                to="/properties?purpose=Sale" 
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                View Properties →
              </Link>
            </div>

            {/* List Your Property */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
              <div className="bg-yellow-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <FaMoneyCheckAlt className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Property</h3>
              <p className="text-gray-600 mb-5">
                Ready to sell or rent? List your property and reach thousands of potential clients.
              </p>
              <Link 
                to="/properties/new" 
                className="text-yellow-600 font-medium hover:text-yellow-800"
              >
                List Now →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={featureImage1} 
                alt="Real Estate Features" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">Extensive Property Listings</h3>
                <p className="text-gray-600">
                  Browse through thousands of verified property listings across Pakistan. 
                  Our platform offers a wide range of options for every budget and requirement.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">Easy Property Management</h3>
                <p className="text-gray-600">
                  List your properties with ease and manage inquiries efficiently. 
                  Our user-friendly interface makes property management simple.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Verified Information</h3>
                <p className="text-gray-600">
                  All property listings are verified to ensure accuracy and reliability. 
                  Browse with confidence knowing you're seeing genuine options.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-16">
            <div className="order-2 md:order-1">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">Direct Communication</h3>
                <p className="text-gray-600">
                  Connect directly with property owners and agents without intermediaries. 
                  Save time and get answers to your questions quickly.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">Advanced Search Features</h3>
                <p className="text-gray-600">
                  Find exactly what you're looking for with our advanced search filters. 
                  Filter by location, price, size, and many other criteria.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Access our platform from anywhere, anytime. Our responsive design ensures 
                  a seamless experience across all devices.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={featureImage2} 
                alt="Real Estate Features" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have found their perfect properties through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/properties" 
              className="bg-transparent hover:bg-blue-800 border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;