import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Globe, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
              <Globe className="h-6 w-6 text-black" />
              <span className="text-xl font-light text-black tracking-wide">Baltic Climate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-black px-3 py-2 text-sm font-light transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="text-gray-600 hover:text-black px-3 py-2 text-sm font-light transition-colors flex items-center space-x-1"
            >
              <MapPin className="h-4 w-4" />
              <span>Climate Map</span>
            </Link>
            <Link 
              to="/call-to-action" 
              className="text-gray-600 hover:text-black px-3 py-2 text-sm font-light transition-colors"
            >
              Take Action
            </Link>

            {/* Authentication Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-black px-3 py-2 text-sm font-light transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{user?.first_name || user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-3 py-2 text-sm font-light transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-black px-3 py-2 text-sm font-light transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-light transition-colors"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-black focus:outline-none focus:text-black"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link 
                to="/" 
                onClick={closeMenu}
                className="text-gray-600 hover:text-black block px-3 py-2 text-base font-light transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/map" 
                onClick={closeMenu}
                className="text-gray-600 hover:text-black block px-3 py-2 text-base font-light transition-colors flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Climate Map</span>
              </Link>
              <Link 
                to="/call-to-action" 
                onClick={closeMenu}
                className="text-gray-600 hover:text-black block px-3 py-2 text-base font-light transition-colors"
              >
                Take Action
              </Link>

              {/* Mobile Authentication Menu */}
              {isAuthenticated ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <Link 
                    to="/profile" 
                    onClick={closeMenu}
                    className="text-gray-600 hover:text-black block px-3 py-2 text-base font-light transition-colors flex items-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.first_name || user?.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800 block px-3 py-2 text-base font-light transition-colors flex items-center space-x-2 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <Link 
                    to="/login" 
                    onClick={closeMenu}
                    className="text-gray-600 hover:text-black block px-3 py-2 text-base font-light transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={closeMenu}
                    className="bg-black hover:bg-gray-800 text-white block px-3 py-2 text-base font-light transition-colors text-center"
                  >
                    Join Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
