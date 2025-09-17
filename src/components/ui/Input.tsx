import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'large' | 'small';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  size = 'large',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    large: 'text-lg px-6 py-2.5',
    small: 'text-sm px-4 py-2.5'
  };
  
  const baseClasses = `
    w-full border rounded-lg transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    hover:border-blue-500/50 focus:scale-[1.02]
    ${sizeClasses[size]}
  `;
  
  const stateClasses = error
    ? 'border-red-500 text-red-600 focus:ring-red-500'
    : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-blue-500';
  
  const placeholderClasses = 'placeholder-gray-500 dark:placeholder-gray-400';
  
  const classes = `
    ${baseClasses}
    ${stateClasses}
    ${placeholderClasses}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </label>
      )}
      <input
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
