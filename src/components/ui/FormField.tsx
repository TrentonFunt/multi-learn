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
