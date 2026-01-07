import React from "react";
import { FiPhone } from "react-icons/fi";

const GetStartedSection: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center py-20 bg-black">
      <div
        className="
          w-[90%] lg:w-[80%]
          rounded-[40px]
          p-16
          relative
          overflow-hidden
          bg-cover bg-center border-2 border-primary/20
        "
        style={{
          backgroundImage:
            "url('https://saaslyn-merge-html.netlify.app/assets/images/cta/cta-bg.png')",
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Start Your Journey With <br /> Acooler Services
          </h1>

          <p className="text-lg md:text-base opacity-80 max-w-2xl">
            Embark on a journey to smarter temperature management and safer
            refrigeration. With Acooler Services, monitor your coolers and
            freezers in real-time, track historical trends, and receive
            actionable alerts to ensure optimal performance and secure storage
            at all times.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="px-8 py-4 bg-primary hover:shadow-[0_0_12px_#0575c5] text-white font-semibold rounded-full transition-all">
              Get Started Now
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold rounded-full transition-all">
              <FiPhone size={20} /> Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;
