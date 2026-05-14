import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMood } from "../../context/MoodContext";
import { useIsTouch } from "../../hooks/useIsTouch";

/* ---------- Magnetic wrapper ---------- */
function Magnetic({ children, strength = 10 }) {
  const isTouch = useIsTouch();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  if (isTouch) return <>{children}</>;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength);
    y.set(((e.clientY - cy) / r.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}

const MoodSwitcher = () => {
  const { mood, moodName, setMood, moods } = useMood();
  const moodKeys = Object.keys(moods);

  return (
    <div className="fixed top-3 sm:top-4 right-3 sm:right-4 z-[100]">
      <Magnetic strength={8}>
        <div className="relative">
          {/* Soft glow behind matches current mood */}
          <div
            className="absolute -inset-1 rounded-full opacity-50 blur-md pointer-events-none transition-colors duration-500"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}50, transparent 70%)`,
            }}
          />

          {/* Palette pill */}
          <div
            className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
            }}
          >
            {moodKeys.map((key) => {
              const m = moods[key];
              const isActive = moodName === key;
              return (
                <button
                  key={key}
                  onClick={() => setMood(key)}
                  aria-label={`Switch to ${m.name} mood`}
                  className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full focus:outline-none"
                  style={{
                    background: `linear-gradient(135deg, ${m.colors.primary}, ${m.colors.secondary})`,
                    boxShadow: isActive
                      ? `0 0 0 1px ${m.colors.primary}, 0 0 14px ${m.colors.primary}80`
                      : "inset 0 0 0 1px rgba(255,255,255,0.15)",
                  }}
                >
                  {/* Sliding active ring */}
                  {isActive && (
                    <motion.span
                      layoutId="mood-active-ring"
                      className="absolute -inset-1 rounded-full pointer-events-none"
                      style={{ border: `1.5px solid ${m.colors.primary}` }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                      }}
                    />
                  )}
                  {/* Inner pulse on active only */}
                  {isActive && (
                    <motion.span
                      className="absolute inset-1 rounded-full pointer-events-none"
                      style={{ background: "#fff", mixBlendMode: "overlay" }}
                      animate={{ opacity: [0.15, 0.4, 0.15] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Magnetic>
    </div>
  );
};

export default MoodSwitcher;
