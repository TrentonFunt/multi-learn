import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback = <div className="h-64 bg-neutral-white-grey rounded-card animate-pulse" />,
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};

// Lazy load wrapper for images
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallback = <div className="bg-neutral-white-grey rounded animate-pulse" />,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <LazyLoad fallback={fallback}>
      {hasError ? (
        <div className={`bg-neutral-white-grey rounded flex items-center justify-center ${className}`}>
          <span className="text-neutral-grey text-sm">Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </LazyLoad>
  );
};

// Lazy load wrapper for components
export const LazyComponent: React.FC<{
  component: React.ComponentType<any>;
  props?: any;
  fallback?: ReactNode;
  className?: string;
}> = ({ component: Component, props = {}, fallback, className = '' }) => (
  <LazyLoad fallback={fallback} className={className}>
    <Component {...props} />
  </LazyLoad>
);

export default LazyLoad;
