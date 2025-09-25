import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { type Course } from '../../data/courseData';

interface RelatedCoursesProps {
  courses: Course[];
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ courses }) => {
  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Courses</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Course Image */}
            <div className="relative overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {course.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {course.title}
              </h4>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {course.instructor.name}
                </span>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              {/* Rating and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {course.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({course.totalReviews})
                  </span>
                </div>
                <div className="text-right">
                  {course.isFree ? (
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">Free</span>
                  ) : course.originalPrice && course.originalPrice > course.price ? (
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ${course.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-1">
                        ${course.originalPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${course.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
