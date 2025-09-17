import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '../../hooks/useDebounce';

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

  // Mock suggestions based on query
  const getMockSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery.trim()) return [];
    
    const mockData: SearchSuggestion[] = [
      { id: '1', title: 'React Development', type: 'course', subtitle: 'Web Development', icon: <BookOpen className="w-4 h-4" /> },
      { id: '2', title: 'JavaScript Fundamentals', type: 'course', subtitle: 'Programming', icon: <BookOpen className="w-4 h-4" /> },
      { id: '3', title: 'John Doe', type: 'instructor', subtitle: 'Senior Developer', icon: <Search className="w-4 h-4" /> },
      { id: '4', title: 'Web Development', type: 'category', subtitle: '15 courses', icon: <Search className="w-4 h-4" /> },
      { id: '5', title: 'Python Programming', type: 'course', subtitle: 'Programming', icon: <BookOpen className="w-4 h-4" /> },
      { id: '6', title: 'UI/UX Design', type: 'course', subtitle: 'Design', icon: <BookOpen className="w-4 h-4" /> },
      { id: '7', title: 'Sarah Johnson', type: 'instructor', subtitle: 'Design Expert', icon: <Search className="w-4 h-4" /> },
      { id: '8', title: 'Data Science', type: 'category', subtitle: '8 courses', icon: <Search className="w-4 h-4" /> },
    ];

    return mockData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  };

  const filteredSuggestions = suggestions.length > 0 ? suggestions : getMockSuggestions(debouncedQuery);

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
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(query.length > 0)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
            </div>
          </div>
          {['React Development', 'JavaScript', 'Python Programming'].map((search, index) => (
            <div
              key={index}
              onClick={() => {
                setQuery(search);
                onSearch(search);
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
