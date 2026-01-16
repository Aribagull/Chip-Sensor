import React, { useEffect, useState } from 'react';
import {
  Store, MapPin,
  Database,
  Thermometer,
  Bell,
  Mail,
  MessageSquare,
  ClipboardList,
  CheckCircle, AlertTriangle,
  XCircle, ChevronRight
} from "lucide-react";

import StatCard from '../../components/dashboard/StatCard';
import AlertItem from '../../components/dashboard/AlertItem';
import Card from '../../components/ui/Card';
import { mockAlerts, mockLocations } from '../../utils/mockData';
import { Link } from 'react-router-dom';
import { getMyStores } from '../../Api/Stores/store';
import { customerAnalytics } from '../../Api/admin/dashboard';





const CustomerDashboard: React.FC = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getMyStores();
        setStores(data.stores || []);
      } catch (err) {
        console.error("Failed to fetch stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeData = await getMyStores();
        setStores(storeData.stores || []);
        const analyticsData = await customerAnalytics();
        setAnalytics(analyticsData.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const analyticsCards = [
    { label: "Total Stores", value: analytics?.totalStores, icon: MapPin },
    { label: "Total Sub-Stores", value: analytics?.totalSubStores, icon: Database },
    { label: "Total Sensors", value: analytics?.totalSensors, icon: Thermometer },
    { label: "Active Sensors", value: analytics?.activeSensors, icon: Thermometer },
    { label: "Inactive Sensors", value: analytics?.inactiveSensors, icon: Thermometer },

    { label: "Total Alerts", value: analytics?.totalAlerts, icon: Bell },
    { label: "Alerts (24h)", value: analytics?.alertsLast24h, icon: Bell },
    { label: "Alerts (7 Days)", value: analytics?.alertsLast7Days, icon: Bell },
    { label: "Alerts (30 Days)", value: analytics?.alertsLast30Days, icon: Bell },

    { label: "Email Alerts", value: analytics?.totalEmailAlerts, icon: Mail },
    { label: "SMS Alerts", value: analytics?.totalSmsAlerts, icon: MessageSquare },

    { label: "Total Requests", value: analytics?.totalRequests, icon: ClipboardList },
    { label: "Approved Requests", value: analytics?.approvedRequests, icon: CheckCircle },
    { label: "Rejected Requests", value: analytics?.rejectedRequests, icon: XCircle },
  ];


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening with your cooling systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Locations Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Locations
            </h3>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
              <Store className="h-5 w-5" />
            </div>

          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-yellow-500">Total Stores</span>
              <span className="font-semibold">{analytics?.totalStores ?? 0}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-yellow-500">Total Sub-Stores</span>
              <span className="font-semibold">{analytics?.totalSubStores ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Sensors Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Sensors
            </h3>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg">
              <Thermometer className="h-5 w-5" />
            </div>

          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Total Sensors</span>
              <span className="font-semibold">{analytics?.totalSensors ?? 0}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Active Sensors</span>
              <span className="font-semibold ttext-gray-400">
                {analytics?.activeSensors ?? 0}
              </span>
            </div>
           <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Inactive Sensors</span>
              <span className="font-semibold text-gray-400">
                {analytics?.inactiveSensors ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Alerts
            </h3>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="h-5 w-5" />
            </div>

          </div>

          <div className="space-y-2 text-sm">
           <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Total Alerts</span>
              <span className="font-semibold">{analytics?.totalAlerts ?? 0}</span>
            </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Email Alerts</span>
              <span className="font-semibold">{analytics?.totalEmailAlerts ?? 0}</span>
            </div>
           <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">SMS Alerts</span>
              <span className="font-semibold">{analytics?.totalSmsAlerts ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Requests Card */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Requests
            </h3>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <ClipboardList className="h-5 w-5" />
            </div>

          </div>

          <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Total Requests</span>
              <span className="font-semibold">{analytics?.totalRequests ?? 0}</span>
            </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Approved</span>
              <span className="font-semibold text-gray-400">
                {analytics?.approvedRequests ?? 0}
              </span>
            </div>
 <div className="flex items-center justify-between px-3 py-2 rounded-lg 
bg-gray-50 dark:bg-slate-700/40">

              <span className="text-gray-300">Rejected</span>
              <span className="font-semibold text-gray-400">
                {analytics?.rejectedRequests ?? 0}
              </span>
            </div>
          </div>
        </div>

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
              {loading ? (
                <p className="p-5 text-center text-gray-500"></p>
              ) : (
                stores.map(store =>
                  store.subStores.map(sub => (
                    <Link
                      to={`/dashboard/locations/${store._id}/substores/${sub._id}`}
                      key={sub._id}
                      state={{ storeName: store.storeName, subStoreName: sub.name }}
                      className="block hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors p-5 group"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${sub.status === 'good' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                            sub.status === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                            <MapPin className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-base">{sub.name}</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{sub.sensors?.length || 0} Active Sensor</p>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))
                )
              )}
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