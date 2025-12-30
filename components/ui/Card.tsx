import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, noPadding = false }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-soft dark:shadow-none border border-gray-100 dark:border-slate-700 transition-colors duration-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export default Card;