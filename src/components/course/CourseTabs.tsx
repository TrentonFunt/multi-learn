import React from 'react';

interface Tab {
  id: string;
  label: string;
  active: boolean;
}

interface CourseTabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ tabs, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
      <nav className="flex space-x-4 sm:space-x-8 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              tab.active
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CourseTabs;
