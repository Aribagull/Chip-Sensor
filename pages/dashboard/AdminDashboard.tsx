import React, { useEffect, useState } from "react";
import { adminAnalytics } from "../../Api/admin/dashboard";
import {
  Users, MapPin, Thermometer, Bell, ClipboardList, AlertTriangle,
  ArrowRight, TrendingUp, TrendingDown, Activity, CheckCircle2,
  Clock, ChevronRight, Zap, Shield, Mail, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerChart from "./charts/CustomerChart";
import DoughnutChart from "./charts/DoughnutChart";




interface CustomerAlert {
  customerName: string;
  totalAlerts: number;
  totalSms: number;
  totalEmail: number;
  last24h: number;
}


const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overall, setOverall] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [chartRange, setChartRange] = useState<'7days' | '30days'>('7days');


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await adminAnalytics();

        setCustomers(data.customers);
        setOverall(data.overall);
      } catch (err: any) {
        setError(err.message || 'Dashboard load failed');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);


const customerAlerts: CustomerAlert[] = customers.map(c => ({
  customerName: c.name,
  totalAlerts: c.totalNotificationsSent,
  totalSms: c.totalSmsSent,
  totalEmail: c.totalEmailSent,
  last24h: c.notificationsLast24h
}));



  const totalCustomers = overall?.totalCustomers ?? 0;
  const totalLocations = overall?.totalStores ?? 0;
  const totalSubStores = overall?.totalSubStores ?? 0;
  const totalSensors = overall?.totalSensors ?? 0;

  const sensorsOnline = overall?.activeSensors ?? 0;
  const pendingRequests = overall?.pendingRequests ?? 0;
  const alertsLast24h = overall?.alertsLast24h ?? 0;
  const totalAlerts = overall?.totalAlerts ?? 0;
  const totalEmailAlerts = overall?.totalEmailAlerts ?? 0;
  const totalSmsAlerts = overall?.totalSmsAlerts ?? 0;
  const totalRequests = overall?.totalRequests ?? 0;
  const inactiveSensors = overall?.inactiveSensors ?? 0;
  const activeSensors = overall?.activeSensors ?? 0;


  // last 30 days (example)
  const last30DaysCustomers = Array.from({ length: 30 }, (_, i) => ({
    date: `2026-01-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    count: Math.floor(Math.random() * 15) + 1,
  }));

  // chart data now only last 30 days
  const chartData = last30DaysCustomers;




  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 pb-8">

      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 lg:p-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Welcome Text */}
            <div>
              <p className="text-blue-400 font-medium mb-1">{getGreeting()}, Admin</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                System Overview
              </h1>
              <p className="text-slate-400 max-w-md">
                Monitor all customer systems, manage requests, and resolve alerts from one place.
              </p>
            </div>

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {sensorsOnline}/{totalSensors}
                  </p>

                  <p className="text-xs text-slate-400">Sensors Online</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

        {/* Customers */}
        <StatCard
          label="Customers"
          value={totalCustomers}
          icon={Users}
          trend="Total customers"
          trendUp={true}
          color="blue"
        />

        {/* Locations */}
        <StatCard
          label="Locations"
          value={totalLocations}
          icon={MapPin}
          trend="Total stores"
          trendUp={true}
          color="indigo"
        />

        {/* Sub-Stores */}
        <StatCard
          label="Sub-Stores"
          value={totalSubStores}
          icon={Thermometer}
          trend="All substores"
          trendUp={true}
          color="purple"
        />

        {/* Sensors Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-5 lg:p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sensors</p>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Total Sensors</span>
              <span className="text-gray-700 dark:text-gray-300">{totalSensors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-600 dark:text-green-400">Active Sensors</span>
              <span className="text-gray-700 dark:text-gray-300">{activeSensors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-red-600 dark:text-red-400">Inactive Sensors</span>
              <span className="text-gray-700 dark:text-gray-300">{inactiveSensors}</span>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-5 lg:p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alerts</p>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Total Alerts</span>
              <span className="text-gray-700 dark:text-gray-300">{totalAlerts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Email Alerts</span>
              <span className="text-gray-700 dark:text-gray-300">{totalEmailAlerts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-600 dark:text-green-400">SMS Alerts</span>
              <span className="text-gray-700 dark:text-gray-300">{totalSmsAlerts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-orange-600 dark:text-orange-400">Last 24h</span>
              <span className="text-gray-700 dark:text-gray-300">{alertsLast24h}</span>
            </div>
          </div>
        </div>

        {/* Requests Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-5 lg:p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Requests</p>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-orange-600 dark:text-orange-400">Pending Requests</span>
              <span className="text-gray-700 dark:text-gray-300">{pendingRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Total Requests</span>
              <span className="text-gray-700 dark:text-gray-300">{totalRequests}</span>
            </div>
          </div>
        </div>

      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

        {/* Active Alerts - Takes 2 columns */}
        <div className="xl:col-span-2 space-y-4">
          {/* <div className="mt-8 space-y-6 xl:col-span-2">
            <CustomerChart data={chartData} title="Customers Last 30 Days" />
          </div> */}



          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md ">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Active Alerts</h3>
            <div className="flex gap-6">
              {/* Right side: Alerts List */}
             <div
  className={`w-2/3 space-y-3 ${customers.length > 10 ? 'max-h-96 overflow-y-auto' : ''}`}
>
  {customers.map((c, idx) => {
    const bgColors = [
      "bg-red-50 dark:bg-red-900/20",
      "bg-yellow-50 dark:bg-yellow-900/20",
      "bg-blue-50 dark:bg-blue-900/20"
    ];

    return (
      <div
        key={c._id}
        className={`p-3 rounded-xl flex justify-between items-start hover:shadow-md transition ${bgColors[idx % bgColors.length]}`}
      >
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {c.name} → {c.totalSubStores} Sub-Stores
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Total Alerts: {c.totalNotificationsSent}, SMS: {c.totalSmsSent}, Email: {c.totalEmailSent}
          </p>
        </div>

        <div className="flex flex-col items-end text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3 mb-1" />
          Last 24h: {c.notificationsLast24h}
        </div>
      </div>
    );
  })}
</div>


              {/* Left side: Doughnut Chart */}
              <div className="w-1/3 flex flex-col items-center justify-center">
                <DoughnutChart 
  totalAlerts={overall?.totalAlerts ?? 0} 
  totalSmsAlerts={overall?.totalSmsAlerts ?? 0} 
  totalEmailAlerts={overall?.totalEmailAlerts ?? 0} 
/>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Alerts Summary
                </p>
              </div>

            </div>
          </div>



        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h2>
          </div>

          <div className="space-y-3">
            <QuickActionCard
              to="/admin/requests"
              icon={ClipboardList}
              title="Review Requests"
              description={`${pendingRequests} pending`}
              color="orange"
              badge={pendingRequests}
            />
            <QuickActionCard
              to="/admin/alerts"
              icon={AlertTriangle}
              title="Manage Alerts"
              description="View & resolve"
              color="red"
            />
            <QuickActionCard
              to="/admin/sensors"
              icon={Thermometer}
              title="All Sensors"
              description="Assign & monitor"
              color="blue"
            />
            <QuickActionCard
              to="/admin/customers"
              icon={Users}
              title="Customers"
              description="Manage accounts"
              color="green"
            />
            <QuickActionCard
              to="/admin/locations"
              icon={MapPin}
              title="All Locations"
              description="View hierarchy"
              color="indigo"
            />
          </div>

          {/* System Status Card */}
          <div className="mt-6 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-gray-900 dark:text-white">System Status</span>
            </div>
            <div className="space-y-3">
              <StatusRow label="API Server" status="operational" />
              <StatusRow label="Database" status="operational" />
              <StatusRow label="Notifications" status="operational" />
              <StatusRow label="Sensor Network" status={sensorsOnline < totalSensors ? 'degraded' : 'operational'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
  color: 'blue' | 'indigo' | 'purple' | 'orange' | 'green';
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, trendUp, color, highlight }) => {
  const colorStyles = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
  };

  const bgStyles = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    orange: 'bg-orange-50 dark:bg-orange-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
  };

  return (
    <div className={`relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-5 lg:p-6 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 ${highlight ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-slate-900' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorStyles[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-3 flex items-center text-sm">
        {trendUp ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-orange-500 mr-1" />
        )}
        <span className={trendUp ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
          {trend}
        </span>
      </div>
    </div>
  );
};

// Alert Card Component
interface AlertCardProps {
  alert: any;
  index: number;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, index }) => {
  const levelConfig = {
    1: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/50', badge: 'bg-red-500', label: 'Critical' },
    2: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800/50', badge: 'bg-orange-500', label: 'Warning' },
    3: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800/50', badge: 'bg-yellow-500', label: 'Notice' },
  };

  const config = levelConfig[alert.level as keyof typeof levelConfig] || levelConfig[3];

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-xl p-4 hover:shadow-md transition-all duration-300 animate-fadeIn`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className={`w-2 h-2 ${config.badge} rounded-full mt-2 flex-shrink-0 animate-pulse`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {alert.customerName}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge} text-white`}>
                {config.label}
              </span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white truncate">
              {alert.locationName} → {alert.subStoreName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{alert.issue}</p>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
          <Clock className="w-3 h-3 mr-1" />
          {alert.timeAgo}
        </div>
      </div>
    </div>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  to: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: 'orange' | 'red' | 'blue' | 'green' | 'indigo';
  badge?: number;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ to, icon: Icon, title, description, color, badge }) => {
  const colorStyles = {
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white',
  };

  return (
    <Link to={to} className="group block">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 hover:border-gray-200 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300 flex items-center space-x-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${colorStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
              {title}
            </p>
            {badge !== undefined && badge > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

// Status Row Component
interface StatusRowProps {
  label: string;
  status: 'operational' | 'degraded' | 'down';
}

const StatusRow: React.FC<StatusRowProps> = ({ label, status }) => {
  const statusConfig = {
    operational: { color: 'bg-green-500', text: 'text-green-600 dark:text-green-400', label: 'Operational' },
    degraded: { color: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400', label: 'Degraded' },
    down: { color: 'bg-red-500', text: 'text-red-600 dark:text-red-400', label: 'Down' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 ${config.color} rounded-full ${status === 'operational' ? '' : 'animate-pulse'}`} />
        <span className={`font-medium ${config.text}`}>{config.label}</span>
      </div>
    </div>
  );
};

export default AdminDashboard;