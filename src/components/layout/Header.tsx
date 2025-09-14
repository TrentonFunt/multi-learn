import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to courses page with search query
      window.location.href = `/courses?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-bg-primary shadow-card border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-4 -ml-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-exo font-semibold text-xl">M</span>
            </div>
            <span className="text-2xl font-exo font-semibold text-text-primary">MultiLearn</span>
          </Link>


          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors px-3 py-2 rounded-md ${
                location.pathname === '/' 
                  ? 'text-primary bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`font-medium transition-colors px-3 py-2 rounded-md ${
                location.pathname === '/courses' 
                  ? 'text-primary bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              Courses
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium transition-colors px-3 py-2 rounded-md ${
                location.pathname === '/blog' 
                  ? 'text-primary bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors px-3 py-2 rounded-md ${
                location.pathname === '/contact' 
                  ? 'text-primary bg-blue-100 dark:bg-blue-900/20' 
                  : 'text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20'
              }`}
            >
              Contact
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                <span>Page</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-bg-primary rounded-card shadow-card border border-border-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    to="/faqs"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary hover:text-primary transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/error"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary hover:text-primary transition-colors"
                  >
                    Error Page
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/addons" className="text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
              MultiLearn Add-On
            </Link>
            <Link to="/premium" className="text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
              Premium Theme
            </Link>
          </nav>

                  {/* User Actions - Desktop */}
                  <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                      Login
                    </Link>
                    <span className="text-text-secondary">/</span>
                    <Link to="/register" className="text-text-primary hover:text-primary hover:bg-blue-100 dark:hover:bg-blue-900/20 font-medium transition-colors px-3 py-2 rounded-md">
                      Register
                    </Link>
                    {/* Search Form */}
                    <div className="relative">
                      <form onSubmit={handleSearch} className="flex items-center">
                        <input
                          type="text"
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-56 px-4 py-2 pr-10 text-sm border border-border-primary rounded-lg bg-bg-primary text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                          type="submit"
                          className="absolute right-2 p-1 rounded-md hover:bg-bg-secondary transition-colors"
                        >
                          <Search className="w-4 h-4 text-text-secondary" />
                        </button>
                      </form>
                    </div>
                    <ThemeToggle />
                  </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-text-primary hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                  <div className="md:hidden border-t border-border-primary py-4">
                    <nav className="flex flex-col space-y-4">
                      <Link
                        to="/"
                        className={`font-medium transition-colors ${
                          location.pathname === '/'
                            ? 'text-primary'
                            : 'text-text-primary hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/courses"
                        className={`font-medium transition-colors ${
                          location.pathname === '/courses'
                            ? 'text-primary'
                            : 'text-text-primary hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Courses
                      </Link>
                      <Link
                        to="/blog"
                        className={`font-medium transition-colors ${
                          location.pathname === '/blog'
                            ? 'text-primary'
                            : 'text-text-primary hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Blog
                      </Link>
                      <Link
                        to="/contact"
                        className={`font-medium transition-colors ${
                          location.pathname === '/contact'
                            ? 'text-primary'
                            : 'text-text-primary hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>
                      <Link
                        to="/addons"
                        className="text-text-primary hover:text-primary font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        MultiLearn Add-On
                      </Link>
                      <Link
                        to="/premium"
                        className="text-text-primary hover:text-primary font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Premium Theme
                      </Link>
                      <div className="border-t border-border-primary pt-4 mt-4">
                        <Link
                          to="/login"
                          className="text-text-primary hover:text-primary font-medium block mb-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="text-text-primary hover:text-primary font-medium block mb-4"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Register
                        </Link>
                        {/* Mobile Search */}
                        <div className="mb-4 relative">
                          <form onSubmit={handleSearch} className="flex items-center">
                            <input
                              type="text"
                              placeholder="Search courses..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="flex-1 px-4 py-2 pr-10 text-sm border border-border-primary rounded-lg bg-bg-primary text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button
                              type="submit"
                              className="absolute right-2 p-1 rounded-md hover:bg-bg-secondary transition-colors"
                            >
                              <Search className="w-4 h-4 text-text-secondary" />
                            </button>
                          </form>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">Theme:</span>
                          <ThemeToggle />
                        </div>
                      </div>
                    </nav>
                  </div>
                )}
      </div>
    </header>
  );
};

export default Header;
