import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">PakEstate</h3>
            <p className="mb-4 text-gray-300">
              Pakistan's premier real estate platform, connecting buyers, sellers, 
              and renters across the country with the perfect properties.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/properties/new" className="text-gray-300 hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Popular Searches */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Searches</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?city=Lahore" className="text-gray-300 hover:text-white transition-colors">
                  Properties in Lahore
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Karachi" className="text-gray-300 hover:text-white transition-colors">
                  Properties in Karachi
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Islamabad" className="text-gray-300 hover:text-white transition-colors">
                  Properties in Islamabad
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=House" className="text-gray-300 hover:text-white transition-colors">
                  Houses for Sale/Rent
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=Apartment" className="text-gray-300 hover:text-white transition-colors">
                  Apartments for Sale/Rent
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <span className="text-gray-300">
                 Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-gray-400" />
                <span className="text-gray-300">+92 - 334 - 5549557</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-gray-400" />
                <a href="mailto:info@pakestate.com" className="text-gray-300 hover:text-white transition-colors">
                  info@pakestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} PakEstate. All rights reserved.</p>
          <div className="mt-2">
            <Link to="#" className="text-gray-400 hover:text-white mx-2 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white mx-2 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;