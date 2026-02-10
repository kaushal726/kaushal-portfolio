import React from "react";
import "./Connect.css";
import github from "../../assets/Social Icons/github.png";
import linkedin from "../../assets/Social Icons/linkedin.png";
import facebook from "../../assets/Social Icons/facebook.png";
import snapchat from "../../assets/Social Icons/snapchat.png";
import instagram from "../../assets/Social Icons/instagram (1).png";
import { motion } from "framer-motion";

const Connect = () => {
  const socialLinks = [
    {
      icon: github,
      alt: "GitHub",
      href: "https://github.com/kaushal726",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: linkedin,
      alt: "LinkedIn",
      href: "https://www.linkedin.com/in/kaushal-raj-074673213",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: facebook,
      alt: "Facebook",
      href: "https://www.facebook.com/kaushal.927?mibextid=TQi3BacyrYqMRoHa",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: instagram,
      alt: "Instagram",
      href: "https://instagram.com/kaushal_726?igshid=MzNlNGNkZWQ4Mg==",
      color: "from-pink-600 to-purple-600",
    },
    {
      icon: snapchat,
      alt: "Snapchat",
      href: "https://www.snapchat.com/add/kaushal_7266?share_id=dH5yoA2AUd0&locale=en-IN",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <motion.div
      className="flex flex-col w-full items-center justify-center min-h-screen py-24 px-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated SVG Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="connect-grad-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <animate
                attributeName="x1"
                values="0%;100%;0%"
                dur="20s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values="0%;100%;0%"
                dur="15s"
                repeatCount="indefinite"
              />
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle
            cx="10%"
            cy="20%"
            r="300"
            fill="url(#connect-grad-1)"
            opacity="0.3"
          >
            <animate
              attributeName="cx"
              values="10%;90%;10%"
              dur="25s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="20%;80%;20%"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="90%"
            cy="70%"
            r="250"
            fill="url(#connect-grad-1)"
            opacity="0.25"
          >
            <animate
              attributeName="cx"
              values="90%;10%;90%"
              dur="20s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="70%;30%;70%"
              dur="25s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 150,
            damping: 10,
          }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <span className="text-8xl relative z-10 drop-shadow-2xl">🤝</span>
          </div>
        </motion.div>
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Let's Connect
        </motion.h1>
        <motion.p
          className="text-gray-300 text-xl md:text-2xl font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Find me on social media and let's collaborate on amazing projects
        </motion.p>
      </div>

      {/* Social Icons Container - Full Width Modern Design */}
      <div className="relative w-full max-w-6xl mb-20">
        <div className="relative bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-slate-900/70 backdrop-blur-3xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl p-12 md:p-20">
          {/* Mesh Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10"></div>

          {/* 3D Floating Social Icons Grid */}
          <div className="relative z-10 flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link group"
                initial={{ opacity: 0, scale: 0, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{ scale: 1.15, y: -15, rotateZ: 5 }}
                whileTap={{ scale: 0.9 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg border border-purple-400/30 transition-all duration-500 group-hover:from-slate-700/80 group-hover:to-slate-800/80 group-hover:border-purple-400/60 shadow-xl group-hover:shadow-purple-500/40">
                  {/* 3D Layer Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/25 group-hover:to-blue-500/25 transition-all duration-500 pointer-events-none"></div>

                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10 drop-shadow-2xl transition-transform duration-300 group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    style={{ transform: "translateZ(25px)" }}
                  />

                  {/* Colored Glow Effect */}
                  <div
                    className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30 transition-all duration-500 blur-2xl pointer-events-none`}
                  ></div>

                  {/* Icon Label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-white text-sm font-bold whitespace-nowrap bg-gradient-to-r from-purple-600/90 to-pink-600/90 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-400/40">
                      {social.alt}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer with animated line */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full max-w-6xl text-center"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-8"></div>
        <p className="text-sm text-gray-400 font-light">
          &copy; 2026 Kaushal Raj. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
};
export default Connect;
