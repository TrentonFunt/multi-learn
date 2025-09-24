import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  UserPlus,
  BookPlus,
  Shield,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // User Management State
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', status: 'Active', role: 'Student', lastLogin: '2024-01-20', coursesEnrolled: 3 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-01-14', status: 'Active', role: 'Instructor', lastLogin: '2024-01-19', coursesEnrolled: 0 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-01-13', status: 'Inactive', role: 'Student', lastLogin: '2024-01-10', coursesEnrolled: 1 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-01-12', status: 'Active', role: 'Student', lastLogin: '2024-01-18', coursesEnrolled: 5 },
    { id: 5, name: 'David Brown', email: 'david@example.com', joinDate: '2024-01-11', status: 'Active', role: 'Instructor', lastLogin: '2024-01-20', coursesEnrolled: 0 },
    { id: 6, name: 'Lisa Davis', email: 'lisa@example.com', joinDate: '2024-01-10', status: 'Suspended', role: 'Student', lastLogin: '2024-01-08', coursesEnrolled: 2 }
  ]);
  
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  // const [showUserModal, setShowUserModal] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<typeof users[0] | null>(null);
  
  // Course Management State
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Fundamentals', instructor: 'John Doe', students: 234, status: 'Published', price: 99, category: 'Development', createdAt: '2024-01-15', rating: 4.8 },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', students: 189, status: 'Draft', price: 149, category: 'Development', createdAt: '2024-01-14', rating: 4.6 },
    { id: 3, title: 'Node.js Backend', instructor: 'Mike Johnson', students: 156, status: 'Published', price: 199, category: 'Development', createdAt: '2024-01-13', rating: 4.9 },
    { id: 4, title: 'UI/UX Design', instructor: 'Sarah Wilson', students: 298, status: 'Published', price: 79, category: 'Design', createdAt: '2024-01-12', rating: 4.7 },
    { id: 5, title: 'Python for Beginners', instructor: 'David Brown', students: 445, status: 'Published', price: 0, category: 'Programming', createdAt: '2024-01-11', rating: 4.5 },
    { id: 6, title: 'Digital Marketing', instructor: 'Lisa Davis', students: 123, status: 'Archived', price: 129, category: 'Marketing', createdAt: '2024-01-10', rating: 4.3 }
  ]);
  
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  // const [showCourseModal, setShowCourseModal] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<typeof courses[0] | null>(null);
  
  // Analytics State
  const [analyticsData] = useState({
    totalRevenue: 125430,
    monthlyRevenue: 15420,
    totalEnrollments: 2341,
    monthlyEnrollments: 234,
    averageRating: 4.7,
    completionRate: 78.5
  });
  
  // Settings State
  const [settings, setSettings] = useState({
    siteName: 'MultiLearn',
    siteDescription: 'A modern e-learning platform',
    allowRegistration: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    maxFileSize: 100,
    allowedFileTypes: ['jpg', 'png', 'pdf', 'mp4'],
    emailNotifications: true,
    smsNotifications: false
  });


  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Total Courses', value: '89', icon: BookOpen, color: 'text-green-600' },
    { label: 'Active Students', value: '856', icon: UserPlus, color: 'text-purple-600' },
    { label: 'Revenue', value: '$12,450', icon: TrendingUp, color: 'text-orange-600' }
  ];


  // Handler Functions
  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    switch (action) {
      case 'view':
        // setSelectedUser(user);
        // setShowUserModal(true);
        console.log('View user:', user);
        break;
      case 'edit':
        // setSelectedUser(user);
        // setShowUserModal(true);
        console.log('Edit user:', user);
        break;
      case 'delete':
        setUserToDelete(user);
        setShowDeleteUserModal(true);
        break;
      case 'suspend':
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' }
            : u
        ));
        addToast({
          type: 'success',
          title: 'User Status Updated',
          message: `User ${user.name} has been ${user.status === 'Suspended' ? 'activated' : 'suspended'}.`
        });
        break;
    }
  };
  
  const handleCourseAction = (action: string, courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    switch (action) {
      case 'view':
        // setSelectedCourse(course);
        // setShowCourseModal(true);
        console.log('View course:', course);
        break;
      case 'edit':
        // setSelectedCourse(course);
        // setShowCourseModal(true);
        console.log('Edit course:', course);
        break;
      case 'delete':
        setCourseToDelete(course);
        setShowDeleteCourseModal(true);
        break;
      case 'publish':
        setCourses(courses.map(c => 
          c.id === courseId 
            ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' }
            : c
        ));
        addToast({
          type: 'success',
          title: 'Course Status Updated',
          message: `Course "${course.title}" has been ${course.status === 'Published' ? 'unpublished' : 'published'}.`
        });
        break;
    }
  };
  
  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      addToast({
        type: 'success',
        title: 'User Deleted',
        message: `User ${userToDelete.name} has been deleted.`
      });
      setShowDeleteUserModal(false);
      setUserToDelete(null);
    }
  };
  
  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      addToast({
        type: 'success',
        title: 'Course Deleted',
        message: `Course "${courseToDelete.title}" has been deleted.`
      });
      setShowDeleteCourseModal(false);
      setCourseToDelete(null);
    }
  };
  
  const handleSettingsChange = (key: string, value: string | boolean | number | string[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    addToast({
      type: 'success',
      title: 'Settings Updated',
      message: 'Your settings have been saved successfully.'
    });
  };
  
  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status.toLowerCase() === userFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());
    const matchesFilter = courseFilter === 'all' || course.status.toLowerCase() === courseFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-exo font-semibold text-gray-900 dark:text-gray-100 mb-4"
            >
              Admin Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Manage your MultiLearn platform
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
              {/* Admin Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user?.displayName || 'Admin'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                  Administrator
                </span>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
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

                {/* Recent Users */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
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
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
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
                </div>

                {/* Recent Courses */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
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
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
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
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* User Management Header */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Management</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="small">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="fill" size="small">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  
                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">User</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Role</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Courses</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Last Login</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-gray-900 dark:text-gray-100 font-medium">{user.name}</p>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.role === 'Instructor' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : user.status === 'Suspended'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.coursesEnrolled}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleUserAction('view', user.id)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleUserAction('edit', user.id)}
                                  className="text-blue-600 hover:text-blue-700 p-1"
                                  title="Edit User"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleUserAction('suspend', user.id)}
                                  className={`p-1 ${
                                    user.status === 'Suspended' 
                                      ? 'text-green-600 hover:text-green-700' 
                                      : 'text-yellow-600 hover:text-yellow-700'
                                  }`}
                                  title={user.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
                                >
                                  {user.status === 'Suspended' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                </button>
                                <button 
                                  onClick={() => handleUserAction('delete', user.id)}
                                  className="text-red-600 hover:text-red-700 p-1"
                                  title="Delete User"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400">No users found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {/* Course Management Header */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Course Management</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="small">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="fill" size="small">
                        <BookPlus className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={courseSearchTerm}
                        onChange={(e) => setCourseSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Courses</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  {/* Courses Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Course</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Instructor</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Category</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Price</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Students</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Rating</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCourses.map((course) => (
                          <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-700">
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">{course.title}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Created: {course.createdAt}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{course.instructor}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {course.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {course.price === 0 ? (
                                <span className="text-green-600 font-medium">Free</span>
                              ) : (
                                <span className="text-gray-900 dark:text-gray-100 font-medium">${course.price}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{course.students}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-400">★</span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{course.rating}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                course.status === 'Published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : course.status === 'Draft'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {course.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleCourseAction('view', course.id)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleCourseAction('edit', course.id)}
                                  className="text-blue-600 hover:text-blue-700 p-1"
                                  title="Edit Course"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleCourseAction('publish', course.id)}
                                  className={`p-1 ${
                                    course.status === 'Published' 
                                      ? 'text-yellow-600 hover:text-yellow-700' 
                                      : 'text-green-600 hover:text-green-700'
                                  }`}
                                  title={course.status === 'Published' ? 'Unpublish Course' : 'Publish Course'}
                                >
                                  {course.status === 'Published' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                </button>
                                <button 
                                  onClick={() => handleCourseAction('delete', course.id)}
                                  className="text-red-600 hover:text-red-700 p-1"
                                  title="Delete Course"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredCourses.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400">No courses found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Analytics Header */}
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
                          <p className="text-green-100 text-sm">Total Enrollments</p>
                          <p className="text-2xl font-bold">{analyticsData.totalEnrollments.toLocaleString()}</p>
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
                        <BarChart3 className="h-8 w-8 text-purple-200" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
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
                    </div>
                    
                    {/* Enrollment Chart */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
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
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analyticsData.completionRate}%</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Completion Rate</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{courses.length}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total Courses</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{users.length}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${analyticsData.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">This Month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">General Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Site Description</label>
                      <input
                        type="text"
                        value={settings.siteDescription}
                        onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* User Settings */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
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
                </div>
                
                {/* System Settings */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
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
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Allowed File Types</label>
                        <input
                          type="text"
                          value={settings.allowedFileTypes.join(', ')}
                          onChange={(e) => handleSettingsChange('allowedFileTypes', e.target.value.split(', '))}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="jpg, png, pdf, mp4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notification Settings */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
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
                </div>
                
                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-card shadow-card p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-6">Danger Zone</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-red-800 font-medium">Reset All Settings</h4>
                        <p className="text-red-600 text-sm">Reset all settings to their default values</p>
                      </div>
                      <Button variant="outline" size="small" className="border-red-300 text-red-600 hover:bg-red-50">
                        Reset Settings
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-red-800 font-medium">Clear All Data</h4>
                        <p className="text-red-600 text-sm">Permanently delete all user data and courses</p>
                      </div>
                      <Button variant="outline" size="small" className="border-red-300 text-red-600 hover:bg-red-50">
                        Clear Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showDeleteUserModal}
        onClose={() => setShowDeleteUserModal(false)}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        type="danger"
      />
      
      <ConfirmationModal
        isOpen={showDeleteCourseModal}
        onClose={() => setShowDeleteCourseModal(false)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message={`Are you sure you want to delete course "${courseToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Course"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Admin;
