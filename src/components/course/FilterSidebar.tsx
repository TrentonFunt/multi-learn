import React from 'react';
import { Check } from 'lucide-react';

interface FilterOption {
  label: string;
  count: number;
  checked: boolean;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterSection[];
  onFilterChange: (sectionTitle: string, optionLabel: string, checked: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const clearAllFilters = () => {
    filters.forEach(section => {
      section.options.forEach(option => {
        if (option.checked) {
          onFilterChange(section.title, option.label, false);
        }
      });
    });
  };

  const hasActiveFilters = filters.some(section => 
    section.options.some(option => option.checked)
  );

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      {filters.map((section, sectionIndex) => (
        <div key={sectionIndex} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">{section.title}</h3>
          <div className="space-y-1">
            {section.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                htmlFor={`filter-${sectionIndex}-${optionIndex}`}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <input
                    id={`filter-${sectionIndex}-${optionIndex}`}
                    name={`filter-${section.title}-${option.label}`}
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => onFilterChange(section.title, option.label, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                    option.checked 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'border-gray-300 dark:border-gray-500 hover:border-gray-400'
                  }`}>
                    {option.checked && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">{option.label}</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">({option.count})</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
