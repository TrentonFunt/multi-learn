import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  UserPlus, 
  Plus,
  BookPlus,
  Eye,
  Edit,
  Trash2,
  UserCheck
} from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  role: 'Student' | 'Instructor' | 'Admin';
  lastLogin: string;
  coursesEnrolled: number;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  status: 'Published' | 'Draft' | 'Archived';
  price: number;
  category: string;
  createdAt: string;
  rating: number;
}

interface DashboardProps {
  users: User[];
  courses: Course[];
}

const Dashboard: React.FC<DashboardProps> = ({ users, courses }) => {
  const stats = [
    { label: 'Total Users', value: users.length.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Total Courses', value: courses.length.toString(), icon: BookOpen, color: 'text-green-600' },
    { label: 'Active Students', value: users.filter(u => u.role === 'Student' && u.status === 'Active').length.toString(), icon: UserPlus, color: 'text-purple-600' },
    { label: 'Revenue', value: '$12,450', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-card shadow-card p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Instructor Dashboard Access</h3>
              <p className="text-orange-100 text-sm">Quick access to instructor features and course management</p>
            </div>
          </div>
          <Link
            to="/instructor"
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 hover:scale-105 hover:shadow-lg"
          >
            <UserCheck className="h-4 w-4 mr-2 inline" />
            Open Dashboard
          </Link>
        </div>
      </motion.div>

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Users</h3>
          <Button variant="outline" size="small">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Name</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Email</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Join Date</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 4).map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : user.status === 'Suspended'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Courses</h3>
          <Button variant="outline" size="small">
            <BookPlus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Instructor</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Students</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, 4).map((course) => (
                <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{course.title}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{course.instructor}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{course.students}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'Published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : course.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
