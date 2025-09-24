import React, { useState } from 'react';
import { validateField } from '../../utils/validation';
import type { ValidationRule } from '../../utils/validation';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  rules?: ValidationRule;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  rules,
  error: externalError,
  required = false,
  disabled = false,
  className = '',
  rows = 4
}) => {
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const error = externalError || internalError;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (touched && rules) {
      const validationError = validateField(newValue, rules);
      setInternalError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (rules) {
      const validationError = validateField(value, rules);
      setInternalError(validationError);
    }
    onBlur?.();
  };

  const baseClasses = `
    w-full px-4 py-3 border rounded-input transition-colors
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    disabled:bg-neutral-white-grey disabled:cursor-not-allowed
    ${className}
  `;

  const stateClasses = error
    ? 'border-status-danger text-status-danger focus:ring-status-danger'
    : 'border-neutral-white-grey text-absolute-black focus:ring-primary';

  const placeholderClasses = 'placeholder-neutral-grey';

  const inputClasses = `${baseClasses} ${stateClasses} ${placeholderClasses}`;

  // Determine autocomplete attribute based on name and type
  const getAutocompleteValue = (): string => {
    const nameLower = name.toLowerCase();
    const typeLower = type?.toLowerCase();
    
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
      <label htmlFor={name} className="block text-sm font-medium text-absolute-black mb-2">
        {label}
        {required && <span className="text-status-danger ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          autoComplete={getAutocompleteValue()}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={getAutocompleteValue()}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-status-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
