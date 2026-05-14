import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useMood } from "../../context/MoodContext";
import { useIsTouch } from "../../hooks/useIsTouch";

// A global "torch" that follows the cursor on desktop — wherever the mouse
// goes, that area of the page gets softly highlighted. Disabled on touch.
const CursorTorch = () => {
  const { mood } = useMood();
  const isTouch = useIsTouch();

  // Start off-screen so nothing is lit until the mouse moves.
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    if (isTouch) return;
    const handler = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isTouch, x, y]);

  // Radial gradient torch — brightest at the cursor, soft falloff.
  const torch = useMotionTemplate`radial-gradient(340px circle at ${sx}px ${sy}px, ${mood.colors.primary}26, ${mood.colors.primary}0d 40%, transparent 72%)`;

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[55]"
      style={{ background: torch, mixBlendMode: "screen" }}
    />
  );
};

export default CursorTorch;
