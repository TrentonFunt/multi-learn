import React from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
  courseUpdates: boolean;
  announcements: boolean;
}

interface NotificationsTabProps {
  notifications: NotificationSettings;
  onToggle: (key: keyof NotificationSettings) => void;
}

const notificationDescriptions: Record<keyof NotificationSettings, string> = {
  email: 'Receive notifications via email',
  push: 'Receive push notifications',
  marketing: 'Receive marketing emails and promotions',
  courseUpdates: 'Get notified about course updates',
  announcements: 'Receive platform announcements'
};

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications, onToggle }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email Notifications</h3>
          <div className="space-y-4">
            {(Object.entries(notifications) as [keyof NotificationSettings, boolean][]).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {notificationDescriptions[key]}
                  </p>
                </div>
                <ToggleSwitch
                  checked={value}
                  onChange={() => onToggle(key)}
                  color="blue"
                  ariaLabel={`Toggle ${key} notifications`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
