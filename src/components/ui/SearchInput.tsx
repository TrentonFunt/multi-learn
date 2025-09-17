import React, { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  className?: string;
  debounceMs?: number;
  showClearButton?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  onClear,
  isLoading = false,
  className = "",
  debounceMs = 300,
  showClearButton = true
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    if (debouncedQuery !== query) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, query]);

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-gray-500 dark:text-gray-500 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-500" />
          )}
        </div>

        {/* Clear Button */}
        {showClearButton && query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-50 dark:bg-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" />
          </button>
        )}
      </div>

      {/* Search Results Indicator */}
      {query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-50">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {isLoading ? 'Searching...' : `Searching for "${query}"`}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
