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
  id,
  name,
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
  
  // Generate unique id if not provided
  const inputId = id || (name ? `input-${name}` : `input-${Math.random().toString(36).substr(2, 9)}`);
  
  // Determine autocomplete attribute based on name and type
  const getAutocompleteValue = (): string => {
    if (props.autoComplete) return props.autoComplete;
    
    const nameLower = (name || '').toLowerCase();
    const typeLower = (props.type || '').toLowerCase();
    
    if (nameLower.includes('email') || typeLower === 'email') return 'email';
    if (nameLower.includes('password')) return 'current-password';
    if (nameLower.includes('confirm') && nameLower.includes('password')) return 'new-password';
    if (nameLower.includes('new') && nameLower.includes('password')) return 'new-password';
    if (nameLower.includes('firstname') || nameLower.includes('first_name')) return 'given-name';
    if (nameLower.includes('lastname') || nameLower.includes('last_name')) return 'family-name';
    if (nameLower.includes('fullname') || nameLower.includes('full_name')) return 'name';
    if (nameLower.includes('phone') || typeLower === 'tel') return 'tel';
    if (nameLower.includes('username')) return 'username';
    if (nameLower.includes('organization') || nameLower.includes('company')) return 'organization';
    if (nameLower.includes('address')) return 'address-line1';
    if (nameLower.includes('city')) return 'address-level2';
    if (nameLower.includes('state') || nameLower.includes('province')) return 'address-level1';
    if (nameLower.includes('zip') || nameLower.includes('postal')) return 'postal-code';
    if (nameLower.includes('country')) return 'country';
    if (nameLower.includes('birthday') || nameLower.includes('birth_date')) return 'bday';
    if (nameLower.includes('url') || nameLower.includes('website')) return 'url';
    
    return 'on';
  };
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={classes}
        autoComplete={getAutocompleteValue()}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
