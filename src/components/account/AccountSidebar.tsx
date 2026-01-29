import React from 'react';
import { User, Camera, LogOut } from 'lucide-react';
import type { AppUser } from '../../contexts/AuthContext';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LearningStats {
  completedCourses: number;
  totalHours: number;
}

interface AccountSidebarProps {
  user: AppUser | null;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onSignOut: () => void;
  learningStats: LearningStats;
  profileImage: string | null;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  user,
  tabs,
  activeTab,
  onTabChange,
  onSignOut,
  learningStats,
  profileImage
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
      {/* User Info */}
      <div className="text-center mb-6">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-white" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <Camera className="h-3 w-3 text-white" />
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {user?.displayName || 'User'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {user?.email}
        </p>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {learningStats.completedCourses} completed
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {learningStats.totalHours}h learned
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
          Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
        </p>
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

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors mt-6"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">Sign Out</span>
      </button>
    </div>
  );
};

export default AccountSidebar;
