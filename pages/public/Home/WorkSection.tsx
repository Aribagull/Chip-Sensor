import React, { ReactNode, useEffect } from "react";
import { RiSensorLine } from "react-icons/ri";
import { FaInstalod } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BsClipboardDataFill } from "react-icons/bs";
import { GiLaserWarning } from "react-icons/gi";
import { GrBusinessService } from "react-icons/gr";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CardProps {
  title: string;
  icon?: ReactNode;
}

interface CenterCardProps {
  title: string;
}

const WorkSection: React.FC = () => {
  const topLeft: CardProps = { title: "Sensor Setup", icon: <RiSensorLine /> };
  const topRight: CardProps = { title: "Device Installation", icon: <FaInstalod /> };
  const middleBox: CenterCardProps = { title: "Service Request" };
  const rightMiddle: CardProps = { title: "Business Service", icon: <GrBusinessService /> };
  const bottomLeft: CardProps = { title: "Site Inspection", icon: <CgWebsite /> };
  const bottomRight: CardProps = { title: "Data Monitoring", icon: <BsClipboardDataFill /> };
  const bottomMiddle: CardProps = { title: "Instant Alerts", icon: <GiLaserWarning /> };

  // Animation variants for connector lines
  const lineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <section className="bg-slate-900 relative hidden lg:block">
      <div className="text-center pt-20">
        <h2 className="text-4xl text-white font-bold mb-4">How It Works</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Experience the future of customer support with SaasLyn's intelligent AI platform that delivers
          instant responses and personalized solutions.
        </p>
      </div>

      <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[80px] opacity-60 z-0 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#1b2231] rounded-full blur-[120px] opacity-50 z-0 pointer-events-none"></div>

        {/* MAIN WRAPPER */}
        <div className="relative w-[600px] h-[600px] flex flex-col items-center justify-between">
          {/* Glow Behind Center Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1b2231] rounded-full blur-[150px] opacity-40 pointer-events-none z-0"></div>

          {/* CONNECTOR LINES */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-[95px] right-[120px] w-[1px] h-[190px] border border-white/20 border-dotted rotate-[22deg] origin-top"
            variants={lineVariants}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-[95px] left-[120px] w-[1px] h-[190px] border border-white/20 border-dotted -rotate-[22deg] origin-top"
            variants={lineVariants}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-1/2 left-[-20px] w-[230px] h-[2px] border-t border-white/20 border-dotted"
            variants={lineVariants}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute top-1/2 right-[-20px] w-[230px] h-[2px] border-t border-white/20 border-dotted"
            variants={lineVariants}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute bottom-[110px] right-[120px] w-[1px] h-[190px] border border-white/20 border-dotted -rotate-[22deg] origin-bottom"
            variants={lineVariants}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute bottom-[110px] left-[120px] w-[1px] h-[190px] border border-white/20 border-dotted rotate-[22deg] origin-bottom"
            variants={lineVariants}
          />

          {/* BOXES */}
          <div className="w-full flex justify-between">
            <Card title={topLeft.title} icon={topLeft.icon} />
            <Card title={topRight.title} icon={topRight.icon} />
          </div>

          <div className="flex justify-center mt-4 mb-4 relative z-10">
            <CenterCard title={middleBox.title} />
          </div>

          <div className="absolute left-[-200px] top-1/2 -translate-y-1/2 ml-6 z-10">
            <Card title={bottomMiddle.title} icon={bottomMiddle.icon} />
          </div>

          <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 mr-6 z-10">
            <Card title={rightMiddle.title} icon={rightMiddle.icon} />
          </div>

          <div className="w-full flex justify-between mb-5">
            <Card title={bottomLeft.title} icon={bottomLeft.icon} />
            <Card title={bottomRight.title} icon={bottomRight.icon} />
          </div>
        </div>
      </div>
    </section>
  );
}

const Card: React.FC<CardProps> = ({ title, icon }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

 useEffect(() => {
  if (inView) {
    controls.start({
      boxShadow: "0 0 2px #ffffff40, 0 0 4px #ffffff30",
      transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
    });
  }
}, [controls, inView]);


  return (
    <motion.div
      ref={ref}
      animate={controls}
      className="w-[160px] h-[160px] rounded-2xl bg-[#0c0d25]/10 backdrop-blur-xl flex flex-col items-center justify-center text-white z-10 border border-white/20"
    >
      <div className="bg-primary rounded-xl p-3 mb-2 flex items-center justify-center">
        {typeof icon === "string" ? (
          <img src={icon} alt={title} className="w-10 h-10" />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
      </div>
      <p className="text-sm font-medium text-center px-2">{title}</p>
    </motion.div>
  );
}

const CenterCard: React.FC<CenterCardProps> = ({ title }) => {
  return (
    <div className="w-[220px] h-[220px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-white z-10">
      <div className="w-32 h-32 rounded-xl flex items-center justify-center p-4">
        <img
          src="https://marveltheme.com/tf/html/aimug/images/icons/cpu.png"
          className="w-24 h-24"
        />
      </div>
      <p className="text-white font-semibold mt-2 text-center">{title}</p>
    </div>
  );
}
export default WorkSection;