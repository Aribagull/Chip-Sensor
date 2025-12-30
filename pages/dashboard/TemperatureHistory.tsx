import React from 'react';
import Card from '../../components/ui/Card';
import TemperatureChart from '../../components/dashboard/TemperatureChart';
import Button from '../../components/ui/Button';

const TemperatureHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Temperature History</h1>
      
      {/* Filters */}
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
           <div className="space-y-1.5">
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
             <select className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm focus:ring-primary outline-none"><option>Main Building</option></select>
           </div>
           <div className="space-y-1.5">
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Sub-Store</label>
             <select className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm focus:ring-primary outline-none"><option>Blood Bank Freezer</option></select>
           </div>
           <div className="space-y-1.5">
             <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Date Range</label>
             <select className="block w-full border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm focus:ring-primary outline-none"><option>Last 24 Hours</option></select>
           </div>
           <Button>Update View</Button>
        </div>
      </Card>

      {/* Chart */}
      <Card title="Temperature Trend" className="h-96">
         <div className="h-full pb-8">
            <TemperatureChart />
         </div>
      </Card>

      {/* Table */}
      <Card title="Detailed Logs" noPadding>
        <div className="overflow-x-auto rounded-b-2xl">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Timestamp</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Probe 1</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Probe 2</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
               {[...Array(5)].map((_, i) => (
                 <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                   <td className="px-6 py-4 text-gray-900 dark:text-gray-200">Mar 10, {10-i}:00 AM</td>
                   <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-mono">-2.{i}°F</td>
                   <td className="px-6 py-4 text-gray-900 dark:text-gray-200 font-mono">0.{i}°F</td>
                   <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Normal
                      </span>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TemperatureHistory;