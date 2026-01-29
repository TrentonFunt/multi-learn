import React from 'react';
import { TrendingUp, Users, Star, Download, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

interface AnalyticsData {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  monthlyStudents: number;
  averageRating: number;
  completionRate: number;
  totalCourses: number;
}

interface InstructorAnalyticsProps {
  analyticsData: AnalyticsData;
}

const InstructorAnalytics: React.FC<InstructorAnalyticsProps> = ({ analyticsData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Analytics Dashboard</h2>
          <div className="flex gap-3">
            <Button variant="outline" size="small">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="small">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-blue-100 text-xs">+12% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Students</p>
                <p className="text-2xl font-bold">{analyticsData.totalStudents.toLocaleString()}</p>
                <p className="text-green-100 text-xs">+8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Average Rating</p>
                <p className="text-2xl font-bold">{analyticsData.averageRating}</p>
                <p className="text-purple-100 text-xs">+0.2 from last month</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
