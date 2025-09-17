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
  const baseClasses = 'group relative font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden';
  
  const sizeClasses = {
    large: 'text-lg px-6 py-2.5',
    small: 'text-sm px-4 py-2.5'
  };
  
  const variantClasses = {
    fill: {
      default: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/25',
      disabled: 'bg-gray-400 text-white cursor-not-allowed'
    },
    outline: {
      default: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white active:bg-blue-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/25',
      disabled: 'border border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed'
    },
    text: {
      default: 'text-blue-600 hover:underline active:text-blue-800 hover:scale-105 active:scale-95',
      disabled: 'text-gray-500 cursor-not-allowed'
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
