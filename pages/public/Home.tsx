import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Thermometer, Wrench, ShoppingCart, Activity, 
  ArrowRight, CheckCircle2, Shield, Clock, Phone,
  Snowflake, Users, Building2, Zap, ChevronRight,
  Star, PlayCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';

const Home: React.FC = () => {
  const services = [
    {
      title: 'Temperature Monitoring',
      description: '24/7 real-time monitoring with instant alerts via WhatsApp & Email.',
      icon: Thermometer,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance to prevent costly breakdowns and extend equipment life.',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Commercial Sales',
      description: 'Top-of-the-line commercial refrigeration equipment and installation.',
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Expert Repair',
      description: 'Fast, reliable repair services for all major brands and models.',
      icon: Wrench,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  const stats = [
    { value: '500+', label: 'Clients Served', icon: Users },
    { value: '10K+', label: 'Sensors Active', icon: Thermometer },
    { value: '99.9%', label: 'Uptime', icon: Zap },
    { value: '24/7', label: 'Monitoring', icon: Clock },
  ];

  const features = [
    'Real-time temperature tracking',
    'Instant WhatsApp & Email alerts',
    'Multi-location management',
    'Detailed analytics & reports',
    'Mobile-friendly dashboard',
    'Easy sensor installation',
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Snowflake className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="text-sm text-cyan-100 font-medium">Trusted by 500+ businesses</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Professional
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Refrigeration Solutions
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100/80 max-w-xl mb-8 leading-relaxed">
                Keep your cool with our advanced monitoring systems, expert maintenance, and 24/7 support. Protect your inventory with real-time alerts.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/new-customer">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-2xl shadow-white/20 group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/existing-customer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-xl backdrop-blur-sm">
                    Existing Customer
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-blue-200/70">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
                  Free Consultation
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-cyan-400 mr-2" />
                  24/7 Support
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-400 mr-2" />
                  Quick Setup
                </div>
              </div>
            </div>

            {/* Right Content - Feature Card */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 font-semibold">Live Monitoring</span>
                    </div>
                    <span className="text-white/60 text-sm">Updated now</span>
                  </div>

                  {/* Mock Dashboard Preview */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80">Main Freezer</span>
                        <span className="text-green-400 font-mono font-bold">-5°F</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80">Walk-in Cooler</span>
                        <span className="text-green-400 font-mono font-bold">38°F</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80">Blood Bank Unit</span>
                        <span className="text-cyan-400 font-mono font-bold">2°F</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border-2 border-white/20" />
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white/20" />
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full border-2 border-white/20" />
                    </div>
                    <span className="text-white/60 text-sm">3 locations monitored</span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold">All Systems OK</span>
                </div>

                {/* Floating Alert Card */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-2xl border border-gray-100 dark:border-slate-700 max-w-[200px]">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Alert Sent</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">WhatsApp notification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-slate-900"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 relative -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Cooling Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to keep your refrigeration systems running at peak performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-primary dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Advanced Monitoring Made Simple
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our state-of-the-art system ensures your refrigeration units are always operating within safe parameters, protecting your valuable inventory.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/new-customer">
                  <Button size="lg" className="font-bold rounded-xl">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-3xl p-8 lg:p-12">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-slate-700">
                  {/* Mock App Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Snowflake className="w-8 h-8 text-primary" />
                      <span className="font-bold text-gray-900 dark:text-white">A Cooler Dashboard</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                  </div>

                  {/* Mock Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sensors</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">100%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Alerts</p>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="h-32 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-900/20 rounded-xl flex items-end justify-around px-4 pb-4">
                    {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 70].map((height, i) => (
                      <div 
                        key={i}
                        className="w-4 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border border-gray-100 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">99.9% Uptime</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses who trust A Cooler Solutions for their refrigeration monitoring needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/new-customer">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl">
                Get Started Now
              </Button>
            </Link>
            <a href="tel:+15551234567">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-lg rounded-xl">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Need to import Bell for the floating card
import { Bell } from 'lucide-react';

export default Home;