import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from "../../Api/authonticationUser";
import { getUserProfile } from "../../Api/authonticationUser";
import { getAllRequests } from '../../Api/Sensors/sensorrequests';
import { toast } from 'react-toastify';
import logo from '../../Assets/Logo/logo.png';
import {
  LayoutDashboard,
  MapPin,
  Thermometer,
  History,
  FileText,
  Settings,
  Users,
  Bell,
  BarChart2,
  LogOut,
  X,
  Snowflake,
  ChevronRight
} from 'lucide-react';
import { UserRole, NavItem } from '../../types';
import { useUser } from "../../context/UserContext";

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [requestCount, setRequestCount] = useState(0);
  const { user, setUser } = useUser();

useEffect(() => {
  const fetchProfile = async () => {
    const data = await getUserProfile();
    if (data.success) setUser(data.user);
  };
  fetchProfile();
}, []); 



  useEffect(() => {
    const fetchRequestsCount = async () => {
      try {
        const data = await getAllRequests("pending");
        setRequestCount(data.length);
      } catch (err) {
        console.error("Failed to fetch requests count:", err);
      }
    };

    if (role === "admin") fetchRequestsCount();
  }, [role]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err: any) {
      console.error("Logout failed:", err.message);
      toast.error(err.message || "Logout failed. Try again.");
    }
  };
  const customerLinks: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Locations', href: '/dashboard/locations', icon: MapPin },
    { label: 'Sensors', href: '/dashboard/sensors', icon: Thermometer },
    { label: 'Temp History', href: '/dashboard/history', icon: History },
    { label: 'Requests', href: '/dashboard/requests', icon: FileText },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Locations', href: '/admin/locations', icon: MapPin },
    { label: 'Sensors', href: '/admin/sensors', icon: Thermometer },
    { label: 'Requests', href: '/admin/requests', icon: FileText, badge: requestCount },
    { label: 'Alerts', href: '/admin/alerts', icon: Bell },
    { label: 'Reports', href: '/admin/stats', icon: BarChart2 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const links = role === 'admin' ? adminLinks : customerLinks;

  // Modern gradient background
  const baseClasses = `fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-2xl border-r border-slate-800/50`;
  const mobileClasses = isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`${baseClasses} ${mobileClasses} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
           
             <img
                 src={logo}
                 alt="Logo"
                 className="h-12 w-auto "
               />
            
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                {user?.name || (role === 'admin' ? 'Administrator' : 'Customer')}
              </span>

              <span className="text-[10px] text-slate-400 font-medium tracking-wider">
                {user?.email || (role === 'admin' ? 'Admin Workspace' : 'Client Access')}
              </span>

            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-2">
            Main Menu
          </p>
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href.endsWith('dashboard')}
              onClick={() => {
                onClose(); 
                if (window.location.pathname === link.href) {
                  window.dispatchEvent(new Event('refreshCustomers'));
                }
              }}
              
              className={({ isActive }) =>
                `group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${isActive
                  ? 'bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                  )}
                  <link.icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                  <span className="flex-1 tracking-wide">{link.label}</span>
                  {link.badge && (
                    <span className="ml-auto bg-blue-600 text-white py-0.5 px-2 rounded-md text-[10px] font-bold shadow-sm min-w-[20px] text-center">
                      {link.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-4 w-4 text-blue-500/50 ml-2" />}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-slate-800/50 rounded-2xl p-3 border border-white/5 mb-2">
            <div className="flex items-center">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg text-white ${role === 'admin' ? 'bg-gradient-to-br from-purple-600 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-cyan-500'}`}>
                {role === 'admin' ? 'AD' : 'CU'}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-bold text-white truncate leading-none mb-1">
                  {role === 'admin' ? 'Administrator' : 'Valued Customer'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {role === 'admin' ? 'System Control' : 'View Account'}
                </p>
              </div>
            </div>
          </div>
          <NavLink to="/login" onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group">
            <LogOut className="mr-2 h-3 w-3 group-hover:text-red-400 transition-colors" />
            Sign Out
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;