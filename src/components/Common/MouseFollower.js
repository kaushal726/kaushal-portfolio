import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMood } from "../../context/MoodContext";
import { useIsTouch } from "../../hooks/useIsTouch";

const MouseFollower = () => {
  const { mood } = useMood();
  const isTouch = useIsTouch();
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoothed cursor positions with different delays
  const cursor1X = useSpring(cursorX, { damping: 30, stiffness: 300 });
  const cursor1Y = useSpring(cursorY, { damping: 30, stiffness: 300 });

  const cursor2X = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const cursor2Y = useSpring(cursorY, { damping: 20, stiffness: 150 });

  const cursor3X = useSpring(cursorX, { damping: 15, stiffness: 100 });
  const cursor3Y = useSpring(cursorY, { damping: 15, stiffness: 100 });

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible, isTouch]);

  // No cursor follower on touch devices
  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          x: cursor1X,
          y: cursor1Y,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: mood.colors.primary,
          boxShadow: `0 0 20px ${mood.colors.primary}, 0 0 40px ${mood.colors.primary}50`,
        }}
      />

      {/* First trailing circle - medium */}
      <motion.div
        className="absolute w-12 h-12 rounded-full"
        style={{
          x: cursor2X,
          y: cursor2Y,
          translateX: "-50%",
          translateY: "-50%",
          border: `1px solid ${mood.colors.primary}40`,
          backgroundColor: `${mood.colors.primary}08`,
        }}
      />

      {/* Second trailing circle - large */}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          x: cursor3X,
          y: cursor3Y,
          translateX: "-50%",
          translateY: "-50%",
          border: `1px solid ${mood.colors.secondary}30`,
          backgroundColor: `${mood.colors.secondary}05`,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${mood.colors.primary}15, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Sparkle dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: i % 2 === 0 ? mood.colors.primary : mood.colors.secondary,
            opacity: 0.4,
          }}
          animate={{
            x: [
              `${Math.cos((i * 60 * Math.PI) / 180) * 30}px`,
              `${Math.cos(((i * 60 + 120) * Math.PI) / 180) * 30}px`,
              `${Math.cos(((i * 60 + 240) * Math.PI) / 180) * 30}px`,
            ],
            y: [
              `${Math.sin((i * 60 * Math.PI) / 180) * 30}px`,
              `${Math.sin(((i * 60 + 120) * Math.PI) / 180) * 30}px`,
              `${Math.sin(((i * 60 + 240) * Math.PI) / 180) * 30}px`,
            ],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            style={{
              x: cursor1X,
              y: cursor1Y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MouseFollower;
