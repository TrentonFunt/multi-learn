import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Edit,
  Eye,
  TrendingUp,
  BookPlus,
  GraduationCap,
  Search,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Star,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data - in real app, this would come from API
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'React Fundamentals', 
      students: 234, 
      status: 'Published', 
      price: 99, 
      category: 'Development', 
      createdAt: '2024-01-15', 
      rating: 4.8,
      revenue: 23166,
      completionRate: 85
    },
    { 
      id: 2, 
      title: 'Advanced JavaScript', 
      students: 189, 
      status: 'Draft', 
      price: 149, 
      category: 'Development', 
      createdAt: '2024-01-14', 
      rating: 4.6,
      revenue: 0,
      completionRate: 0
    },
    { 
      id: 3, 
      title: 'Node.js Backend', 
      students: 156, 
      status: 'Published', 
      price: 199, 
      category: 'Development', 
      createdAt: '2024-01-13', 
      rating: 4.9,
      revenue: 31044,
      completionRate: 92
    }
  ]);
  
  const [students] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', enrolledCourses: 2, lastActive: '2024-01-20', progress: 75 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', enrolledCourses: 1, lastActive: '2024-01-19', progress: 45 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', enrolledCourses: 3, lastActive: '2024-01-18', progress: 90 }
  ]);
  
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<typeof courses[0] | null>(null);
  
  // Analytics data
  const analyticsData = {
    totalRevenue: 54210,
    monthlyRevenue: 15420,
    totalStudents: 579,
    monthlyStudents: 45,
    averageRating: 4.8,
    completionRate: 78.5,
    totalCourses: courses.length
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Students', value: analyticsData.totalStudents.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Total Courses', value: analyticsData.totalCourses.toString(), icon: BookOpen, color: 'text-green-600' },
    { label: 'Total Revenue', value: `$${analyticsData.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600' },
    { label: 'Average Rating', value: analyticsData.averageRating.toString(), icon: Star, color: 'text-orange-600' }
  ];

  // Handler Functions
  const handleCourseAction = (action: string, courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    switch (action) {
      case 'view':
        console.log('View course:', course);
        break;
      case 'edit':
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
  
  // Filter functions
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(courseSearchTerm.toLowerCase());
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
              Instructor Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Manage your courses and track your teaching progress
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
              {/* Instructor Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {user?.displayName || 'Instructor'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {user?.email}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                  {user?.instructorVerificationStatus === 'approved' ? 'Verified Instructor' : 'Pending Verification'}
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
                          ? 'bg-blue-600 text-white shadow-md'
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

                {/* Recent Courses */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Courses</h3>
                    <Button variant="fill" size="small">
                      <BookPlus className="h-4 w-4 mr-2" />
                      Create Course
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Course</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Students</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Revenue</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Rating</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.slice(0, 4).map((course) => (
                          <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">{course.title}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Created: {course.createdAt}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{course.students}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">${course.revenue.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{course.rating}</span>
                              </div>
                            </td>
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
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Students */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Students</h3>
                    <Button variant="outline" size="small">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Student</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Courses</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Progress</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Last Active</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.slice(0, 4).map((student) => (
                          <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-gray-900 dark:text-gray-100 font-medium">{student.name}</p>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.enrolledCourses}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.lastActive}</td>
                            <td className="py-3 px-4">
                              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {/* Course Management Header */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">My Courses</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" size="small">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="fill" size="small">
                        <BookPlus className="h-4 w-4 mr-2" />
                        Create Course
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
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All Courses</option>
                      <option value="published" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Published</option>
                      <option value="draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Draft</option>
                    </select>
                  </div>
                  
                  {/* Courses Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Course</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Category</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Price</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Students</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Revenue</th>
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
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">${course.revenue.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{course.rating}</span>
                              </div>
                            </td>
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
                                <button 
                                  onClick={() => handleCourseAction('view', course.id)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                                  title="View Course"
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
                                  <XCircle className="h-4 w-4" />
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

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">My Students</h2>
                    <div className="flex gap-3">
                      <Button variant="outline" size="small">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Student</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Enrolled Courses</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Overall Progress</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Last Active</th>
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:bg-gray-700">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-gray-900 dark:text-gray-100 font-medium">{student.name}</p>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.enrolledCourses}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{student.lastActive}</td>
                            <td className="py-3 px-4">
                              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
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
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Instructor Settings</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tell students about yourself and your expertise..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Specialties</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., React, JavaScript, Web Development"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Experience</label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Describe your professional experience..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
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

export default InstructorDashboard;
