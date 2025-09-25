import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, BookOpen, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '../../hooks/useDebounce';
import { courses } from '../../data/courseData';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'course' | 'instructor' | 'category';
  subtitle?: string;
  icon?: React.ReactNode;
}

interface SearchAutocompleteProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
  suggestions?: SearchSuggestion[];
  isLoading?: boolean;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder = "Search courses, instructors, categories...",
  onSearch,
  onSuggestionSelect,
  className = "",
  suggestions = [],
  // isLoading = false
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  
  // Generate unique ID for this component instance
  const searchId = `search-autocomplete-${Date.now()}`;

  // Generate suggestions from real course data
  const getRealSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestions: SearchSuggestion[] = [];
    
    // Get unique categories and their counts
    const categoryCounts = courses.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Get unique instructors and their counts
    const instructorCounts = courses.reduce((acc, course) => {
      const instructorName = course.instructor.name;
      acc[instructorName] = (acc[instructorName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Filter courses
    const matchingCourses = courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.instructor.name.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    ).slice(0, 4);
    
    // Filter categories
    const matchingCategories = Object.entries(categoryCounts)
      .filter(([category]) => category.toLowerCase().includes(query))
      .slice(0, 2);
    
    // Filter instructors
    const matchingInstructors = Object.entries(instructorCounts)
      .filter(([instructor]) => instructor.toLowerCase().includes(query))
      .slice(0, 2);
    
    // Add course suggestions
    matchingCourses.forEach(course => {
      suggestions.push({
        id: `course-${course.id}`,
        title: course.title,
        type: 'course',
        subtitle: course.category,
        icon: <BookOpen className="w-4 h-4" />
      });
    });
    
    // Add category suggestions
    matchingCategories.forEach(([category, count]) => {
      suggestions.push({
        id: `category-${category}`,
        title: category,
        type: 'category',
        subtitle: `${count} course${count !== 1 ? 's' : ''}`,
        icon: <Tag className="w-4 h-4" />
      });
    });
    
    // Add instructor suggestions
    matchingInstructors.forEach(([instructor, count]) => {
      suggestions.push({
        id: `instructor-${instructor}`,
        title: instructor,
        type: 'instructor',
        subtitle: `${count} course${count !== 1 ? 's' : ''}`,
        icon: <User className="w-4 h-4" />
      });
    });
    
    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  const filteredSuggestions = suggestions.length > 0 ? suggestions : getRealSuggestions(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSuggestionSelect?.(suggestion);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'instructor':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'category':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          id={searchId}
          name="search"
          type="search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(query.length > 0)}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search courses, instructors, and categories"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-400 focus:scale-[1.02]"
        />
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto backdrop-blur-sm"
            role="listbox"
            aria-label="Search suggestions"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, ease: "easeOut" }}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  index === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm'
                }`}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
              >
                <div className="flex-shrink-0 text-gray-400">
                  {suggestion.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {suggestion.title}
                    </p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(suggestion.type)}`}>
                      {suggestion.type}
                    </span>
                  </div>
                  {suggestion.subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Searches */}
      {isOpen && query.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl backdrop-blur-sm"
          role="listbox"
          aria-label="Recent searches"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
            </div>
          </div>
          {courses.slice(0, 3).map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, ease: "easeOut" }}
              onClick={() => {
                setQuery(course.title);
                onSearch(course.title);
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.01] hover:shadow-sm"
              role="option"
              tabIndex={-1}
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{course.title}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
