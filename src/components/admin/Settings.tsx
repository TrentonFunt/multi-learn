import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';

interface Settings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface SettingsProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const { addToast } = useToast();

  const handleSettingsChange = (key: string, value: string | boolean | number | string[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    addToast({
      type: 'success',
      title: 'Settings Updated',
      message: 'Your settings have been saved successfully.'
    });
  };

  const resetSettings = () => {
    const defaultSettings = {
      siteName: 'MultiLearn',
      siteDescription: 'A modern e-learning platform',
      allowRegistration: true,
      requireEmailVerification: true,
      maintenanceMode: false,
      maxFileSize: 100,
      allowedFileTypes: ['jpg', 'png', 'pdf', 'mp4'],
      emailNotifications: true,
      smsNotifications: false
    };
    setSettings(defaultSettings);
    addToast({
      type: 'success',
      title: 'Settings Reset',
      message: 'All settings have been reset to default values.'
    });
  };

  const clearAllData = () => {
    addToast({
      type: 'warning',
      title: 'Data Clear',
      message: 'This feature would clear all data in a real application.'
    });
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">General Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingsChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Site Description</label>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </motion.div>
      
      {/* User Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">User Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-gray-100 font-medium">Allow User Registration</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Allow new users to register on the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => handleSettingsChange('allowRegistration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-gray-100 font-medium">Require Email Verification</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Users must verify their email before accessing the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleSettingsChange('requireEmailVerification', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* System Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">System Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-gray-100 font-medium">Maintenance Mode</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Put the site in maintenance mode (only admins can access)</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingsChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Max File Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingsChange('maxFileSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Allowed File Types</label>
              <input
                type="text"
                value={settings.allowedFileTypes.join(', ')}
                onChange={(e) => handleSettingsChange('allowedFileTypes', e.target.value.split(', '))}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="jpg, png, pdf, mp4"
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-gray-100 font-medium">Email Notifications</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Send email notifications for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingsChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-gray-100 font-medium">SMS Notifications</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Send SMS notifications for urgent events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingsChange('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </motion.div>
      
      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-red-50 border border-red-200 rounded-card shadow-card p-6"
      >
        <h3 className="text-xl font-semibold text-red-800 mb-6">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-red-800 font-medium">Reset All Settings</h4>
              <p className="text-red-600 text-sm">Reset all settings to their default values</p>
            </div>
            <Button variant="outline" size="small" className="border-red-300 text-red-600 hover:bg-red-50" onClick={resetSettings}>
              Reset Settings
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-red-800 font-medium">Clear All Data</h4>
              <p className="text-red-600 text-sm">Permanently delete all user data and courses</p>
            </div>
            <Button variant="outline" size="small" className="border-red-300 text-red-600 hover:bg-red-50" onClick={clearAllData}>
              Clear Data
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
