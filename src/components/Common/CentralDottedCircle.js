import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const CentralDottedCircle = ({ scale, y, opacity }) => {
  const { mood } = useMood();

  // Rotation speed based on mood
  const rotationSpeed = mood.animation.speed === "slow" || mood.animation.speed === "very-slow"
    ? 120
    : mood.animation.speed === "fast" || mood.animation.speed === "dynamic"
      ? 40
      : 80;

  // Generate dotted circle points
  const circleDots = useMemo(() => {
    const dots = [];
    const centerX = 500;
    const centerY = 500;
    const baseRadius = 380;
    const dotCount = 120;
    const ringCount = 4;

    for (let ring = 0; ring < ringCount; ring++) {
      const radius = baseRadius - ring * 30;
      const dotsInRing = Math.floor(dotCount / ringCount) + ring * 10;

      for (let i = 0; i < dotsInRing; i++) {
        const angle = (i / dotsInRing) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const size = 2 + Math.random() * 2;
        const opacity = 0.3 + Math.random() * 0.4;

        dots.push({ x, y, size, opacity, ring });
      }
    }

    // Inner structure dots
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * 2 * Math.PI;
      const radius = 150 + (i % 3) * 40;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const size = 1.5 + Math.random();
      const opacity = 0.2 + Math.random() * 0.3;

      dots.push({ x, y, size, opacity, ring: -1 });
    }

    return dots;
  }, []);

  // Inner orbital rings
  const orbitalRings = useMemo(() => [
    { radius: 200, opacity: 0.15, dashArray: "5 15" },
    { radius: 280, opacity: 0.12, dashArray: "3 20" },
    { radius: 350, opacity: 0.1, dashArray: "2 25" },
  ], []);

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none z-[1]"
      style={{
        scale: scale,
        y: y,
        opacity: opacity,
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for glow */}
          <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mood.colors.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={mood.colors.primary} stopOpacity="0" />
          </radialGradient>

          {/* Filter for soft glow */}
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbital rings */}
        {orbitalRings.map((ring, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="500"
            cy="500"
            r={ring.radius}
            fill="none"
            stroke={mood.colors.primary}
            strokeWidth="0.5"
            strokeDasharray={ring.dashArray}
            opacity={ring.opacity}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: rotationSpeed + i * 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: "500px 500px",
            }}
          />
        ))}

        {/* Counter-rotating inner rings */}
        {orbitalRings.slice(0, 2).map((ring, i) => (
          <motion.circle
            key={`ring-ccw-${i}`}
            cx="500"
            cy="500"
            r={ring.radius * 0.7}
            fill="none"
            stroke={mood.colors.secondary}
            strokeWidth="0.3"
            strokeDasharray="2 18"
            opacity={ring.opacity * 0.7}
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: (rotationSpeed + i * 25) * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: "500px 500px",
            }}
          />
        ))}

        {/* Main dotted circle */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: rotationSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "500px 500px" }}
          filter="url(#soft-glow)"
        >
          {circleDots.map((dot, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill={mood.colors.primary}
              opacity={dot.opacity}
              animate={{
                opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.g>

        {/* Central glow */}
        <motion.circle
          cx="500"
          cy="500"
          r="80"
          fill={`url(#dot-glow)`}
          animate={{
            r: [80, 100, 80],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Center dot */}
        <motion.circle
          cx="500"
          cy="500"
          r="8"
          fill={mood.colors.primary}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </svg>

      {/* Outer particle field */}
      <motion.div
        className="absolute inset-[-200px]"
        animate={{ rotate: [0, -360] }}
        transition={{
          duration: rotationSpeed * 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * 360;
          const distance = 350 + (i % 3) * 40;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? mood.colors.primary : mood.colors.secondary,
                left: "50%",
                top: "50%",
                x: Math.cos((angle * Math.PI) / 180) * distance - 3,
                y: Math.sin((angle * Math.PI) / 180) * distance - 3,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CentralDottedCircle;
