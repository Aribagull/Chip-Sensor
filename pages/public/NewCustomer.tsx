import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus, ArrowRight, CheckCircle2, Building2, Mail, Phone, User,
  Thermometer, Activity, ShoppingCart, Wrench, Sparkles, ArrowLeft,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { registerUser } from "../../Api/authonticationUser";


interface RegisterUserPayload {
  name: string;
  organizationName: string;
  email: string;
  phone: string;
  password: string;
  role: "customer" | "admin";
  services: string[];
  message: string;
}

const NewCustomer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    services: [] as string[],
    message: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: '',
    password: '',
  });

  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

 // PHONE
if (name === 'phone') {
  if (!/^[0-9]*$/.test(value)) {
    setErrors(prev => ({ ...prev, phone: 'Please enter numbers only' }));
    return; 
  }
  if (value.length > 11) return;

  setFormData(prev => ({ ...prev, phone: value }));
  setErrors(prev => ({ ...prev, phone: '' })); // error clear karo agar valid ho
  return;
}


  // EMAIL
  if (name === 'email') {
    setFormData(prev => ({ ...prev, email: value }));
    if (!value.includes('@') || !value.includes('.com')) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    return;
  }

  // PASSWORD
  if (name === 'password') {
    if (value.length > 8) return;

    setFormData(prev => ({ ...prev, password: value }));

    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const isValid = value.length === 8 && specialChar.test(value);

    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be exactly 8 characters and include a special character',
      }));
      setIsStrongPassword(false);
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
      setIsStrongPassword(true);
    }
    return;
  }

  // DEFAULT (name, company, message)
  setFormData(prev => ({ ...prev, [name]: value }));
};



   const handleServiceToggle = (service: string) => {
  setFormData(prev => ({
    ...prev,
    services: prev.services.includes(service)
      ? prev.services.filter(s => s !== service)
      : [...prev.services, service]
  }));
};

const isStep1Valid = () => {
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  let valid = true;

  // PHONE ERROR
  if (formData.phone.length !== 11) {
    setErrors(prev => ({
      ...prev,
      phone: 'Phone number must be 11 digits'
    }));
    valid = false;
  }

  // EMAIL ERROR
  if (!/^[^\s@]+@[^\s@]+\.com$/.test(formData.email)) {
    setErrors(prev => ({
      ...prev,
      email: 'Please enter a valid email address'
    }));
    valid = false;
  }

  // PASSWORD ERROR
  if (formData.password.length !== 8 || !specialChar.test(formData.password)) {
    setErrors(prev => ({
      ...prev,
      password: 'Password must be exactly 8 characters and include a special character'
    }));
    valid = false;
  }

  // NAME & COMPANY
  if (!/^[A-Za-z\s]+$/.test(formData.name)) valid = false;
  if (!/^[A-Za-z\s]+$/.test(formData.company)) valid = false;

  return valid;
};

const isStep1ValidCheck =
  formData.phone.length === 11 &&
  /^[^\s@]+@[^\s@]+\.com$/.test(formData.email) &&
  formData.password.length === 8 &&
  /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) &&
  /^[A-Za-z\s]+$/.test(formData.name) &&
  /^[A-Za-z\s]+$/.test(formData.company);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isStep1Valid() || formData.services.length === 0) {
    alert("Please complete the form correctly");
    return;
  }

  const payload: RegisterUserPayload = {
    name: formData.name,
    organizationName: formData.company,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    role: "customer",
    services: formData.services,
    message: formData.message
  };

  try {
    await registerUser(payload);
    setSubmitted(true);
  } catch (error: any) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};

const services = [
  { id: 'monitoring', label: 'Temperature Monitoring', icon: Thermometer, desc: '24/7 real-time alerts' },
  { id: 'maintenance', label: 'Preventive Maintenance', icon: Activity, desc: 'Scheduled check-ups' },
  { id: 'sales', label: 'Sales & Installation', icon: ShoppingCart, desc: 'New equipment' },
  { id: 'repair', label: 'Repair Services', icon: Wrench, desc: 'Expert technicians' },
];


    if (submitted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full text-center">
            {/* Success Animation */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-green-400/20 rounded-full mx-auto animate-ping" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome Aboard! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Welcome to A Cooler Service Company! You have successfully signed up. Once you log in, you will have access to your dashboard where you can view and manage your registered locations, track service requests, receive real-time alerts, and update your account preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button variant="outline" className="rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>


              <Link to="/login">
                <Button className="rounded-xl flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 py-16 pt-40 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm text-blue-100 font-medium">Start your journey with us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              New Customer Registration
            </h1>
            <p className="text-lg text-blue-100/80">
              Tell us about your business and we'll find the perfect solution for you.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto px-4 -mt-4">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-700 text-gray-500'}`}>
                  1
                </div>
                <span className={`font-medium ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Your Info</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full bg-primary transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-700 text-gray-500'}`}>
                  2
                </div>
                <span className={`font-medium ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Services</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-700 animate-fadeIn">
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Corporation"
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                        🔒
                      </span>
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter a secure password"
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                      />
                      {isStrongPassword && (
                        <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                          ✔ Strong password
                        </p>
                      )}

                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                </div>

                <div className="mt-8 flex justify-end">
                  <Button
  type="button"
  onClick={() => {
    if (isStep1Valid()) setStep(2); // only call setErrors on click
  }}
  size="lg"
  className={`rounded-xl ${!isStep1ValidCheck ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={!isStep1ValidCheck}
>
  Continue
  <ArrowRight className="ml-2 w-5 h-5" />
</Button>


                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Services Selection */}
                <div className="bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-2">Interested Services</h2>
                  <p className="text-gray-400 mb-6">Select all that apply</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const isSelected = formData.services.includes(service.id);
                      return (
                        <button
                          type="button"
                          key={service.id}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-slate-600 hover:border-slate-500'
                            }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected
                              ? 'bg-primary text-white'
                              : 'bg-slate-700 text-gray-400'
                              }`}>
                              <service.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold ${isSelected ? 'text-primary' : 'text-white'}`}>
                                {service.label}
                              </p>
                              <p className="text-sm text-gray-400">{service.desc}</p>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border bborder-slate-700">
                  <h2 className="text-xl font-bold text-white mb-2">Additional Message</h2>
                  <p className="text-gray-400 mb-6">Tell us more about your needs (optional)</p>

                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you? Any specific requirements or questions?"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className={`rounded-xl ${formData.services.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={formData.services.length === 0}
                  >
                    Submit Registration
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };

  export default NewCustomer;