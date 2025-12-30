import React from 'react';
import { Thermometer, Bell, MapPin, Database, ChevronRight } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import AlertItem from '../../components/dashboard/AlertItem';
import Card from '../../components/ui/Card';
import { mockAlerts, mockLocations } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section (Optional, nice touch) */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening with your cooling systems.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Locations" 
          value={mockLocations.length} 
          icon={<MapPin className="h-6 w-6" />} 
        />
        <StatCard 
          title="Sub-Stores" 
          value={mockLocations.reduce((acc, loc) => acc + loc.subStores.length, 0)} 
          icon={<Database className="h-6 w-6" />} 
        />
        <StatCard 
          title="Sensors Online" 
          value="20/21" 
          icon={<Thermometer className="h-6 w-6" />} 
          trend="+2" trendUp={true}
        />
        <StatCard 
          title="Notifications" 
          value="14" 
          icon={<Bell className="h-6 w-6" />} 
          trend="-5" trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Alerts</h2>
             <Link to="/dashboard/history" className="text-sm font-semibold text-primary hover:text-primary-hover">View History</Link>
          </div>
          <div className="space-y-4">
            {mockAlerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Locations Quick View */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Locations Status</h2>
          <Card className="p-0 overflow-hidden border-none shadow-soft dark:shadow-none" noPadding>
             <div className="divide-y divide-gray-100 dark:divide-slate-700">
               {mockLocations.map(loc => (
                 <Link to={`/dashboard/locations/${loc.id}`} key={loc.id} className="block hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors p-5 group">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          loc.status === 'good' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                          loc.status === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                           <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-base">{loc.name}</p>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{loc.subStores.length} Monitoring Points</p>
                        </div>
                     </div>
                     <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
                   </div>
                 </Link>
               ))}
             </div>
             <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 text-center">
               <Link to="/dashboard/locations" className="text-sm font-bold text-primary hover:text-primary-dark">View All Locations</Link>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;