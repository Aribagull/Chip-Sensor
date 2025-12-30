import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Snowflake, Lock, Mail, User, ShieldCheck, ArrowRight, Eye, EyeOff,
  CheckCircle2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { loginUser } from "../../Api/authonticationUser";

interface LoginProps {
  initialAdmin?: boolean;
}

const Login: React.FC<LoginProps> = ({ initialAdmin = false }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(initialAdmin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false); 
const [error, setError] = useState<string | null>(null); 



   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  try {
    const data = await loginUser(email, password);

    if (!data.success) {
      setError(data.message || 'Login failed.');
      setLoading(false);
      return;
    }

    
    if (!data.user || !data.token) {
      setError(data.message || 'Login requires action (e.g., change password).');
      setLoading(false);
      return;
    }

    const role = data.user.role;

    if ((isAdmin && role !== 'admin') || (!isAdmin && role !== 'customer')) {
      setError(`Invalid credentials for the selected role.`);
      setLoading(false);
      return;
    }


    localStorage.setItem('token', data.token);
    localStorage.setItem('role', role);


    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }

  } catch (err: any) {
    console.error('Login failed:', err);
    setError(err.message || 'Login failed. Try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center mb-8 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              isAdmin 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
                : 'bg-gradient-to-br from-blue-600 to-cyan-500'
            }`}>
              <Snowflake className="w-8 h-8 text-white" />
            </div>
          </Link>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isAdmin ? 'Admin Portal' : 'Welcome Back'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {isAdmin ? 'Restricted access for administrators' : 'Sign in to your dashboard'}
            </p>
            {error && (
  <div className="mt-4 text-red-600 text-center font-medium">
    {error}
  </div>
)}
          </div>

          {/* Role Toggle */}
          <div className="bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-8">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setIsAdmin(false)}
                className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  !isAdmin 
                    ? 'bg-white dark:bg-slate-700 text-primary shadow-md' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setIsAdmin(true)}
                className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isAdmin 
                    ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-md' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAdmin ? 'admin@acooler.com' : 'you@company.com'}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${
                  remember 
                    ? 'bg-primary border-primary' 
                    : 'border-gray-300 dark:border-slate-600 group-hover:border-gray-400'
                }`}>
                  {remember && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a 
                href="#" 
                className={`text-sm font-medium ${
                  isAdmin 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' 
                    : 'text-primary hover:text-blue-700'
                }`}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              className={`rounded-xl py-4 font-semibold text-base ${
                isAdmin ? 'bg-slate-900 hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600' : ''
              }`}
            >
              {isAdmin ? 'Access Admin Dashboard' : 'Sign In'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            
          </form>

          {/* Divider & New Customer */}
          {!isAdmin && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                    New to A Cooler Solutions?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/new-customer">
                  <Button variant="outline" fullWidth className="rounded-xl py-3">
                    Create an Account
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="font-medium text-primary hover:text-blue-700">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isAdmin 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
            : 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600'
        }`}>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-white/20">
              {isAdmin ? (
                <ShieldCheck className="w-10 h-10 text-white" />
              ) : (
                <Snowflake className="w-10 h-10 text-white" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              {isAdmin ? 'Admin Control Center' : 'A Cooler Solutions'}
            </h2>
            <p className="text-lg text-white/80 max-w-md mb-8">
              {isAdmin 
                ? 'Manage all customer systems, review requests, and monitor alerts from one central location.'
                : 'Monitor your refrigeration systems 24/7 with real-time alerts and detailed analytics.'
              }
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              {(isAdmin ? [
                'View all customer dashboards',
                'Manage sensor requests',
                'Resolve system alerts',
                'Access notification stats'
              ] : [
                'Real-time temperature monitoring',
                'Instant WhatsApp & Email alerts',
                'Detailed history & reports',
                'Multi-location management'
              ]).map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;