import React from 'react';
import { Shield } from 'lucide-react';
import { getPasswordStrengthColor, getPasswordStrengthText } from '../../utils/passwordValidation';

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ validation }) => {
  const requirements = [
    { text: 'At least 8 characters', error: 'Password must be at least 8 characters long' },
    { text: 'One uppercase letter', error: 'Password must contain at least one uppercase letter' },
    { text: 'One lowercase letter', error: 'Password must contain at least one lowercase letter' },
    { text: 'One number', error: 'Password must contain at least one number' },
    { text: 'One special character', error: 'Password must contain at least one special character' },
  ];

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-1">
        <Shield className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</span>
        <span className={`text-sm px-2 py-1 rounded-full ${getPasswordStrengthColor(validation.strength)}`}>
          {getPasswordStrengthText(validation.strength)}
        </span>
      </div>
      
      {/* Password Requirements */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        {requirements.map(({ text, error }) => {
          const hasError = validation.errors.includes(error);
          return (
            <div key={error} className={`flex items-center space-x-1 ${hasError ? 'text-red-500' : 'text-green-500'}`}>
              <div className={`w-2 h-2 rounded-full ${hasError ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
