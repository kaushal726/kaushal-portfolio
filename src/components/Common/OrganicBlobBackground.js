import React from "react";
import { motion } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const OrganicBlobBackground = ({ variant = "default" }) => {
  const { mood } = useMood();

  const variants = {
    default: {
      blobs: [
        { x: "10%", y: "20%", size: 400, delay: 0 },
        { x: "70%", y: "60%", size: 350, delay: 2 },
        { x: "30%", y: "70%", size: 300, delay: 4 },
      ],
    },
    tech: {
      blobs: [
        { x: "0%", y: "30%", size: 500, delay: 0 },
        { x: "80%", y: "0%", size: 400, delay: 1 },
        { x: "60%", y: "80%", size: 350, delay: 3 },
      ],
    },
    vision: {
      blobs: [
        { x: "20%", y: "0%", size: 450, delay: 0 },
        { x: "70%", y: "50%", size: 400, delay: 2 },
        { x: "10%", y: "80%", size: 300, delay: 1 },
      ],
    },
    experience: {
      blobs: [
        { x: "5%", y: "40%", size: 380, delay: 0 },
        { x: "75%", y: "20%", size: 420, delay: 1.5 },
        { x: "50%", y: "85%", size: 280, delay: 3 },
      ],
    },
    connect: {
      blobs: [
        { x: "30%", y: "30%", size: 350, delay: 0 },
        { x: "70%", y: "70%", size: 300, delay: 2 },
      ],
    },
  };

  const config = variants[variant] || variants.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`blob-grad-1-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mood.colors.primary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={mood.colors.primary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`blob-grad-2-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mood.colors.secondary} stopOpacity="0.12" />
            <stop offset="100%" stopColor={mood.colors.secondary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {config.blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: blob.delay,
              ease: "easeInOut",
            }}
          >
            {/* Organic blob shape using SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <filter id={`blob-blur-${i}-${variant}`}>
                  <feGaussianBlur stdDeviation="15" />
                </filter>
              </defs>
              <motion.path
                d="M45.5,-52.3C58.4,-43.1,68.4,-29.3,72.1,-13.8C75.8,1.7,73.2,19,64.2,32.1C55.2,45.2,39.8,54.1,23.5,60.1C7.2,66.1,-10,69.2,-25.4,65.2C-40.8,61.2,-54.4,50.1,-63.1,35.8C-71.8,21.5,-75.6,4,-71.3,-12.1C-67,-28.2,-54.6,-42.9,-40.4,-51.9C-26.2,-60.9,-10.2,-64.2,3.4,-68.4C17,-72.6,32.7,-61.5,45.5,-52.3Z"
                fill={`url(#blob-grad-1-${variant})`}
                transform="translate(100 100)"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 180, 360] }}
                transition={{
                  duration: 30 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.path
                d="M42.1,-45.2C54.4,-34.8,64.4,-21.4,68.5,-5.8C72.6,9.8,70.8,27.6,61.5,41.2C52.2,54.8,35.4,64.2,17.8,69.2C0.2,74.2,-18.2,74.8,-33.8,68.5C-49.4,62.2,-62.2,49,-69.5,33.1C-76.8,17.2,-78.6,-1.4,-73.8,-18.3C-69,-35.2,-57.6,-50.4,-43.5,-59.5C-29.4,-68.6,-12.7,-71.6,1.9,-74.1C16.5,-76.6,29.8,-55.6,42.1,-45.2Z"
                fill={`url(#blob-grad-2-${variant})`}
                transform="translate(100 100)"
                initial={{ rotate: 0 }}
                animate={{ rotate: [360, 180, 0] }}
                transition={{
                  duration: 25 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ opacity: 0.7 }}
              />
            </svg>
          </motion.div>
        ))}
      </svg>
    </div>
  );
};

export default OrganicBlobBackground;
