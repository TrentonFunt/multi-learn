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
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
      {filters.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => onFilterChange(section.title, option.label, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                    option.checked 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {option.checked && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-gray-700 flex-1">{option.label}</span>
                <span className="text-gray-500 text-sm">({option.count})</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
