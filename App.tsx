import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/public/Home';
import NewCustomer from './pages/public/NewCustomer';
import ExistingCustomer from './pages/public/ExistingCustomer';
import Login from './pages/auth/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import Card from './components/ui/Card';
import { ThemeProvider } from './components/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Customer Dashboard Pages
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import Locations from './pages/dashboard/Locations';
import LocationDetail from './pages/dashboard/LocationDetail';
import MyRequests from './pages/dashboard/MyRequests';
import Sensors from './pages/dashboard/Sensors';
import TemperatureHistory from './pages/dashboard/TemperatureHistory';
import Settings from './pages/dashboard/Settings';

// Admin Dashboard Pages
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Customers from './pages/dashboard/admin/Customers';
import AdminLocations from './pages/dashboard/admin/AdminLocations';
import AdminSensors from './pages/dashboard/admin/AdminSensors';
import SensorRequests from './pages/dashboard/admin/SensorRequests';
import AllAlerts from './pages/dashboard/admin/AllAlerts';
import NotificationStats from './pages/dashboard/admin/NotificationStats';
import AdminSettings from './pages/dashboard/admin/AdminSettings';
import Unauthorized from './pages/Unauthorized';
import AdminSubStores from './pages/dashboard/admin/AdminSubStores';
import SensorDetails from './components/SensorDetails';

// Wrapper for Public Pages
const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (

    <ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          borderLeft: "6px solid #2563eb",
        }}
        progressStyle={{
          background: "#2563eb",
        }}
      />

      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-customer" element={<NewCustomer />} />
            <Route path="/existing-customer" element={<ExistingCustomer />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login initialAdmin={false} />} />
          <Route path="/admin/login" element={<Login initialAdmin={true} />} />

          {/* Customer Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout role="customer" />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="locations" element={<Locations />} />
            <Route path="locations/:id" element={<LocationDetail />} />
            <Route
              path="locations/:storeId/substores/:subStoreId"
              element={<LocationDetail />}
            />
             <Route path="/dashboard/sensors/sensor/:sensorId" element={<SensorDetails/>} />
            <Route path="sensors" element={<Sensors />} />
            <Route path="history" element={<TemperatureHistory />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="locations" element={<AdminLocations />} />
            <Route path="/admin/locations/:storeId" element={<AdminSubStores />} />


            <Route path="locations/:id" element={<LocationDetail />} />
            <Route path="/admin/sensors/sensor/:sensorId" element={<SensorDetails/>} />
            <Route path="sensors" element={<AdminSensors />} />
            <Route path="requests" element={<SensorRequests />} />
            <Route path="alerts" element={<AllAlerts />} />
            <Route path="stats" element={<NotificationStats />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;