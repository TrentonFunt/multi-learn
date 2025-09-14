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
  const baseClasses = 'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';
  
  const sizeClasses = {
    large: 'text-button-lg px-6 py-2.5',
    small: 'text-button-sm px-4 py-2.5'
  };
  
  const variantClasses = {
    fill: {
      default: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed',
      disabled: 'bg-neutral-grey text-white cursor-not-allowed'
    },
    outline: {
      default: 'border border-primary text-primary bg-white hover:bg-primary hover:text-white active:bg-primary-pressed',
      disabled: 'border border-neutral-grey text-neutral-grey bg-neutral-white-grey cursor-not-allowed'
    },
    text: {
      default: 'text-primary hover:underline active:text-primary-pressed',
      disabled: 'text-neutral-grey cursor-not-allowed'
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
      {children}
    </button>
  );
};

export default Button;
