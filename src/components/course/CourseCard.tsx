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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group hover:-translate-y-1 hover:border-orange-200 dark:hover:border-orange-500/30 w-full h-full flex flex-col">
      <div className="relative overflow-hidden">
        <LazyImage
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 group-hover:bg-orange-600">
          {category}
        </div>
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            id={id}
            type="course"
            title={title}
            image={image}
            size="md"
          />
        </div>
        {/* Hover overlay with play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 pointer-events-auto">
            <svg className="w-5 h-5 text-orange-500 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/courses/${id}`} className="block">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {instructor}</p>
        
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400 mb-4 flex-shrink-0">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{duration}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{students} Students</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{level}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Star className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{lessons} Lessons</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isFree ? (
              <span className="text-lg font-bold text-green-600 dark:text-green-400">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">${price}</span>
                {originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${originalPrice}</span>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Enrollment Button */}
        <div className="mt-auto">
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
    </div>
  );
};

export default CourseCard;
