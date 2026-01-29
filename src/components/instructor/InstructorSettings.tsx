import React from 'react';

const InstructorSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Instructor Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Bio</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Tell students about yourself and your expertise..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Specialties</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., React, JavaScript, Web Development"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Experience</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Describe your professional experience..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSettings;
