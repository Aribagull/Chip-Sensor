import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center">
      <button
        id={id}
        type="button"
        className={`${
          checked ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
      {label && (
        <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;