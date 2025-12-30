import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertLevel } from '../../types';

interface AlertItemProps {
  alert: Alert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const getIcon = (level: AlertLevel) => {
    switch (level) {
      case 1: return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 2: return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 3: return <Info className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getBadgeClass = (level: AlertLevel) => {
    switch (level) {
      case 1: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 2: return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 3: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getBorderColor = (level: AlertLevel) => {
      switch (level) {
      case 1: return 'border-l-red-500';
      case 2: return 'border-l-orange-500';
      case 3: return 'border-l-yellow-500';
    }
  }

  return (
    <div className={`flex items-start space-x-4 p-5 bg-white dark:bg-slate-800 border-l-4 ${getBorderColor(alert.level)} rounded-r-xl shadow-soft dark:shadow-none hover:shadow-md transition-shadow`}>
      <div className="flex-shrink-0 mt-1">
        {getIcon(alert.level)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {alert.locationName} <span className="text-gray-400 px-1">/</span> {alert.subStoreName}
          </p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getBadgeClass(alert.level)}`}>
            Level {alert.level}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{alert.message}</p>
        <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-wide">{alert.timestamp}</p>
      </div>
    </div>
  );
};

export default AlertItem;