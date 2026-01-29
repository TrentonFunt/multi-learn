import React from 'react';
import { motion } from 'framer-motion';

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ActivityTabProps {
  activities: Activity[];
}

const ActivityTab: React.FC<ActivityTabProps> = ({ activities }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center space-x-4"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-gray-100 font-medium">{activity.title}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTab;
