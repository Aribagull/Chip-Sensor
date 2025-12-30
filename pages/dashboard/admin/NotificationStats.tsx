import React from 'react';
import { MessageCircle, Mail, BellRing } from 'lucide-react';
import Card from '../../../components/ui/Card';
import StatCard from '../../../components/dashboard/StatCard';
import { mockStats } from '../../../utils/mockData';

const NotificationStats: React.FC = () => {
  const totalWhatsapp = mockStats.reduce((acc, s) => acc + s.whatsappCount, 0);
  const totalEmail = mockStats.reduce((acc, s) => acc + s.emailCount, 0);
  const totalAll = totalWhatsapp + totalEmail;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Statistics</h1>
        <select className="border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl shadow-sm p-2 text-sm focus:ring-primary outline-none">
          <option>March 2024</option>
          <option>February 2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Notifications" 
          value={totalAll} 
          icon={<BellRing className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
        />
        <StatCard 
          title="WhatsApp Sent" 
          value={totalWhatsapp} 
          icon={<MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />} 
        />
        <StatCard 
          title="Email Sent" 
          value={totalEmail} 
          icon={<Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} 
        />
      </div>

      <Card title="Breakdown by Customer" noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
              {mockStats.map((stat) => (
                <tr key={stat.customerId} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {stat.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-300">
                    {stat.whatsappCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-300">
                    {stat.emailCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900 dark:text-white">
                    {stat.whatsappCount + stat.emailCount}
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

export default NotificationStats;