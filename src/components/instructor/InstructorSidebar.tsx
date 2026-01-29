import React from 'react';
import { GraduationCap } from 'lucide-react';
import type { AppUser } from '../../contexts/AuthContext';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface InstructorSidebarProps {
  user: AppUser | null;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({
  user,
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
      {/* Instructor Info */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {user?.displayName || 'Instructor'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {user?.email}
        </p>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
          {user?.instructorVerificationStatus === 'approved' ? 'Verified Instructor' : 'Pending Verification'}
        </span>
      </div>

      {/* Navigation Tabs */}
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default InstructorSidebar;
