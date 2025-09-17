import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterOptions {
  category: string[];
  level: string[];
  price: string[];
  duration: string[];
  rating: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

interface CourseFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string) => void;
  className?: string;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  onFiltersChange,
  onSortChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    level: [],
    price: [],
    duration: [],
    rating: []
  });

  const categories = [
    'Web Development', 'Mobile Development', 'Data Science', 
    'Machine Learning', 'UI/UX Design', 'Digital Marketing'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  
  const priceRanges = [
    'Free', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'
  ];

  const durations = [
    'Under 5 hours', '5-10 hours', '10-20 hours', '20-40 hours', 'Over 40 hours'
  ];

  const ratings = ['4.5+ Stars', '4.0+ Stars', '3.5+ Stars'];

  const sortOptions: SortOption[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'title', label: 'Title A-Z' }
  ];

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters };
    const currentValues = newFilters[type];
    
    if (currentValues.includes(value)) {
      newFilters[type] = currentValues.filter(v => v !== value);
    } else {
      newFilters[type] = [...currentValues, value];
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      category: [],
      level: [],
      price: [],
      duration: [],
      rating: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, arr) => count + arr.length, 0);
  };

  const FilterSection: React.FC<{ title: string; options: string[]; type: keyof FilterOptions }> = ({
    title,
    options,
    type
  }) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[type].includes(option)}
              onChange={() => handleFilterChange(type, option)}
              className="w-4 h-4 text-primary bg-bg-primary border-border-primary rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`bg-bg-primary border border-border-primary rounded-lg ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-text-primary hover:bg-bg-secondary transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-border-primary lg:border-t-0">
              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">Sort By</h4>
                <select
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full p-3 border border-border-primary rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Sections */}
              <div className="space-y-6">
                <FilterSection
                  title="Category"
                  options={categories}
                  type="category"
                />

                <FilterSection
                  title="Level"
                  options={levels}
                  type="level"
                />

                <FilterSection
                  title="Price Range"
                  options={priceRanges}
                  type="price"
                />

                <FilterSection
                  title="Duration"
                  options={durations}
                  type="duration"
                />

                <FilterSection
                  title="Rating"
                  options={ratings}
                  type="rating"
                />
              </div>

              {/* Clear Filters Button */}
              {getActiveFiltersCount() > 0 && (
                <div className="mt-6 pt-6 border-t border-border-primary">
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseFilters;
