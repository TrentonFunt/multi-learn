import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: 'blue' | 'green' | 'red' | 'purple';
  ariaLabel?: string;
}

const colorVariants = {
  blue: 'peer-focus:ring-blue-300 peer-checked:bg-blue-600',
  green: 'peer-focus:ring-green-300 peer-checked:bg-green-600',
  red: 'peer-focus:ring-red-300 peer-checked:bg-red-600',
  purple: 'peer-focus:ring-purple-300 peer-checked:bg-purple-600'
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  checked, 
  onChange, 
  color = 'blue',
  ariaLabel 
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
        aria-label={ariaLabel}
      />
      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${colorVariants[color]} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
    </label>
  );
};

export default ToggleSwitch;
