import React from 'react';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import EnrollmentButton from './EnrollmentButton';

interface CourseHeroProps {
  title: string;
  image: string;
  instructor?: string;
  category?: string;
  duration?: string;
  students?: number;
  rating?: number;
  lessons?: number;
  description?: string;
  courseId?: string;
}

const CourseHero: React.FC<CourseHeroProps> = ({ 
  title, 
  image, 
  instructor = 'John Doe',
  category = 'Web Development',
  duration = '10 hours',
  students = 1234,
  rating = 4.8,
  lessons = 25,
  description = '',
  courseId = '1'
}) => {
  return (
    <section className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {description || 'Master the fundamentals and advanced concepts in this comprehensive course designed for all skill levels.'}
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-400" />
                <span>{students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span>{lessons} lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{rating} rating</span>
              </div>
            </div>
            
            <div className="pt-2 sm:pt-4 w-full sm:w-auto">
              <EnrollmentButton
                courseId={courseId}
                courseTitle={title}
                instructor={instructor}
                thumbnail={image}
                totalLessons={lessons}
                estimatedDuration={duration}
                difficulty="intermediate"
                category={category}
                rating={rating}
                description={description}
                variant="page"
              />
            </div>
          </div>
          
          <div className="relative">
            <img
              src={image}
              alt="Course illustration"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
