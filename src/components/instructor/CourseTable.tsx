import React from 'react';
import { Star, Eye, Edit, XCircle, CheckCircle } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  students: number;
  status: string;
  price: number;
  category: string;
  createdAt: string;
  rating: number;
  revenue: number;
  completionRate: number;
}

interface CourseTableProps {
  courses: Course[];
  onAction: (action: string, courseId: number) => void;
  showActions?: boolean;
  compact?: boolean;
}

const CourseTable: React.FC<CourseTableProps> = ({ 
  courses, 
  onAction, 
  showActions = true,
  compact = false 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Course</th>
            {!compact && (
              <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Category</th>
            )}
            {!compact && (
              <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Price</th>
            )}
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Students</th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Revenue</th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Rating</th>
            <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Status</th>
            {showActions && (
              <th className="text-left py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-4">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{course.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Created: {course.createdAt}</p>
                </div>
              </td>
              {!compact && (
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {course.category}
                  </span>
                </td>
              )}
              {!compact && (
                <td className="py-3 px-4">
                  {course.price === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100 font-medium">${course.price}</span>
                  )}
                </td>
              )}
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
              {showActions && (
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onAction('view', course.id)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                      title="View Course"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onAction('edit', course.id)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                      title="Edit Course"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onAction('publish', course.id)}
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
                      onClick={() => onAction('delete', course.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Delete Course"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
