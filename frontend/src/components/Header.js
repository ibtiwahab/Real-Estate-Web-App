import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            PakEstate
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/properties" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              Properties
            </NavLink>
            <NavLink 
              to="/Chat-Page" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              AI Chat Page
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/properties/new" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-blue-600 transition-colors"
                }
              >
                List Property
              </NavLink>
            )}
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
               
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-blue-600 font-medium" 
                      : "text-gray-600 hover:text-blue-600 transition-colors"
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-600 font-medium py-2" 
                    : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                }
                onClick={toggleMenu}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/properties" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-600 font-medium py-2" 
                    : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                }
                onClick={toggleMenu}
              >
                Properties
              </NavLink>
              <NavLink 
                to="/Chat-Page" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-600 font-medium py-2" 
                    : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                }
                onClick={toggleMenu}
              >
                AI Chat Page
              </NavLink>
              
              {/* Only show "List Property" if authenticated */}
              {isAuthenticated && (
                <NavLink 
                  to="/properties/new" 
                  className={({ isActive }) => 
                    isActive 
                      ? "text-blue-600 font-medium py-2" 
                      : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                  }
                  onClick={toggleMenu}
                >
                  List Property
                </NavLink>
              )}
              
              {/* User Actions - Mobile */}
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      isActive 
                        ? "text-blue-600 font-medium py-2" 
                        : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                    }
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </NavLink>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      isActive 
                        ? "text-blue-600 font-medium py-2" 
                        : "text-gray-600 hover:text-blue-600 py-2 transition-colors"
                    }
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors inline-block"
                    onClick={toggleMenu}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;