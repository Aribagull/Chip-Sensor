import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft dark:shadow-none border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between z-10 relative">
        <div className="space-y-4">
          <div className={`inline-flex p-3 rounded-xl ${
            title.includes('Sensors') ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
            title.includes('Alert') ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
            title.includes('Requests') ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' :
            'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          }`}>
             {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
          </div>
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center pt-4 border-t border-gray-50 dark:border-slate-700/50">
          <span className={`text-sm font-bold flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-xs text-gray-400 ml-2">vs last month</span>
        </div>
      )}

      {/* Decorative Background Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-50 dark:bg-slate-700/20 rounded-full blur-2xl z-0"></div>
    </div>
  );
};

export default StatCard;