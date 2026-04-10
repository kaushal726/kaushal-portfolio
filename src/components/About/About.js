import React from "react";
import readmeImg from "../../assets/sky.gif";
import "./About.css";
import { motion } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const pdfUrl = "https://docs.google.com/document/d/1ah_2XrpLrWpvW9iAySFVL4mey1QvOWxWqU6Gbj67Lp0/edit?usp=sharing";

const Readme = () => {
  const { mood } = useMood();

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen w-full pt-24 pb-12 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${mood.colors.background} 0%, ${mood.colors.surface}50 50%, ${mood.colors.background} 100%)`,
      }}
    >
      {/* Animated SVG Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={`${mood.colors.primary}15`} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <ellipse
            cx="50%"
            cy="50%"
            rx="60%"
            ry="50%"
            fill={`${mood.colors.primary}08`}
          >
            <animate attributeName="rx" values="50%;70%;50%" dur="20s" repeatCount="indefinite" />
            <animate attributeName="ry" values="40%;60%;40%" dur="25s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>

      <div className="flex flex-col items-center w-full max-w-5xl flex-1 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm md:text-base uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4"
            style={{ color: mood.colors.primary }}
          >
            About Me
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Who I Am
          </h1>
          <motion.div
            className="h-1 w-16 md:w-20 mx-auto mb-4 md:mb-6 rounded-full"
            style={{ background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})` }}
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-xl mx-auto font-light px-4">
            A passionate developer transforming ideas into elegant digital solutions
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="relative w-full mb-8 md:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
          whileHover={{ scale: 1.01 }}
          style={{ perspective: "1500px" }}
        >
          <div
            className="relative p-6 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: `${mood.colors.surface}85`,
              backdropFilter: "blur(30px)",
              border: `1px solid ${mood.colors.primary}30`,
              boxShadow: `0 20px 60px ${mood.colors.primary}15`,
            }}
          >
            {/* Animated Background Gradient */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}20, ${mood.colors.secondary}20)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Avatar & Text Grid */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-6 md:mb-8">
                {/* Animated Avatar */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1"
                    style={{
                      background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                      boxShadow: `0 0 40px ${mood.colors.primary}40`,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                      style={{ background: `${mood.colors.background}90` }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={readmeImg}
                        alt="Kaushal"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute -inset-4 rounded-full blur-2xl opacity-30 -z-10"
                    style={{ background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})` }}
                  />
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 md:mb-6"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    I'm{" "}
                    <span
                      className="font-bold"
                      style={{ color: mood.colors.primary }}
                    >
                      Kaushal
                    </span>
                    , a passionate web developer dedicated to crafting beautiful,
                    functional digital experiences.
                  </p>
                  <p
                    className="text-sm sm:text-base md:text-lg leading-relaxed hidden sm:block"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Throughout my journey, I've committed myself to refining my technical
                    skills and staying current with modern technologies.
                  </p>
                </div>
              </div>

              {/* Second Paragraph */}
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                I believe in writing clean, efficient code and creating user interfaces
                that are not only visually stunning but also intuitive and accessible.
              </p>
            </div>

            {/* Decorative Blobs */}
            <div
              className="absolute -top-16 -right-16 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl pointer-events-none"
              style={{ background: `${mood.colors.primary}30` }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl pointer-events-none"
              style={{ background: `${mood.colors.secondary}30` }}
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          className="relative group overflow-hidden flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            boxShadow: `0 10px 40px ${mood.colors.primary}40`,
          }}
          rel="noreferrer"
          download="kaushal-raj-resume"
          target="_blank"
          href={pdfUrl}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-white">Hire Me!</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </motion.a>
      </div>

      {/* Footer */}
      <motion.div
        className="text-center mt-8 md:mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          &copy; 2026 Kaushal Raj. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Readme;
