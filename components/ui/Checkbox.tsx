import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer ${className}`}
        {...props}
      />
      <label htmlFor={id} className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-200 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;