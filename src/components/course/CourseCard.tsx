import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Star } from 'lucide-react';

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
  rating = 0
}) => {
  return (
    <div className="bg-bg-primary border border-border-primary rounded-card shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-exo font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mb-4">by {instructor}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{students} Students</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{level}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{lessons} Lessons</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-text-secondary">{rating.toFixed(1)}</span>
              </div>
            )}
            {isFree ? (
              <span className="text-2xl font-bold text-status-success">Free</span>
            ) : (
              <>
                <span className="text-2xl font-bold text-text-primary">${price}</span>
                {originalPrice && (
                  <span className="text-lg text-text-secondary line-through">${originalPrice}</span>
                )}
              </>
            )}
          </div>
          <Link
            to={`/courses/${id}`}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
