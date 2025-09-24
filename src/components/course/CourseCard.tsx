import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import FavoriteButton from '../ui/FavoriteButton';
import LazyImage from '../ui/LazyImage';
import EnrollmentButton from './EnrollmentButton';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  duration: string;
  students: number;
  level: string;
  lessons: number;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  rating?: number;
  description?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  category,
  image,
  duration,
  students,
  level,
  lessons,
  price,
  originalPrice,
  isFree = false,
  rating = 0,
  description = ''
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card shadow-card overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-2 hover:border-primary/20 w-full max-w-sm mx-auto sm:max-w-none">
      <div className="relative overflow-hidden">
        <LazyImage
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-700">
          {category}
        </div>
        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <FavoriteButton
            id={id}
            type="course"
            title={title}
            image={image}
            size="md"
          />
        </div>
        {/* Hover overlay with play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-6 pb-4">
        <Link to={`/courses/${id}`} className="block">
          <h3 className="text-lg font-exo font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">by {instructor}</p>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{students} Students</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{level}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">{lessons} Lessons</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{rating.toFixed(1)}</span>
              </div>
            )}
            {isFree ? (
              <span className="text-xl sm:text-2xl font-bold text-status-success">Free</span>
            ) : (
              <>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">${price}</span>
                {originalPrice && (
                  <span className="text-base sm:text-lg text-gray-600 dark:text-gray-400 line-through">${originalPrice}</span>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Enrollment Button */}
        <EnrollmentButton
          courseId={id}
          courseTitle={title}
          instructor={instructor}
          thumbnail={image}
          totalLessons={lessons}
          estimatedDuration={duration}
          difficulty={level as 'beginner' | 'intermediate' | 'advanced'}
          category={category}
          rating={rating}
          description={description}
          variant="card"
        />
      </div>
    </div>
  );
};

export default CourseCard;
