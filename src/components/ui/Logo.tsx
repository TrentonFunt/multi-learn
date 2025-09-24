import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  href = '/',
  onClick 
}) => {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      icon: 'text-sm',
      text: 'text-lg'
    },
    md: {
      container: 'w-10 h-10',
      icon: 'text-xl',
      text: 'text-2xl'
    },
    lg: {
      container: 'w-12 h-12',
      icon: 'text-2xl',
      text: 'text-3xl'
    },
    xl: {
      container: 'w-16 h-16',
      icon: 'text-3xl',
      text: 'text-4xl'
    }
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size].container} bg-blue-600 rounded-lg flex items-center justify-center`}>
        <span className={`text-white font-exo font-semibold ${sizeClasses[size].icon}`}>M</span>
      </div>
      {showText && (
        <span className={`font-exo font-semibold text-gray-900 dark:text-gray-100 ${sizeClasses[size].text}`}>
          MultiLearn
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
        {logoContent}
      </button>
    );
  }

  return (
    <Link to={href} className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
      {logoContent}
    </Link>
  );
};

export default Logo;
