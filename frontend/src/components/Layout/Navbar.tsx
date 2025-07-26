import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Globe,
  Target, 
  Home,
  ChevronDown
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100' 
          : 'bg-white/80 backdrop-blur-sm border-b border-white/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Enhanced Logo and Brand */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
              <motion.img
                  src="/logo.jpeg"
                  alt="VisBaltic Logo"
                  className="h-10 w-10 object-cover"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
              />
              <div className="flex flex-col">

    <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 bg-clip-text text-transparent">
      VisBaltic
    </span>
                
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <NavLink to="/" icon={Home} isActive={isActivePage('/')}>
                Home
              </NavLink>
              <NavLink to="/map" icon={Globe} isActive={isActivePage('/map')}>
                Climate Map
              </NavLink>
              <NavLink to="/call-to-action" icon={Target} isActive={isActivePage('/call-to-action')}>
                Take Action
              </NavLink>
            </motion.div>

            {/* Enhanced Authentication Menu */}
            <div className="flex items-center ml-6 pl-6 border-l border-blue-100">
              {isAuthenticated ? (
                <div className="relative user-menu-container">
                  <motion.button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 px-4 py-2 rounded-2xl transition-all duration-300 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZbwM7nByiekCs8REVQg8jjYIs0Cbdh7HlgkMNgtalXKWv4cujKU3wZTRjxnLQXZvow4&usqp=CAU"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-blue-900 font-semibold">
                      {user?.first_name || user?.username}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-blue-600 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 py-2"
                      >
                        <Link 
                          to="/profile" 
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <User className="h-4 w-4" />
                          <span className="font-medium">Profile</span>
                        </Link>
                        <hr className="border-blue-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link 
                    to="/login" 
                    className="text-blue-700 hover:text-blue-900 px-4 py-2 font-semibold transition-colors duration-300 hover:bg-blue-50 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Join Community
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className="text-blue-700 hover:text-blue-900 focus:outline-none focus:text-blue-900 p-2 rounded-xl hover:bg-blue-50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md rounded-b-3xl border-t border-blue-100 shadow-xl">
                <MobileNavLink to="/" icon={Home} onClick={closeMenu} isActive={isActivePage('/')}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/map" icon={Globe} onClick={closeMenu} isActive={isActivePage('/map')}>
                  Climate Map
                </MobileNavLink>
                <MobileNavLink to="/call-to-action" icon={Target} onClick={closeMenu} isActive={isActivePage('/call-to-action')}>
                  Take Action
                </MobileNavLink>

                {/* Mobile Authentication Menu */}
                <div className="pt-4 mt-4 border-t border-blue-100">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <MobileNavLink to="/profile" icon={User} onClick={closeMenu}>
                        {user?.first_name || user?.username}
                      </MobileNavLink>
                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link 
                        to="/login" 
                        onClick={closeMenu}
                        className="block text-center text-blue-700 hover:text-blue-900 px-4 py-3 font-semibold transition-colors duration-300 hover:bg-blue-50 rounded-xl"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        onClick={closeMenu}
                        className="block text-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg transform hover:scale-105"
                      >
                        Join Community
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Enhanced NavLink Component for Desktop
interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children, isActive }) => (
  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
          : 'text-blue-700 hover:text-blue-900 hover:bg-blue-50'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  </motion.div>
);

// Enhanced MobileNavLink Component
interface MobileNavLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon: Icon, children, onClick, isActive = false }) => (
  <motion.div
    whileHover={{ x: 4 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  </motion.div>
);

export default Navbar;
