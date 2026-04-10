import React, { useState, useRef } from "react";
import Card from "./Cards";
import dataStore from "../../db/dataStore";
import { motion, useInView } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const Project = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { mood } = useMood();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen w-full pt-24 pb-40 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle particle background - very dim and slow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full"
            style={{
              backgroundColor: mood.colors.primary,
              left: `${18 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              opacity: 0.02,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.01, 0.02, 0.01],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs - very subtle */}
      <motion.div
        className="absolute top-40 left-20 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}1, transparent)`,
        }}
        animate={{
          x: [0, 10, 0],
          y: [0, -8, 0],
        }}
        transition={{ duration: 50, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}1, transparent)`,
        }}
        animate={{
          x: [0, -10, 0],
          y: [0, 8, 0],
        }}
        transition={{ duration: 55, repeat: Infinity }}
      />

      {/* Header Section */}
      <motion.div
        ref={ref}
        className="mb-20 text-center relative"
        initial={{ opacity: 0, y: -40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
      >
        {/* Glowing accent */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
          }}
          animate={{
            boxShadow: [
              `0 0 30px ${mood.colors.primary}30`,
              `0 0 60px ${mood.colors.primary}50`,
              `0 0 30px ${mood.colors.primary}30`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🚀
          </div>
        </motion.div>

        <p
          className="text-sm uppercase tracking-[0.4em] mb-4"
          style={{ color: mood.colors.primary }}
        >
          Featured Works
        </p>

        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          style={{
            letterSpacing: "0.05em",
            fontFamily: "'Notable', sans-serif",
          }}
        >
          My{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            }}
          >
            Projects
          </span>
        </h1>

        {/* Animated underline */}
        <motion.div
          className="w-40 h-1 mx-auto mb-8 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
          }}
          animate={{ width: [150, 250, 150] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: mood.colors.textMuted }}
        >
          Exploring the intersection of design and technology through
          innovative solutions and creative experiences
        </p>
      </motion.div>

      {/* Staggered Bento Grid Layout */}
      <motion.div
        className="max-w-7xl mx-auto overflow-hidden relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max overflow-hidden">
          {dataStore.map((data, i) => {
            // Determine card size based on index for bento-style layout
            const sizeClass =
              i === 0 ? "lg:col-span-2 lg:row-span-1" : "col-span-1";
            const isLarge = i === 0;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative overflow-hidden ${sizeClass}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${mood.colors.primary}20, transparent 70%)`,
                  }}
                  animate={hoveredIndex === i ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Card with responsive sizing */}
                <div className={isLarge ? "h-auto" : "h-auto"}>
                  <Card
                    key={i}
                    heading={data.name}
                    paragraph={data.description}
                    src={data.src}
                    href={data.link}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom decorative elements */}
      <motion.div
        className="mt-24 text-center relative"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            className="w-24 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
            }}
          />
          <motion.span
            className="text-2xl"
            style={{ color: mood.colors.primary }}
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ✦
          </motion.span>
          <motion.div
            className="w-24 h-px"
            style={{
              background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
            }}
          />
        </div>

        <p
          className="text-base"
          style={{ color: mood.colors.textMuted }}
        >
          More projects coming soon...{" "}
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            🚀
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
};

export default Project;
