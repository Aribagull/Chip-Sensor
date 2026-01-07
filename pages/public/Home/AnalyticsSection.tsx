import React from "react";
import { CiCircleCheck } from "react-icons/ci";

const features: string[] = [
  "Average Temperature: Quickly see average readings across all sensors.",
  "Trend Graphs: Visualize temperature changes over time for each cooler/freezer.",
  "Alerts & Notifications: Stay informed of threshold breaches and door open events",
];

const AnalyticsSection: React.FC = () => {
  return (
    <div className="bg-black text-white pt-20">
      <div className="max-w-7xl py-16 flex flex-col lg:flex-row items-center gap-10 mx-auto px-6 sm:px-10 lg:px-20">

        {/* ---------------- LEFT IMAGES SECTION ---------------- */}
        <div className="relative w-full lg:w-[50%] flex justify-center">

          {/* BLUR WHITE BACKGROUND */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl -z-10"></div>

          {/* MAIN CHART IMAGE */}
          <img
            src="https://saaslyn-merge-html.netlify.app/assets/images/new-images-v2/data/data-1.svg"
            alt="Chart"
            className="w-[90%] sm:w-[80%] lg:w-[85%] h-full rounded-2xl"
          />

          {/* SUMMARY IMAGE */}
          <img
            src="https://saaslyn-merge-html.netlify.app/assets/images/new-images-v2/data/data-2.svg"
            alt="Summary"
            className="
              w-32 sm:w-40 
              absolute 
              -left-4 sm:-left-8 
              bottom-0 
              lg:w-44 lg:left-[-50px] 
              animate-floating 
              rounded-2xl shadow-xl
            "
          />
        </div>

        {/* ---------------- RIGHT TEXT CONTENT ---------------- */}
        <div className="w-full lg:w-[50%] text-center lg:text-left">
          <p className="text-sm tracking-widest text-primary mb-3">
            Insights & Analytics
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5">
            Smart Monitoring in Real-Time<br />
            For Informed Decisions
          </h1>

          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Monitor real-time temperature data from all your coolers and freezers, 
            track historical trends over days, weeks, or months, and ensure safe storage 
            of critical items.
          </p>

          <div className="space-y-4">
            {features.map((item: string, i: number) => (
              <p key={i} className="flex items-center gap-3 text-gray-300 justify-center lg:justify-start">
                <CiCircleCheck className="w-5 h-5 text-primary" />
                {item}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsSection;
