import React from "react";
import { motion } from "framer-motion";
// Importing icons for contact details
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        // Added 'min-h-[550px]' to force the height to match the Earth canvas roughly
        // Added 'flex flex-col justify-between' to space content out evenly
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl min-h-[550px] flex flex-col justify-between'
      >
        <div>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Connect.</h3>

          {/* ==================== SOCIAL ICONS ==================== */}
          <div className="flex flex-wrap gap-5 mt-8">
            <a
              href="https://github.com/shubhd556"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary p-4 rounded-full text-white hover:text-[#915eff] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/shubhamsdudhal/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary p-4 rounded-full text-white hover:text-[#0A66C2] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary p-4 rounded-full text-white hover:text-[#1DA1F2] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/shubh_d55/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-tertiary p-4 rounded-full text-white hover:text-[#E4405F] hover:bg-black-200 transition-all duration-300 text-[28px] shadow-md shadow-primary"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* ==================== NEW FILLER CONTENT ==================== */}
        <div className="flex flex-col gap-6 mt-5">

          {/* Direct Email Box */}
          <div className="bg-tertiary p-5 rounded-xl flex items-center gap-4 shadow-md shadow-primary">
            <div className="bg-black-200 p-3 rounded-full text-[#915eff] text-[24px]">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-secondary text-[14px] font-semibold">Email Me</p>
              <a href="mailto:shubhamdudhal9@gmail.com" className="text-white text-[16px] font-medium hover:text-[#915eff] transition-colors">
                shubhamdudhal9@gmail.com
              </a>
            </div>
          </div>

          {/* Location Box */}
          <div className="bg-tertiary p-5 rounded-xl flex items-center gap-4 shadow-md shadow-primary">
            <div className="bg-black-200 p-3 rounded-full text-[#915eff] text-[24px]">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-secondary text-[14px] font-semibold">Location</p>
              <p className="text-white text-[16px] font-medium">
                Pune, India
              </p>
            </div>
          </div>

          {/* Status / Bio Text */}
          <div className="bg-tertiary p-6 rounded-xl shadow-md shadow-primary">
            <p className="text-white text-[16px] leading-[28px]">
              Turning complex problems into
              <span className="text-[#915eff] font-bold"> elegant solutions </span>
              is my passion. I am currently open to joining a dynamic team where I can contribute my skills. Let's turn your vision into reality.
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