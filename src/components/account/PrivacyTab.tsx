import React from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';

interface PrivacySettings {
  profileVisibility: string;
  showEmail: boolean;
  showCourses: boolean;
  showProgress: boolean;
}

interface PrivacyTabProps {
  privacy: PrivacySettings;
  onVisibilityChange: (value: string) => void;
  onToggle: (key: 'showEmail' | 'showCourses' | 'showProgress') => void;
}

const PrivacyTab: React.FC<PrivacyTabProps> = ({ privacy, onVisibilityChange, onToggle }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Privacy Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Visibility</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Profile Visibility
              </label>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => onVisibilityChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">Show Email Address</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Allow others to see your email</p>
                </div>
                <ToggleSwitch
                  checked={privacy.showEmail}
                  onChange={() => onToggle('showEmail')}
                  color="blue"
                  ariaLabel="Toggle show email"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">Show Enrolled Courses</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Display your course progress to others</p>
                </div>
                <ToggleSwitch
                  checked={privacy.showCourses}
                  onChange={() => onToggle('showCourses')}
                  color="blue"
                  ariaLabel="Toggle show courses"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;
