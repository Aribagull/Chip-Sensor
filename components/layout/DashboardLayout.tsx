import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import { UserRole } from '../../types';
import { useTheme } from '../ThemeContext';
import RoleRoute from '../../ProtectedRoute/RoleRoute';
import ProtectedRoute from '@/ProtectedRoute/ProtectedRoute';


interface DashboardLayoutProps {
  role: UserRole;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

 const getPageTitle = () => {
  const state = location.state as {
    pageTitle?: string;
    storeName?: string;
    sensorName?: string;
  };

 
  if (state?.pageTitle) return state.pageTitle;

  if (state?.sensorName) return state.sensorName;
  if (state?.storeName) return state.storeName;

  const path = location.pathname.split('/').pop() || 'dashboard';

  if (path === 'dashboard') {
    return role === 'admin' ? 'Admin Overview' : 'Dashboard';
  }

  return path.charAt(0).toUpperCase() + path.slice(1);
};




  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden transition-colors duration-200 font-sans">
      <Sidebar 
        role={role} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-20 px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 mr-4 text-gray-500 hover:text-primary focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Search (Hidden on Mobile) */}
            <div className="hidden md:flex relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-gray-400" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary w-64 text-gray-900 dark:text-gray-100 transition-all"
               />
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary bg-gray-100 dark:bg-slate-800 rounded-xl transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <button className="p-2 relative text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary bg-gray-100 dark:bg-slate-800 rounded-xl transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800" />
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 hidden md:block"></div>
            
            <div className="flex items-center">
               <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${role === 'admin' ? 'bg-indigo-600' : 'bg-primary'}`}>
                 {role === 'admin' ? 'A' : 'C'}
               </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-8xl mx-auto space-y-8 pb-10">
            <ProtectedRoute>
             <RoleRoute role={role}>
      <Outlet />
    </RoleRoute>
    </ProtectedRoute>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;