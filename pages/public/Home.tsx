import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Thermometer, Wrench, ShoppingCart, Activity, 
  ArrowRight, CheckCircle2, Shield, Clock, Phone,
  Snowflake, Users, Building2, Zap, ChevronRight,
  Star, PlayCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import bgVideo from "../../Assets/Video/bg-video.mp4";

import { Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import WhyChoose from './Home/WhyChoose';
import WorkSection from './Home/WorkSection';
import AnalyticsSection from './Home/AnalyticsSection';
import GetStartedSection from './Home/CtaSection';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


 interface Testimonial {
  name: string;
  image: string;
  text: string;
}

const logos = [
    {
      src: "https://icon-library.com/images/icon-logo-png/icon-logo-png-29.jpg",
      label: "Investify",
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/029/571/045/small/blue-glass-style-3d-letter-s-png.png",
      label: "Ximora",
    },
    {
      src: "https://cdn-icons-png.freepik.com/256/17914/17914657.png?semt=ais_white_label",
      label: "Knewish",
    },
    {
      src: "https://www.pngmart.com/files/23/Free-Logos-PNG-Isolated-Pic.png",
      label: "Upglam",
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/019/897/563/small/modern-real-estate-and-construction-logo-free-png.png",
      label: "Nutril",
    },
  ];



const testimonials: Testimonial[] = [
  {
    name: "Irene Strong",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Mean if he they been no hold mr. Is at much do made took held help."
  },
  {
    name: "Jonas Kakaroto",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "Blessing it ladyship on sensible judgment settling outweigh. civil jokes leave offer."
  },
  {
    name: "Anna Smith",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Great experience! Very helpful. They were professional and helpful throughout."
  },
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    text: "Highly recommend. Highly recommend their service. Friendly and reliable team."
  },
  {
    name: "Mary Jane",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Amazing support. Highly recommend their service. Friendly and reliable team."
  },
];

const Home: React.FC = () => {
   const settings: Settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      speed: 800,
      cssEase: "ease-in-out",
      arrows: true,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    };
 

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
      <Header/>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <video
    src={bgVideo}
    autoPlay
    loop
    muted
    className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
  />
  <div className="absolute inset-0 bg-black/60"></div>
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
                <span className="block text-blue-400 ">
                  Refrigeration Solutions
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100/80 max-w-xl mb-8 leading-relaxed">
                Keep your cool with our advanced monitoring systems, expert maintenance, and 24/7 support. Protect your inventory with real-time alerts.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/new-customer">
                  <Button size="lg" className="w-full sm:w-auto bg-[#0575c5] text-white hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-2xl shadow-white/20 group">
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
                <div className="absolute -bottom-6 -left-6 bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 max-w-[200px]">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Alert Sent</p>
                      <p className="text-xs text-gray-400">WhatsApp notification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        {/* <div className="absolute bottom-0 left-0 right-0 ">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full ">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#0f172a" className="bg-slate-900"/>
          </svg>
        </div> */}
      </section>

      {/* Stats Section */}
        <div className="w-full pb-10  bg-slate-900 relative -mt-1 py-10 flex justify-center">
      <div className="flex items-center gap-20">
        {logos.map((item, index) => (
          <div key={index} className="flex items-center gap-3 opacity-80">
            <img src={item.src} alt={item.label} className="h-10 w-auto object-contain" />
            <span className="text-gray-400 text-2xl font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  

      {/* Services Section */}
      <section id="services">
        <WhyChoose/>
      </section>
      <WorkSection/>
      <AnalyticsSection/>
      <div className="bg-black py-16 pb-40 px-6 sm:px-10 lg:px-72">
  <div className="w-full bg-black py-10 px-4 lg:px-10">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-6">
      What Our Clients Say
    </h2>

    <p className="text-gray-300 text-center mb-6 max-w-xl mx-auto px-2 sm:px-0">
      Hear directly from our satisfied clients and see why they trust us for their solutions.
    </p>
  </div>

  <Slider {...settings}>
    {testimonials.map((t, i) => (
      <div key={i} className="px-2 sm:px-3">
        <div className="bg-[#0c0d25]/70 shadow-lg rounded-xl p-6 text-center">
          <img
            src={t.image}
            className="w-20 h-20 rounded-full mx-auto mb-4"
            alt={t.name}
          />
          <h3 className="text-white font-semibold mb-2">{t.name}</h3>
          <p className="text-gray-300 text-sm">{t.text}</p>
        </div>
      </div>
    ))}
  </Slider>
</div>

      <GetStartedSection/>
        
    </div>
  );
};

export default Home;