import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, TrendingUp, Target, Zap } from 'lucide-react';

interface ProgressData {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  averageProgress: number;
  currentStreak: number;
  longestStreak: number;
  certificates: number;
}

interface ProgressVisualizationProps {
  data: ProgressData;
  className?: string;
}

const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({ 
  data, 
  className = "" 
}) => {
  const completionRate = data.totalCourses > 0 ? (data.completedCourses / data.totalCourses) * 100 : 0;
  const progressRate = data.averageProgress;

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Courses',
      value: data.totalCourses,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      progress: null
    },
    {
      icon: Award,
      label: 'Completed',
      value: data.completedCourses,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      progress: completionRate
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: `${data.totalHours}h`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      progress: null
    },
    {
      icon: TrendingUp,
      label: 'Avg Progress',
      value: `${progressRate}%`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      progress: progressRate
    },
    {
      icon: Zap,
      label: 'Current Streak',
      value: `${data.currentStreak} days`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      progress: null
    },
    {
      icon: Target,
      label: 'Certificates',
      value: data.certificates,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      progress: null
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Learning Progress
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {progressRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Overall Progress
            </div>
          </div>
        </div>
        
        {/* Main Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressRate}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  {stat.label}
                </div>
                <div className={`text-lg font-bold ${stat.color} truncate`}>
                  {stat.value}
                </div>
                {stat.progress !== null && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full rounded-full ${
                          stat.color.includes('green') ? 'bg-green-500' :
                          stat.color.includes('orange') ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Streak Visualization */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Learning Streak
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Keep the momentum going!
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {data.currentStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              days
            </div>
          </div>
        </div>
        
        {/* Streak Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
            <span className="text-gray-600 dark:text-gray-400">{data.currentStreak} days</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((data.currentStreak / 30) * 100, 100)}%` }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0 days</span>
            <span>30 days</span>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Achievements
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Award, label: 'First Course', earned: data.completedCourses > 0, color: 'text-green-600' },
            { icon: Target, label: 'Goal Setter', earned: data.totalCourses >= 3, color: 'text-blue-600' },
            { icon: Zap, label: 'Streak Master', earned: data.currentStreak >= 7, color: 'text-yellow-600' },
            { icon: BookOpen, label: 'Knowledge Seeker', earned: data.totalHours >= 10, color: 'text-purple-600' }
          ].map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
              className={`text-center p-3 rounded-lg ${
                achievement.earned 
                  ? 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700' 
                  : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                achievement.earned ? achievement.color : 'text-gray-400'
              }`} />
              <div className={`text-sm font-medium ${
                achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.label}
              </div>
              {achievement.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-xs text-green-600 dark:text-green-400 font-medium mt-1"
                >
                  ✓ Earned
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressVisualization;
