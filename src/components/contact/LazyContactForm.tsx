import React from 'react';
import { lazy, Suspense } from 'react';
import SkeletonLoader from '../ui/SkeletonLoader';

// Lazy load the ContactForm component
const ContactForm = lazy(() => import('./ContactForm'));

// Loading skeleton for ContactForm
const ContactFormSkeleton: React.FC = () => (
  <div className="bg-bg-primary border border-border-primary rounded-xl shadow-lg p-8">
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" width={200} height={32} />
        <SkeletonLoader variant="text" width={400} height={20} />
      </div>
      
      {/* Form skeleton */}
      <div className="space-y-6">
        {/* Name and Email fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <SkeletonLoader variant="text" width={80} height={20} />
            <SkeletonLoader variant="rectangular" height={48} className="w-full" />
          </div>
          <div className="space-y-2">
            <SkeletonLoader variant="text" width={100} height={20} />
            <SkeletonLoader variant="rectangular" height={48} className="w-full" />
          </div>
        </div>
        
        {/* Subject field */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" width={60} height={20} />
          <SkeletonLoader variant="rectangular" height={48} className="w-full" />
        </div>
        
        {/* Message field */}
        <div className="space-y-2">
          <SkeletonLoader variant="text" width={70} height={20} />
          <SkeletonLoader variant="rectangular" height={120} className="w-full" />
        </div>
        
        {/* Submit button */}
        <SkeletonLoader variant="rectangular" height={48} className="w-full" />
      </div>
    </div>
  </div>
);

interface LazyContactFormProps {
  className?: string;
}

const LazyContactForm: React.FC<LazyContactFormProps> = (props) => {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactForm {...props} />
    </Suspense>
  );
};

export default LazyContactForm;
