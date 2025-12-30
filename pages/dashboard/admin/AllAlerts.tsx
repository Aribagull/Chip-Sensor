import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { mockAlerts, mockCustomers } from '../../../utils/mockData';

const AllAlerts: React.FC = () => {
  const [customerFilter, setCustomerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(a => {
    const matchCustomer = customerFilter === 'all' || a.customerId === customerFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchCustomer && matchStatus;
  });

  const getIcon = (level: number) => {
     switch(level) {
       case 1: return <AlertCircle className="h-5 w-5 text-red-500" />;
       case 2: return <AlertTriangle className="h-5 w-5 text-orange-500" />;
       default: return <Info className="h-5 w-5 text-yellow-500" />;
     }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Alerts</h1>

      {/* Filters */}
      <Card className="p-5">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Customer</label>
               <select 
                 className="block w-full border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm focus:ring-primary outline-none"
                 value={customerFilter}
                 onChange={(e) => setCustomerFilter(e.target.value)}
               >
                 <option value="all">All Customers</option>
                 {mockCustomers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
               <select 
                 className="block w-full border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow-sm p-2.5 text-sm focus:ring-primary outline-none"
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value)}
               >
                 <option value="all">All Statuses</option>
                 <option value="active">Active</option>
                 <option value="resolved">Resolved</option>
               </select>
            </div>
         </div>
      </Card>

      <Card className="p-0 overflow-hidden border-none shadow-soft dark:shadow-none" noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
             <thead className="bg-gray-50 dark:bg-slate-800/50">
               <tr>
                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Severity</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer / Location</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Issue</th>
                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                 <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                 <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
               </tr>
             </thead>
             <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-100 dark:divide-slate-700">
                {filteredAlerts.map(alert => (
                  <tr key={alert.id} className={`${alert.status === 'resolved' ? 'bg-gray-50/50 dark:bg-slate-800/50 opacity-75' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex items-center">
                         {getIcon(alert.level)}
                         <span className="ml-2 text-sm font-bold text-gray-700 dark:text-gray-300">Level {alert.level}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm font-bold text-gray-900 dark:text-white">{alert.customerName}</div>
                       <div className="text-xs text-gray-500 dark:text-gray-400">{alert.locationName} → {alert.subStoreName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-sm text-gray-700 dark:text-gray-300">{alert.message}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                       {alert.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                       {alert.status === 'active' ? (
                         <Badge variant="danger">Active</Badge>
                       ) : (
                         <Badge variant="success">Resolved</Badge>
                       )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                       {alert.status === 'active' && (
                         <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:border-green-600 dark:text-green-400 dark:border-green-900 dark:hover:bg-green-900/20">
                           <CheckCircle className="h-4 w-4 mr-1" /> Resolve
                         </Button>
                       )}
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

export default AllAlerts;