import React from 'react';
import { lazy, Suspense } from 'react';
import SkeletonLoader from '../ui/SkeletonLoader';
import type { FilterOptions } from './CourseFilters';

// Lazy load the CourseFilters component
const CourseFilters = lazy(() => import('./CourseFilters'));

// Loading skeleton for CourseFilters
const CourseFiltersSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="space-y-6">
      {/* Sort skeleton */}
      <div className="space-y-3">
        <SkeletonLoader variant="text" width={80} height={20} />
        <SkeletonLoader variant="rectangular" height={48} className="w-full" />
      </div>
      
      {/* Filter sections skeleton */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <SkeletonLoader variant="text" width={100} height={20} />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2">
                <SkeletonLoader variant="rectangular" width={16} height={16} />
                <SkeletonLoader variant="text" width={120} height={16} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface LazyCourseFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string) => void;
  className?: string;
}

const LazyCourseFilters: React.FC<LazyCourseFiltersProps> = (props) => {
  return (
    <Suspense fallback={<CourseFiltersSkeleton />}>
      <CourseFilters {...props} />
    </Suspense>
  );
};

export default LazyCourseFilters;
