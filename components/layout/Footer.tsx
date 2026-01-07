import React from 'react';
import { Snowflake, MapPin, Phone, Mail } from 'lucide-react';
import logo from '../../Assets/Logo/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-t from-[#080A14] to-[#0F1B35] text-white pt-14 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-20 w-auto mr-3"
                          />
              <span className="text-2xl font-bold">
                A Cooler <span className="text-blue-400">Solutions</span>
              </span>
            </div>
            <p className="text-gray-400">
              Professional refrigeration monitoring, maintenance, and repair services for businesses of all sizes.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 mt-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                <span className="text-gray-300">123 Cooling Way, Frostville, AC 90210</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">support@acoolersolutions.com</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 mt-6">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/new-customer" className="text-gray-300 hover:text-white transition-colors">New Customer</a></li>
              <li><a href="/existing-customer" className="text-gray-300 hover:text-white transition-colors">Support Request</a></li>
              <li><a href="/#/login" className="text-gray-300 hover:text-white transition-colors">Client Portal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} A Cooler Solutions. All rights reserved.
        </div>
      </div>

      {/* Corner Image */}
      <img
        src="https://validthemes.net/site-template/robok/assets/img/shape/globe.png"
        alt="Decorative"
        className="absolute bottom-0 right-0 w-[450px] h-[450px] object-contain pointer-events-none opacity-90"
      />
    </footer>
  );
};

export default Footer;
