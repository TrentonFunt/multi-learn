import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4';
      case 'card':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const getDimensions = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            } mb-2`}
            style={index === lines - 1 ? { width: '75%' } : {}}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={getDimensions()}
      animate={{
        backgroundPosition: ['0% 50%', '200% 50%', '0% 50%']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

// Specific skeleton components
export const CourseCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
    <SkeletonLoader variant="card" height={192} className="w-full" />
    <div className="p-6">
      <SkeletonLoader variant="text" width="85%" height={20} className="mb-2" />
      <SkeletonLoader variant="text" width="60%" height={16} className="mb-4" />
      <div className="flex justify-between items-center mb-4">
        <SkeletonLoader variant="text" width={60} height={14} />
        <SkeletonLoader variant="text" width={80} height={14} />
      </div>
      <div className="flex justify-between items-center">
        <SkeletonLoader variant="text" width={70} height={14} />
        <SkeletonLoader variant="text" width={50} height={14} />
      </div>
    </div>
  </div>
);

export const ArticleCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
    <SkeletonLoader variant="card" height={192} className="w-full" />
    <div className="p-6">
      <SkeletonLoader variant="text" width="90%" height={20} className="mb-2" />
      <SkeletonLoader variant="text" width="40%" height={14} className="mb-3" />
      <SkeletonLoader lines={3} variant="text" />
    </div>
  </div>
);

export const CategoryCardSkeleton: React.FC = () => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
    <SkeletonLoader variant="circular" width={48} height={48} className="mx-auto mb-4" />
    <SkeletonLoader variant="text" width="80%" height={16} className="mb-2" />
    <SkeletonLoader variant="text" width="60%" height={14} />
  </div>
);

export const StatCardSkeleton: React.FC = () => (
  <div className="text-center p-6">
    <SkeletonLoader variant="text" width={80} height={48} className="mx-auto mb-2" />
    <SkeletonLoader variant="text" width={120} height={20} className="mx-auto" />
  </div>
);

export const PageCardSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8">
        <SkeletonLoader variant="text" width={200} height={20} />
      </div>
      
      {/* Header skeleton */}
      <div className="mb-8">
        <SkeletonLoader variant="text" width={300} height={32} className="mb-4" />
        <SkeletonLoader variant="text" width={500} height={20} />
      </div>
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
