import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../contexts/ToastContext';
import SearchAutocomplete from '../ui/SearchAutocomplete';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  const { addToast } = useToast();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Redirect to courses page with search query
      window.location.href = `/courses?search=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleSuggestionSelect = (suggestion: { title: string }) => {
    handleSearch(suggestion.title);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      addToast({
        type: 'info',
        title: 'Signed Out',
        message: 'You have been successfully signed out.'
      });
    } catch {
      // Error signing out
      addToast({
        type: 'error',
        title: 'Sign Out Failed',
        message: 'There was an error signing out. Please try again.'
      });
    }
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('.user-menu-container')) {
          setIsUserMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-card border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-6 -ml-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-exo font-semibold text-xl">M</span>
            </div>
            <span className="text-2xl font-exo font-semibold text-gray-900 dark:text-gray-100">MultiLearn</span>
          </Link>


          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`group relative font-medium transition-all duration-300 px-4 py-2 rounded-md overflow-hidden ${
                location.pathname === '/' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="relative z-10">Home</span>
              {location.pathname !== '/' && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
            <Link 
              to="/courses" 
              className={`group relative font-medium transition-all duration-300 px-4 py-2 rounded-md overflow-hidden ${
                location.pathname === '/courses' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="relative z-10">Courses</span>
              {location.pathname !== '/courses' && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
            <Link 
              to="/blog" 
              className={`group relative font-medium transition-all duration-300 px-4 py-2 rounded-md overflow-hidden ${
                location.pathname === '/blog' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="relative z-10">Blog</span>
              {location.pathname !== '/blog' && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
            <Link 
              to="/favorites" 
              className={`group relative font-medium transition-all duration-300 px-4 py-2 rounded-md overflow-hidden ${
                location.pathname === '/favorites' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="relative z-10">Favorites</span>
              {location.pathname !== '/favorites' && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
            <Link 
              to="/contact" 
              className={`group relative font-medium transition-all duration-300 px-4 py-2 rounded-md overflow-hidden ${
                location.pathname === '/contact' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              <span className="relative z-10">Contact</span>
              {location.pathname !== '/contact' && (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              )}
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                <span>Page</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-card shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    to="/faqs"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/error"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Error Page
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/addons" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-4 py-2 rounded-md">
              <span className="hidden lg:inline">MultiLearn Add-On</span>
              <span className="lg:hidden">Add-On</span>
            </Link>
          </nav>

                  {/* User Actions - Desktop */}
                  <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                      <div className="relative user-menu-container">
                        <button
                          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                          className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md"
                        >
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="hidden lg:inline">{user.displayName || 'User'}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                          {isUserMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-card shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                            >
                              <div className="py-2">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
                                  {isAdmin && (
                                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                                      Admin
                                    </span>
                                  )}
                                </div>
                                <Link
                                  to="/account"
                                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                  onClick={() => setIsUserMenuOpen(false)}
                                >
                                  <Settings className="h-4 w-4" />
                                  <span>Account Settings</span>
                                </Link>
                                <Link
                                  to="/favorites"
                                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                  onClick={() => setIsUserMenuOpen(false)}
                                >
                                  <User className="h-4 w-4" />
                                  <span>My Favorites</span>
                                </Link>
                                {isAdmin && (
                                  <Link
                                    to="/admin"
                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    onClick={() => setIsUserMenuOpen(false)}
                                  >
                                    <Shield className="h-4 w-4" />
                                    <span>Admin Dashboard</span>
                                  </Link>
                                )}
                                <button
                                  onClick={handleSignOut}
                                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                                >
                                  <LogOut className="h-4 w-4" />
                                  <span>Sign Out</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <>
                        <Link to="/login" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                          Login
                        </Link>
                        <span className="text-gray-600 dark:text-gray-400">/</span>
                        <Link to="/register" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                          Register
                        </Link>
                      </>
                    )}
                    {/* Search Form */}
                    <div className="w-52">
                      <SearchAutocomplete
                        placeholder="Search courses..."
                        onSearch={handleSearch}
                        onSuggestionSelect={handleSuggestionSelect}
                        className="w-full"
                      />
                    </div>
                    <ThemeToggle />
                  </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="py-4"
              >
                <nav className="flex flex-col space-y-4">
                  {[
                    { to: '/', label: 'Home' },
                    { to: '/courses', label: 'Courses' },
                    { to: '/blog', label: 'Blog' },
                    { to: '/contact', label: 'Contact' },
                    { to: '/addons', label: 'MultiLearn Add-On' },
                    { to: '/premium', label: 'Premium Theme' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        className={`font-medium transition-colors py-3 px-2 min-h-[44px] flex items-center ${
                          location.pathname === item.to
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-600/10'
                            : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-600/5'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                >
                  {user ? (
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="flex items-center space-x-3 mb-4"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.displayName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                          {isAdmin && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                              Admin
                            </span>
                          )}
                        </div>
                      </motion.div>
                      {[
                        { to: '/account', label: 'Account Settings', icon: Settings },
                        { to: '/favorites', label: 'My Favorites', icon: User },
                        ...(isAdmin ? [{ to: '/admin', label: 'Admin Dashboard', icon: Shield }] : [])
                      ].map((item, index) => (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        >
                          <Link
                            to={item.to}
                            className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-2 py-3 px-2 min-h-[44px] rounded-md hover:bg-blue-600/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium mb-4 py-3 px-2 min-h-[44px] rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      {[
                        { to: '/login', label: 'Login' },
                        { to: '/register', label: 'Register' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        >
                          <Link
                            to={item.to}
                            className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium block mb-2 py-3 px-2 min-h-[44px] rounded-md hover:bg-blue-600/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </>
                  )}
                  {/* Mobile Search */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                    className="mb-4"
                  >
                    <SearchAutocomplete
                      placeholder="Search courses..."
                      onSearch={handleSearch}
                      onSuggestionSelect={handleSuggestionSelect}
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 1.0 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                    <ThemeToggle />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
