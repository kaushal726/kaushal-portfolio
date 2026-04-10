import React from "react";
import { motion, useTransform } from "framer-motion";

export const StickySVG = ({
  stickySVGY,
  stickySVGScale,
  stickySVGRotate,
  stickySVGOpacity,
  scrollYProgress
}) => {
  // Individual shape animations
  const shape1Rotate = useTransform(scrollYProgress, [0, 0.15], [0, 45]);
  const shape2Scale = useTransform(scrollYProgress, [0.02, 0.12], [1, 1.3]);
  const shape3TranslateX = useTransform(scrollYProgress, [0, 0.15], [0, 80]);
  const shape3TranslateY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-10"
      style={{
        y: stickySVGY,
        scale: stickySVGScale,
        rotate: stickySVGRotate,
        opacity: stickySVGOpacity
      }}
    >
      <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        <svg
          className="w-full h-full"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="svg-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="svg-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="svg-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer ring */}
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="none"
            stroke="url(#svg-stroke)"
            strokeWidth="1"
            strokeDasharray="8 12"
            opacity="0.4"
          />

          {/* Inner ring */}
          <circle
            cx="250"
            cy="250"
            r="160"
            fill="none"
            stroke="url(#svg-stroke)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.3"
          />

          {/* Main hexagon */}
          <motion.polygon
            points="250,150 320,200 320,300 250,350 180,300 180,200"
            fill="url(#svg-grad-1)"
            filter="url(#glow)"
            style={{ rotate: shape1Rotate }}
          />

          {/* Inner hexagon outline */}
          <polygon
            points="250,180 300,215 300,285 250,320 200,285 200,215"
            fill="none"
            stroke="url(#svg-stroke)"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Center circle */}
          <circle cx="250" cy="250" r="40" fill="url(#svg-grad-1)" opacity="0.6" />
          <circle cx="250" cy="250" r="20" fill="#fff" opacity="0.4" />

          {/* Floating shapes */}
          <motion.polygon
            points="420,100 450,125 450,175 420,200 390,175 390,125"
            fill="url(#svg-grad-2)"
            opacity="0.6"
            style={{
              rotate: shape1Rotate,
              x: shape3TranslateX,
              y: shape3TranslateY
            }}
          />

          <motion.circle
            cx="80"
            cy="380"
            r="35"
            fill="url(#svg-grad-1)"
            opacity="0.5"
            style={{
              x: shape3TranslateX,
              y: shape3TranslateY
            }}
          />

          <motion.polygon
            points="60,80 80,95 80,125 60,140 40,125 40,95"
            fill="url(#svg-grad-2)"
            opacity="0.5"
            style={{
              y: shape3TranslateY
            }}
          />

          {/* Orbital dots */}
          <motion.circle
            cx="250"
            cy="50"
            r="8"
            fill="#8b5cf6"
            opacity="0.7"
            style={{ scale: shape2Scale }}
          />
          <motion.circle
            cx="450"
            cy="250"
            r="6"
            fill="#ec4899"
            opacity="0.6"
            style={{ scale: shape2Scale }}
          />
          <motion.circle
            cx="250"
            cy="450"
            r="7"
            fill="#3b82f6"
            opacity="0.7"
            style={{ scale: shape2Scale }}
          />
          <motion.circle
            cx="50"
            cy="250"
            r="5"
            fill="#8b5cf6"
            opacity="0.6"
            style={{ scale: shape2Scale }}
          />
        </svg>
      </div>
    </motion.div>
  );
};
