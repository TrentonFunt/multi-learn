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
  DollarSign,
  Plus,
  Video,
  Trash2,
  Save
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Course Creation State
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    isFree: false,
    image: '',
    tags: [] as string[],
    modules: [] as Array<{id: string; title: string; description: string; lessons: Array<{id: string; title: string; description: string; videoUrl: string; duration: string; materials: string[]}>}>
  });
  
  const [currentModule, setCurrentModule] = useState({
    title: '',
    description: '',
    lessons: [] as Array<{id: string; title: string; description: string; videoUrl: string; duration: string; materials: string[]}>
  });
  
  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    materials: [] as string[]
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  
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
    { id: 'create-course', label: 'Create Course', icon: Plus },
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
        // TODO: Implement view course functionality
        break;
      case 'edit':
        // TODO: Implement edit course functionality
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

  // Course Creation Functions
  const addTag = () => {
    if (tagInput.trim() && !newCourse.tags.includes(tagInput.trim())) {
      setNewCourse(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewCourse(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addModule = () => {
    if (currentModule.title.trim()) {
      const module = {
        ...currentModule,
        id: Date.now().toString(),
        lessons: []
      };
      setNewCourse(prev => ({
        ...prev,
        modules: [...prev.modules, module]
      }));
      setCurrentModule({ title: '', description: '', lessons: [] });
    }
  };

  const addLesson = (moduleIndex: number) => {
    if (currentLesson.title.trim()) {
      const lesson = {
        ...currentLesson,
        id: Date.now().toString()
      };
      setNewCourse(prev => ({
        ...prev,
        modules: prev.modules.map((module, index) => 
          index === moduleIndex 
            ? { ...module, lessons: [...module.lessons, lesson] }
            : module
        )
      }));
      setCurrentLesson({ title: '', description: '', videoUrl: '', duration: '', materials: [] });
    }
  };

  const removeModule = (moduleIndex: number) => {
    setNewCourse(prev => ({
      ...prev,
      modules: prev.modules.filter((_, index) => index !== moduleIndex)
    }));
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    setNewCourse(prev => ({
      ...prev,
      modules: prev.modules.map((module, index) => 
          index === moduleIndex 
            ? { ...module, lessons: module.lessons.filter((_: {id: string; title: string; description: string; videoUrl: string; duration: string; materials: string[]}, lIndex: number) => lIndex !== lessonIndex) }
            : module
      )
    }));
  };

  const handleCreateCourse = async () => {
    setIsCreatingCourse(true);
    try {
      // Validate course data
      if (!newCourse.title.trim()) {
        addToast({ type: 'error', title: 'Validation Error', message: 'Course title is required' });
        return;
      }
      if (!newCourse.description.trim()) {
        addToast({ type: 'error', title: 'Validation Error', message: 'Course description is required' });
        return;
      }
      if (newCourse.modules.length === 0) {
        addToast({ type: 'error', title: 'Validation Error', message: 'At least one module is required' });
        return;
      }

      // Create course object
      const courseData = {
        id: Date.now().toString(),
        title: newCourse.title,
        description: newCourse.description,
        category: newCourse.category,
        level: newCourse.level,
        price: newCourse.isFree ? 0 : newCourse.price,
        isFree: newCourse.isFree,
        image: newCourse.image || '/api/placeholder/400/300',
        tags: newCourse.tags,
        modules: newCourse.modules,
        instructor: {
          id: user?.uid || 'instructor-1',
          name: user?.displayName || 'Instructor',
          avatar: user?.photoURL || '/api/placeholder/100/100',
          bio: 'Experienced instructor',
          rating: 4.8,
          totalStudents: 0,
          totalCourses: 1
        },
        rating: 0,
        totalReviews: 0,
        students: 0,
        lessons: newCourse.modules.reduce((acc, module) => acc + module.lessons.length, 0),
        slug: newCourse.title.toLowerCase().replace(/\s+/g, '-'),
        reviews: [],
        faqs: [],
        ratingBreakdown: {}
      };

      // Add to courses list
      setCourses(prev => [...prev, {
        id: parseInt(courseData.id),
        title: courseData.title,
        students: 0,
        status: 'Draft',
        price: courseData.price,
        category: courseData.category,
        createdAt: new Date().toISOString().split('T')[0],
        rating: 0,
        revenue: 0,
        completionRate: 0
      }]);

      // Reset form
      setNewCourse({
        title: '',
        description: '',
        category: '',
        level: 'beginner',
        price: 0,
        isFree: false,
        image: '',
        tags: [],
        modules: []
      });

      addToast({
        type: 'success',
        title: 'Course Created',
        message: 'Course created successfully! You can now publish it.',
      });

      // Switch to courses tab to see the new course
      setActiveTab('courses');
      
    } catch {
      addToast({
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create course. Please try again.',
      });
    } finally {
      setIsCreatingCourse(false);
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
                    <Button 
                      variant="fill" 
                      size="small"
                      onClick={() => setActiveTab('create-course')}
                    >
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

            {/* Create Course Tab */}
            {activeTab === 'create-course' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Create New Course</h2>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('courses')}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="fill" 
                        onClick={handleCreateCourse}
                        disabled={isCreatingCourse}
                      >
                        {isCreatingCourse ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Create Course
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Basic Course Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Course Title <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={newCourse.title}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter course title"
                            name="courseTitle"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Category
                          </label>
                          <select
                            value={newCourse.category}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Category</option>
                            <option value="Development">Development</option>
                            <option value="Design">Design</option>
                            <option value="Business">Business</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Photography">Photography</option>
                            <option value="Music">Music</option>
                            <option value="Health">Health</option>
                            <option value="Fitness">Fitness</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          value={newCourse.description}
                          onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe what students will learn in this course"
                          rows={4}
                          name="courseDescription"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Level
                          </label>
                          <select
                            value={newCourse.level}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, level: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Price
                          </label>
                          <Input
                            type="number"
                            value={newCourse.price}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            placeholder="0.00"
                            name="coursePrice"
                            disabled={newCourse.isFree}
                          />
                        </div>

                        <div className="flex items-center space-x-3 pt-6">
                          <input
                            type="checkbox"
                            id="isFree"
                            checked={newCourse.isFree}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, isFree: e.target.checked }))}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="isFree" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Free Course
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Course Image URL
                        </label>
                        <Input
                          value={newCourse.image}
                          onChange={(e) => setNewCourse(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                          name="courseImage"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tags</h3>
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add a tag"
                          name="tagInput"
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        />
                        <Button variant="outline" onClick={addTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {newCourse.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {newCourse.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                <XCircle className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Course Modules */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Course Modules</h3>
                        <Button variant="outline" onClick={addModule}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Module
                        </Button>
                      </div>

                      {newCourse.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Module {moduleIndex + 1}</h4>
                            <Button 
                              variant="text" 
                              size="small"
                              onClick={() => removeModule(moduleIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Module Title
                              </label>
                              <Input
                                value={module.title}
                                onChange={(e) => setCurrentModule(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Module title"
                                name="moduleTitle"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Module Description
                              </label>
                              <Textarea
                                value={module.description}
                                onChange={(e) => setCurrentModule(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Module description"
                                rows={2}
                                name="moduleDescription"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-700 dark:text-gray-300">Lessons</h5>
                              <Button 
                                variant="outline" 
                                size="small"
                                onClick={() => addLesson(moduleIndex)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Lesson
                              </Button>
                            </div>

                            {module.lessons.map((lesson: {id: string; title: string; description: string; videoUrl: string; duration: string; materials: string[]}, lessonIndex: number) => (
                              <div key={lessonIndex} className="bg-gray-50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Video className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-900 dark:text-gray-100">{lesson.title}</span>
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </div>
                                <Button 
                                  variant="text" 
                                  size="small"
                                  onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Input
                                value={currentLesson.title}
                                onChange={(e) => setCurrentLesson(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Lesson title"
                                name="lessonTitle"
                              />
                              <Input
                                value={currentLesson.duration}
                                onChange={(e) => setCurrentLesson(prev => ({ ...prev, duration: e.target.value }))}
                                placeholder="Duration (e.g., 10:30)"
                                name="lessonDuration"
                              />
                            </div>
                            <Input
                              value={currentLesson.videoUrl}
                              onChange={(e) => setCurrentLesson(prev => ({ ...prev, videoUrl: e.target.value }))}
                              placeholder="Video URL or upload file"
                              name="lessonVideo"
                            />
                          </div>
                        </div>
                      ))}

                      {newCourse.modules.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No modules added yet. Click "Add Module" to get started.</p>
                        </div>
                      )}
                    </div>
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
                      <Button 
                        variant="fill" 
                        size="small"
                        onClick={() => setActiveTab('create-course')}
                      >
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
