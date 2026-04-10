import { useRef } from "react";
import "./Connect.css";
import github from "../../assets/Social Icons/github.png";
import linkedin from "../../assets/Social Icons/linkedin.png";
import facebook from "../../assets/Social Icons/facebook.png";
import snapchat from "../../assets/Social Icons/snapchat.png";
import instagram from "../../assets/Social Icons/instagram (1).png";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useMood } from "../../context/MoodContext";
import OrganicBlobBackground from "../Common/OrganicBlobBackground";

const Connect = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mood } = useMood();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const socialLinks = [
    { icon: github, alt: "GitHub", href: "https://github.com/kaushal726", color: "#ffffff" },
    { icon: linkedin, alt: "LinkedIn", href: "https://www.linkedin.com/in/kaushal-raj-074673213", color: "#0077b5" },
    { icon: facebook, alt: "Facebook", href: "https://www.facebook.com/kaushal.927", color: "#1877f2" },
    { icon: instagram, alt: "Instagram", href: "https://instagram.com/kaushal_726", color: "#e1306c" },
    { icon: snapchat, alt: "Snapchat", href: "https://snapchat.com/add/kaushal_7266", color: "#fffc00" },
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      {/* Parallax blob background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <OrganicBlobBackground variant="connect" />
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: mood.colors.primary,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative max-w-2xl mx-auto text-center"
        style={{ y: contentY }}
      >
        {/* Header with premium animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          {/* Glowing accent */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            }}
            animate={{
              boxShadow: [
                `0 0 20px ${mood.colors.primary}40`,
                `0 0 40px ${mood.colors.primary}60`,
                `0 0 20px ${mood.colors.primary}40`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Hand wave icon */}
            <motion.div
              className="w-full h-full flex items-center justify-center text-3xl"
              animate={{ rotate: [0, 10, -5, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              👋
            </motion.div>
          </motion.div>

          {/* Heading with gradient */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let's{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            >
              Connect
            </span>
          </h2>

          <p
            className="text-base md:text-lg mb-10 max-w-md mx-auto"
            style={{ color: mood.colors.textMuted }}
          >
            Open for collaborations, opportunities, and new adventures
          </p>
        </motion.div>

        {/* Social Icons - Premium card style */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Glow behind the card */}
          <motion.div
            className="absolute -inset-8 rounded-3xl blur-2xl"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, transparent 70%)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Main card */}
          <div
            className="relative px-8 py-8 rounded-3xl"
            style={{
              background: `${mood.colors.surface}95`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${mood.colors.surfaceLight}`,
            }}
          >
            {/* Top border gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
              }}
            />

            <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(ellipse at center, ${social.color}30, transparent 70%)`,
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Icon container */}
                  <div
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${mood.colors.surface}, ${mood.colors.surfaceLight})`,
                      border: `1px solid ${mood.colors.surfaceLight}`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Shimmer effect on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, transparent, ${social.color}30, transparent)`,
                      }}
                    />

                    <img
                      src={social.icon}
                      alt={social.alt}
                      className="w-7 h-7 md:w-8 md:h-8 object-contain relative z-10"
                      style={{
                        filter: `drop-shadow(0 0 8px ${social.color}50)`,
                      }}
                    />
                  </div>

                  {/* Platform name on hover */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: mood.colors.textMuted }}
                  >
                    {social.alt}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button - Extra premium */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.a
            href="mailto:kaushal@example.com"
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary}, ${mood.colors.primary})`,
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Glow */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-50"
              style={{
                background: `radial-gradient(ellipse at center, ${mood.colors.primary}60, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span className="text-lg">Get In Touch</span>
            </span>
          </motion.a>
        </motion.div>

        {/* Footer with animation */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* Decorative line */}
            <motion.div
              className="w-12 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
              }}
            />
            {/* Star */}
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-lg"
            >
              ✦
            </motion.div>
            {/* Decorative line */}
            <motion.div
              className="w-12 h-px"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
              }}
            />
          </div>

          <p
            className="text-sm"
            style={{ color: mood.colors.textMuted }}
          >
            &copy; 2026{" "}
            <span
              className="text-transparent bg-clip-text font-medium"
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            >
              Kaushal Raj
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Connect;
