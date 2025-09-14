import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  variant = 'spinner',
  text,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} border-2 border-neutral-white-grey border-t-primary rounded-full animate-spin`} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} bg-primary rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} bg-primary rounded-full animate-pulse`} />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`text-neutral-grey ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Pre-built loading components for common use cases
export const LoadingPage: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-light-grey">
    <Loading size="large" text={text} />
  </div>
);

export const LoadingCard: React.FC<{ text?: string }> = ({ text }) => (
  <div className="bg-absolute-white rounded-card shadow-card p-8">
    <Loading size="medium" text={text} />
  </div>
);

export const LoadingButton: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center space-x-2">
    <Loading size="small" />
    <span className="text-sm text-neutral-grey">{text}</span>
  </div>
);

export default Loading;
