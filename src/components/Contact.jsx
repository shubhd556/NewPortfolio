import React, { useState } from "react";
import { motion } from "framer-motion";
// Added FaCopy and FaCheck for the dynamic email feature
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  // State to handle the "Copied!" visual feedback
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shubhamdudhal9@gmail.com");
    setCopied(true);
    
    // Reset icon back to copy after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        // Main container maintains height and spacing
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl min-h-[550px] flex flex-col justify-between'
      >
        <div>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Connect.</h3>

          {/* ==================== SOCIAL ICONS ==================== */}
          <div className="flex flex-wrap gap-5 mt-8">
            <a href="https://github.com/shubhd556" target="_blank" rel="noopener noreferrer"
               className="bg-tertiary p-4 rounded-full text-white hover:text-[#915eff] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/your-id" target="_blank" rel="noopener noreferrer"
               className="bg-tertiary p-4 rounded-full text-white hover:text-[#0A66C2] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/your-id" target="_blank" rel="noopener noreferrer"
               className="bg-tertiary p-4 rounded-full text-white hover:text-[#1DA1F2] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/your-id" target="_blank" rel="noopener noreferrer"
               className="bg-tertiary p-4 rounded-full text-white hover:text-[#E4405F] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* ==================== DYNAMIC INFO SECTION ==================== */}
        <div className="flex flex-col gap-6 mt-5">
            
            {/* Dynamic Email Box with Copy Feature */}
            <div 
                onClick={handleCopyEmail}
                className="bg-tertiary p-5 rounded-xl flex items-center gap-4 shadow-md shadow-primary cursor-pointer group hover:bg-black-200 transition-all duration-300"
                title="Click to copy email"
            >
                <div className="bg-black-200 group-hover:bg-tertiary transition-colors duration-300 p-3 rounded-full text-[#915eff] text-[24px]">
                    <FaEnvelope />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Email</p>
                    {/* 'break-all' ensures long emails don't break mobile layout */}
                    <p className="text-white text-[16px] font-medium break-all">
                        shubhamdudhal9@gmail.com
                    </p>
                </div>
                {/* Visual feedback icon */}
                <div className="text-white text-[18px]">
                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy className="text-secondary group-hover:text-white" />}
                </div>
            </div>

            {/* Location Box */}
            <div className="bg-tertiary p-5 rounded-xl flex items-center gap-4 shadow-md shadow-primary">
                <div className="bg-black-200 p-3 rounded-full text-[#915eff] text-[24px]">
                    <FaMapMarkerAlt />
                </div>
                <div>
                    <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-white text-[16px] font-medium">
                        Pune, India
                    </p>
                </div>
            </div>

            {/* Updated Bio Text */}
            <div className="bg-tertiary p-6 rounded-xl shadow-md shadow-primary">
              <p className="text-white text-[16px] leading-[28px]">
                I am always excited to discuss 
                <span className="text-[#915eff] font-bold"> new projects </span> 
                and creative ideas. Whether you have a startup concept, an open-source opportunity, or just want to grab a virtual coffee, don't hesitate to reach out!
              </p>
            </div>

        </div>
        {/* ============================================================ */}

      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");