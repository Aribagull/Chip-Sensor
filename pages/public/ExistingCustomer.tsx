import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LifeBuoy, Send, CheckCircle2, Building2, Mail, Phone, User,
  Wrench, HelpCircle, CreditCard, Settings, ArrowLeft, MessageSquare
} from 'lucide-react';
import Button from '../../components/ui/Button';

const ExistingCustomer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requestType: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Existing Customer Request:', formData);
    setSubmitted(true);
  };

  const requestTypes = [
    { value: 'repair', label: 'Equipment Repair', icon: Wrench, desc: 'Something needs fixing' },
    { value: 'maintenance', label: 'Preventive Maintenance', icon: Settings, desc: 'Scheduled service' },
    { value: 'tech_support', label: 'Technical Support', icon: HelpCircle, desc: 'Need help with system' },
    { value: 'billing', label: 'Billing Question', icon: CreditCard, desc: 'Account or payment' },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-blue-400/20 rounded-full mx-auto animate-ping" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Request Received! ✓
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We've received your service request and our team has been notified. Expect a response within 2-4 hours during business hours.
          </p>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Request Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Type:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.requestType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Company:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Ticket ID:</span>
                <span className="font-mono text-primary">TKT-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/login">
              <Button className="rounded-xl">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <LifeBuoy className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm text-blue-100 font-medium">We're here to help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Existing Customer Support
          </h1>
          <p className="text-lg text-blue-100/80">
            Submit a service request and our team will get back to you quickly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-8 -mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Request Type Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">What do you need help with?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Select the type of request</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requestTypes.map((type) => {
                const isSelected = formData.requestType === type.value;
                return (
                  <button
                    type="button"
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, requestType: type.value }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <type.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                          {type.label}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{type.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Describe Your Issue</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">The more details, the faster we can help</p>
              </div>
            </div>

            <textarea
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please describe the issue you're experiencing, including any error messages, when it started, and what you've already tried..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <Button type="submit" size="lg" className="rounded-xl w-full sm:w-auto">
              Submit Request
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>

        {/* Help Box */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Need immediate assistance?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">For urgent issues, call us directly:</p>
              <a href="tel:+15551234567" className="text-xl font-bold text-primary hover:underline">(555) 123-4567</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExistingCustomer;