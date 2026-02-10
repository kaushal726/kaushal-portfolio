import React from "react";
import readmeImg from "../../assets/sky.gif";
import "./About.css";
import { motion } from "framer-motion";

const pdfUrl =
  "https://docs.google.com/document/d/1ah_2XrpLrWpvW9iAySFVL4mey1QvOWxWqU6Gbj67Lp0/edit?usp=sharing";

let Readme = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full pt-32 pb-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated SVG Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="1"
                height="50"
                fill="rgba(139, 92, 246, 0.1)"
              />
              <rect
                x="0"
                y="0"
                width="50"
                height="1"
                fill="rgba(139, 92, 246, 0.1)"
              />
            </pattern>
            <linearGradient id="about-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2">
                <animate
                  attributeName="stopColor"
                  values="#8b5cf6;#ec4899;#3b82f6;#8b5cf6"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2">
                <animate
                  attributeName="stopColor"
                  values="#ec4899;#3b82f6;#8b5cf6;#ec4899"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
          />
          <ellipse cx="30%" cy="40%" rx="400" ry="300" fill="url(#about-grad)">
            <animate
              attributeName="cx"
              values="30%;70%;30%"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="40%;60%;40%"
              dur="25s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-7xl flex-1 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 font-bold text-lg md:text-xl mb-4 animate-pulse-slow tracking-widest uppercase">
            About Me
          </p>
          <h1 className="text-white text-7xl md:text-8xl font-black tracking-tight drop-shadow-2xl mb-6">
            Who I Am
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{ scaleX: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
            A passionate developer transforming ideas into elegant digital
            solutions
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="relative w-full mb-12"
          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 80,
          }}
          whileHover={{
            scale: 1.02,
            rotateY: 2,
            transition: { duration: 0.3 },
          }}
          style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
        >
          {/* Modern 3D Glassmorphism Card */}
          <div
            className="about-card-container relative p-12 md:p-18 lg:p-24 rounded-3xl backdrop-blur-3xl bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 border border-purple-500/30 shadow-2xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(0)",
            }}
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-600/15 to-blue-600/15 animate-gradient-slow opacity-40"></div>

            {/* Content */}
            <div
              className="relative z-10"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 mb-8">
                {/* Animated Avatar with 3D Effect */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 15,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(50px)",
                  }}
                >
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-1.5 shadow-2xl shadow-purple-500/50">
                    <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm p-3 flex items-center justify-center overflow-hidden">
                      <img
                        fetchpriority="high"
                        className="w-full h-full object-cover"
                        src={readmeImg}
                        alt="Kaushal"
                      />
                    </div>
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-40 animate-pulse-slow -z-10"></div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  className="flex-1"
                  style={{ transform: "translateZ(40px)" }}
                  whileHover={{ x: 5 }}
                >
                  <p className="text-gray-100 text-lg md:text-xl leading-relaxed font-light mb-6">
                    I'm{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                      Kaushal
                    </span>
                    , a passionate web developer dedicated to crafting
                    beautiful, functional digital experiences. With a deep
                    curiosity about how technology works and a drive to create
                    meaningful solutions, I've made web development my career
                    path.
                  </p>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
                    Throughout my journey, I've committed myself to refining my
                    technical skills and staying current with modern
                    technologies. My goal is to build something truly unique
                    that makes a difference in people's lives—whether it's
                    through responsive websites, dynamic applications, or
                    innovative digital solutions.
                  </p>
                </motion.div>
              </div>

              <motion.p
                className="text-gray-200 text-base md:text-lg leading-relaxed font-light"
                style={{ transform: "translateZ(35px)" }}
              >
                I believe in writing clean, efficient code and creating user
                interfaces that are not only visually stunning but also
                intuitive and accessible. Every project is an opportunity to
                push boundaries and learn something new.
              </motion.p>
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          className="hire-me-button relative group overflow-hidden px-10 py-4 rounded-2xl font-bold text-xl md:text-2xl transition-all duration-300 shadow-2xl"
          rel="noreferrer"
          download="kaushal-raj-resume"
          target="_blank"
          href={pdfUrl}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 text-white flex items-center gap-3">
            Hire Me!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
        </motion.a>
      </div>

      {/* Footer */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="text-sm text-gray-400 font-light">
          &copy; 2026 Kaushal Raj. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};
export default Readme;
