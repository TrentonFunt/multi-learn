import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle, 
  BarChart3, 
  Download, 
  RefreshCw
} from 'lucide-react';
import Button from '../ui/Button';

interface AnalyticsData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalEnrollments: number;
  monthlyEnrollments: number;
  averageRating: number;
  completionRate: number;
}

interface AnalyticsProps {
  analyticsData: AnalyticsData;
  courses: any[];
  users: any[];
}

const Analytics: React.FC<AnalyticsProps> = ({ analyticsData, courses, users }) => {
  const exportAnalytics = () => {
    const csvContent = [
      ['Metric', 'Value', 'Change'],
      ['Total Revenue', `$${analyticsData.totalRevenue.toLocaleString()}`, '+12%'],
      ['Monthly Revenue', `$${analyticsData.monthlyRevenue.toLocaleString()}`, '+8%'],
      ['Total Enrollments', analyticsData.totalEnrollments.toLocaleString(), '+8%'],
      ['Monthly Enrollments', analyticsData.monthlyEnrollments.toLocaleString(), '+15%'],
      ['Average Rating', analyticsData.averageRating.toString(), '+0.2'],
      ['Completion Rate', `${analyticsData.completionRate}%`, '+5%']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshAnalytics = () => {
    // In a real app, this would fetch fresh data from the server
    console.log('Refreshing analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Analytics Dashboard</h2>
          <div className="flex gap-3">
            <Button variant="outline" size="small" onClick={exportAnalytics}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="small" onClick={refreshAnalytics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-blue-100 text-xs">+12% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Enrollments</p>
                <p className="text-2xl font-bold">{analyticsData.totalEnrollments.toLocaleString()}</p>
                <p className="text-green-100 text-xs">+8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Average Rating</p>
                <p className="text-2xl font-bold">{analyticsData.averageRating}</p>
                <p className="text-purple-100 text-xs">+0.2 from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-200" />
            </div>
          </motion.div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Monthly Revenue</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[12000, 15000, 18000, 14000, 16000, 19000, 15420].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-600 rounded-t w-8 transition-all duration-500 hover:bg-blue-700"
                    style={{ height: `${(value / 20000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Enrollment Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Course Enrollments</h3>
            <div className="space-y-4">
              {[
                { name: 'React Fundamentals', enrollments: 234, percentage: 85 },
                { name: 'Advanced JavaScript', enrollments: 189, percentage: 70 },
                { name: 'Node.js Backend', enrollments: 156, percentage: 60 },
                { name: 'UI/UX Design', enrollments: 298, percentage: 90 },
                { name: 'Python for Beginners', enrollments: 445, percentage: 95 }
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900 dark:text-gray-100">{course.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{course.enrollments} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analyticsData.completionRate}%</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Completion Rate</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{courses.length}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Courses</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{users.length}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${analyticsData.monthlyRevenue.toLocaleString()}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">This Month</p>
          </motion.div>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Performing Courses</h3>
          <div className="space-y-4">
            {[
              { title: 'Python for Beginners', revenue: 12450, students: 445 },
              { title: 'UI/UX Design', revenue: 8950, students: 298 },
              { title: 'React Fundamentals', revenue: 7800, students: 234 },
              { title: 'Advanced JavaScript', revenue: 5670, students: 189 },
              { title: 'Node.js Backend', revenue: 4680, students: 156 }
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{course.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${course.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">User Growth</h3>
          <div className="space-y-4">
            {[
              { month: 'January', users: 120, growth: '+15%' },
              { month: 'February', users: 145, growth: '+21%' },
              { month: 'March', users: 178, growth: '+23%' },
              { month: 'April', users: 203, growth: '+14%' },
              { month: 'May', users: 234, growth: '+15%' },
              { month: 'June', users: 267, growth: '+14%' },
              { month: 'July', users: 298, growth: '+12%' }
            ].map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{data.month}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.users} new users</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{data.growth}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Growth</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New course published', details: 'Advanced React Patterns by John Doe', time: '2 hours ago' },
            { action: 'User registered', details: 'Sarah Wilson joined as an instructor', time: '4 hours ago' },
            { action: 'Course completed', details: 'Mike Johnson completed Python for Beginners', time: '6 hours ago' },
            { action: 'Payment received', details: '$99 for React Fundamentals course', time: '8 hours ago' },
            { action: 'Instructor approved', details: 'David Brown approved as instructor', time: '12 hours ago' },
            { action: 'Course updated', details: 'UI/UX Design course content updated', time: '1 day ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
