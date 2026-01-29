import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'outline' | 'text';
  size?: 'large' | 'small';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'fill',
  size = 'large',
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'group relative font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 overflow-hidden rounded-lg inline-flex items-center justify-center';
  
  const sizeClasses = {
    large: 'text-base px-6 py-3',
    small: 'text-sm px-4 py-2.5'
  };
  
  const variantClasses = {
    fill: {
      default: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 dark:active:bg-orange-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25',
      disabled: 'bg-gray-400 text-white cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
    },
    outline: {
      default: 'border-2 border-orange-500 text-orange-500 bg-transparent dark:border-orange-400 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white active:bg-orange-600 dark:active:bg-orange-600 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25',
      disabled: 'border-2 border-gray-300 text-gray-400 bg-transparent dark:border-gray-600 dark:text-gray-500 cursor-not-allowed'
    },
    text: {
      default: 'text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 hover:underline active:text-orange-700 dark:active:text-orange-200',
      disabled: 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
    }
  };
  
  const isDisabled = disabled;
  const variantKey = isDisabled ? 'disabled' : 'default';
  
  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant][variantKey]}
    ${className}
  `.trim();
  
  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Shine effect for fill and outline buttons */}
      {(variant === 'fill' || variant === 'outline') && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
      )}
      {/* Ripple effect */}
      {!isDisabled && (
        <div className="absolute inset-0 bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150 rounded-md"></div>
      )}
    </button>
  );
};

export default Button;
