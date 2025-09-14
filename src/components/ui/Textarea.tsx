import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  size?: 'large' | 'small';
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  size = 'large',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    large: 'text-input-lg px-6 py-2.5',
    small: 'text-input-sm px-4 py-2.5'
  };
  
  const baseClasses = `
    w-full border rounded-input transition-colors resize-vertical
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    ${sizeClasses[size]}
  `;
  
  const stateClasses = error
    ? 'border-status-danger text-status-danger focus:ring-status-danger'
    : 'border-neutral-white-grey text-absolute-black focus:ring-primary';
  
  const placeholderClasses = 'placeholder-neutral-grey';
  
  const classes = `
    ${baseClasses}
    ${stateClasses}
    ${placeholderClasses}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-absolute-black mb-2">
          {label}
        </label>
      )}
      <textarea
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
