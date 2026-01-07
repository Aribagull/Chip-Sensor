import { FaTemperatureHigh } from "react-icons/fa";
import { GrVmMaintenance } from "react-icons/gr";
import { GiBrainFreeze } from "react-icons/gi";
import { MdTireRepair } from "react-icons/md";
import { TbPhotoSensor3 } from "react-icons/tb";
import { LuMonitorSmartphone } from "react-icons/lu";
import { ReactNode } from "react";

interface FeatureItem {
  icon: ReactNode;
  title: string;
  desc: string;
}

const WhyChoose: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <FaTemperatureHigh />,
      title: "Temperature Installations",
      desc: "Professional installation of commercial coolers and freezers, ensuring accurate temperature monitoring from day one.",
    },
    {
      icon: <GrVmMaintenance />,
      title: "Preventive Maintenance",
      desc: "Regular maintenance services to keep your refrigeration units running efficiently and prevent unexpected breakdowns.",
    },
    {
      icon: <GiBrainFreeze />,
      title: "Coolers & Freezers Sales",
      desc: "Providing high-quality commercial coolers and freezers suited to your business needs, with reliable performance.",
    },
    {
      icon: <MdTireRepair />,
      title: "Emergency Repairs",
      desc: "Quick-response repair services to fix any refrigeration issues and minimize downtime for your business.",
    },
    {
      icon: <TbPhotoSensor3 />,
      title: "Sensor & Alert Setup",
      desc: "Installation and customization of temperature and door sensors with real-time alerts for safe storage.",
    },
    {
      icon: <LuMonitorSmartphone />,
      title: "Historical Data Monitoring",
      desc: "Track and analyze temperature trends over time to ensure compliance and optimize cooler performance.",
    },
  ];

  return (
    <div className="w-full bg-black text-white py-20 pb-40 px-6">
      <div className="text-center mb-16 mt-20">
        <h2 className="text-4xl font-bold mb-4">Why Choose Acooler Service?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Experience the future of customer support with SaasLyn's intelligent AI platform that delivers 
          instant responses and personalized solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#0c0d25]/70 rounded-2xl p-8 border border-[#c0c4cc]
              transition-all duration-300 group
              hover:border-[#0575c5]
              hover:shadow-[0_0_30px_rgba(5,117,197,0.6)]
              hover:backdrop-blur-xl
              hover:bg-[#192030]/70
            "
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="
                  flex-shrink-0
                  h-14 w-14 flex items-center justify-center rounded-full
                  bg-gray-300 text-[#0575c5] text-3xl
                  border border-white/30
                  transition-all duration-300
                  group-hover:bg-[#0575c5]
                  group-hover:text-white
                  group-hover:backdrop-blur-xl
                  group-hover:border-[#0575c5]/40
                  group-hover:shadow-[0_0_25px_rgba(5,117,197,0.5)]
                "
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold break-words flex-1">{item.title}</h3>
            </div>

            <p className="text-gray-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default WhyChoose;