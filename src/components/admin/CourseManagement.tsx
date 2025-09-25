import React, { useState } from 'react';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  CheckCircle, 
  XCircle, 
  Download, 
  BookPlus,
  X
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';
import ConfirmationModal from '../ui/ConfirmationModal';

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

interface CourseManagementProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CourseManagement: React.FC<CourseManagementProps> = ({ courses, setCourses }) => {
  const { addToast } = useToast();
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);
  const [courseToView, setCourseToView] = useState<Course | null>(null);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [editedCourse, setEditedCourse] = useState<Partial<Course>>({});
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    category: 'Development',
    price: 0,
    description: '',
    status: 'Draft' as Course['status']
  });

  const categories = ['Development', 'Design', 'Marketing', 'Business', 'Programming', 'Data Science'];

  // Filter courses based on search term and filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(courseSearchTerm.toLowerCase());
    const matchesFilter = courseFilter === 'all' || course.status.toLowerCase() === courseFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Handler Functions
  const handleCourseAction = (action: string, courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    switch (action) {
      case 'view':
        setCourseToView(course);
        setShowCourseDetailsModal(true);
        break;
      case 'edit':
        setCourseToEdit(course);
        setEditedCourse({ ...course });
        setShowEditCourseModal(true);
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
      case 'archive':
        setCourses(courses.map(c => 
          c.id === courseId 
            ? { ...c, status: 'Archived' }
            : c
        ));
        addToast({
          type: 'success',
          title: 'Course Archived',
          message: `Course "${course.title}" has been archived.`
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

  const handleEditCourse = () => {
    if (courseToEdit && editedCourse) {
      setCourses(courses.map(c => 
        c.id === courseToEdit.id 
          ? { ...c, ...editedCourse }
          : c
      ));
      addToast({
        type: 'success',
        title: 'Course Updated',
        message: `Course "${editedCourse.title}" has been updated successfully.`
      });
      setShowEditCourseModal(false);
      setCourseToEdit(null);
      setEditedCourse({});
    }
  };

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.instructor) {
      const course: Course = {
        id: Math.max(...courses.map(c => c.id)) + 1,
        title: newCourse.title,
        instructor: newCourse.instructor,
        category: newCourse.category,
        price: newCourse.price,
        status: newCourse.status,
        students: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, course]);
      addToast({
        type: 'success',
        title: 'Course Added',
        message: `Course "${newCourse.title}" has been added successfully.`
      });
      setShowAddCourseModal(false);
      setNewCourse({
        title: '',
        instructor: '',
        category: 'Development',
        price: 0,
        description: '',
        status: 'Draft'
      });
    }
  };

  const exportCourses = () => {
    const csvContent = [
      ['Title', 'Instructor', 'Category', 'Price', 'Students', 'Rating', 'Status', 'Created Date'],
      ...filteredCourses.map(course => [
        course.title,
        course.instructor,
        course.category,
        course.price.toString(),
        course.students.toString(),
        course.rating.toString(),
        course.status,
        course.createdAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Export Complete',
      message: 'Course data has been exported successfully.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Course Management Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Course Management</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="small" onClick={exportCourses}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="fill" size="small" onClick={() => setShowAddCourseModal(true)}>
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
            <option value="archived" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Archived</option>
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
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
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
                        onClick={() => handleCourseAction('archive', course.id)}
                        className="text-gray-600 hover:text-gray-700 p-1"
                        title="Archive Course"
                      >
                        <BookOpen className="h-4 w-4" />
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

      {/* Delete Course Modal */}
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

      {/* Course Details Modal */}
      {showCourseDetailsModal && courseToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Course Details
              </h3>
              <button
                onClick={() => {
                  setShowCourseDetailsModal(false);
                  setCourseToView(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Course Header */}
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {courseToView.title}
                </h4>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    courseToView.status === 'Published' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : courseToView.status === 'Draft'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {courseToView.status}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                    {courseToView.category}
                  </span>
                </div>
              </div>

              {/* Course Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Instructor</h5>
                  <p className="text-gray-600 dark:text-gray-400">{courseToView.instructor}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Price</h5>
                  <p className="text-gray-600 dark:text-gray-400">
                    {courseToView.price === 0 ? 'Free' : `$${courseToView.price}`}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Students Enrolled</h5>
                  <p className="text-gray-600 dark:text-gray-400">{courseToView.students}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Rating</h5>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-600 dark:text-gray-400">{courseToView.rating}</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Created Date</h5>
                  <p className="text-gray-600 dark:text-gray-400">{courseToView.createdAt}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCourseDetailsModal(false);
                    setCourseToView(null);
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="fill"
                  onClick={() => {
                    handleCourseAction('edit', courseToView.id);
                    setShowCourseDetailsModal(false);
                    setCourseToView(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditCourseModal && courseToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Edit Course
              </h3>
              <button
                onClick={() => {
                  setShowEditCourseModal(false);
                  setCourseToEdit(null);
                  setEditedCourse({});
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={editedCourse.title || ''}
                  onChange={(e) => setEditedCourse({ ...editedCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  value={editedCourse.instructor || ''}
                  onChange={(e) => setEditedCourse({ ...editedCourse, instructor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Category
                </label>
                <select
                  value={editedCourse.category || 'Development'}
                  onChange={(e) => setEditedCourse({ ...editedCourse, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editedCourse.price || 0}
                  onChange={(e) => setEditedCourse({ ...editedCourse, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Status
                </label>
                <select
                  value={editedCourse.status || 'Draft'}
                  onChange={(e) => setEditedCourse({ ...editedCourse, status: e.target.value as Course['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Draft</option>
                  <option value="Published" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Published</option>
                  <option value="Archived" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditCourseModal(false);
                  setCourseToEdit(null);
                  setEditedCourse({});
                }}
              >
                Cancel
              </Button>
              <Button
                variant="fill"
                onClick={handleEditCourse}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Course
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Add New Course
              </h3>
              <button
                onClick={() => {
                  setShowAddCourseModal(false);
                  setNewCourse({
                    title: '',
                    instructor: '',
                    category: 'Development',
                    price: 0,
                    description: '',
                    status: 'Draft'
                  });
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter course title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Instructor
                </label>
                <input
                  type="text"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Category
                </label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Enter course price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Status
                </label>
                <select
                  value={newCourse.status}
                  onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value as Course['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Draft</option>
                  <option value="Published" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Published</option>
                  <option value="Archived" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddCourseModal(false);
                  setNewCourse({
                    title: '',
                    instructor: '',
                    category: 'Development',
                    price: 0,
                    description: '',
                    status: 'Draft'
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="fill"
                onClick={handleAddCourse}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add Course
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
