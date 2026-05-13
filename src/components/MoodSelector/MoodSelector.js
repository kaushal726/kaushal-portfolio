import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const SELECTOR_STYLES = `
  .ms-marquee {
    display: inline-flex;
    animation: msMarquee 38s linear infinite;
    will-change: transform;
  }
  .ms-marquee.reverse { animation-direction: reverse; }
  @keyframes msMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* CSS-only mood row — no React state for hover */
  .ms-row {
    --p: #ffffff;
    --s: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 0;
    cursor: pointer;
    text-align: left;
    background: transparent;
    border: none;
    width: 100%;
  }
  @media (min-width: 640px) {
    .ms-row { gap: 1.5rem; padding: 0.85rem 0; }
  }
  .ms-row .ms-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.3);
    width: 2rem;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }
  @media (min-width: 640px) { .ms-row .ms-num { font-size: 0.85rem; } }
  .ms-row .ms-label {
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.05em;
    color: #fff;
    font-size: clamp(2rem, 7vw, 5.5rem);
    transition: transform 0.3s ease, color 0.2s ease;
    will-change: transform;
  }
  .ms-row .ms-tag {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: rgba(255,255,255,0.35);
    opacity: 0;
    transform: translateX(-12px);
    transition: opacity 0.25s ease, transform 0.25s ease, color 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ms-row .ms-tag { font-size: 0.8rem; }
  }
  .ms-row:hover .ms-label  { transform: translateX(14px); color: var(--p); }
  .ms-row:hover .ms-num    { color: var(--p); }
  .ms-row:hover .ms-tag    { opacity: 1; transform: translateX(0); color: var(--p); }

  /* Color dot beside label */
  .ms-row .ms-swatch {
    width: 0.6rem; height: 0.6rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--p), var(--s));
    box-shadow: 0 0 12px var(--p);
    flex-shrink: 0;
    opacity: 0.55;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
  .ms-row:hover .ms-swatch { opacity: 1; transform: scale(1.25); }
`;

const MARQUEE_TEXT =
  "CHOOSE YOUR MOOD · PICK A VIBE · SET THE TONE · CHOOSE YOUR MOOD · PICK A VIBE · SET THE TONE · ";

const MoodSelector = () => {
  const { moods, setMood, setRevealed } = useMood();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredMood, setHoveredMood] = useState(null);

  const handleSelect = (moodId) => {
    setSelectedMood(moodId);
    setIsTransitioning(true);
    setTimeout(() => {
      setMood(moodId);
      setTimeout(() => setRevealed(true), 250);
    }, 700);
  };

  const handleSkip = () => {
    setMood("productive");
    setRevealed(true);
  };

  const moodKeys = Object.keys(moods);
  const ambientMood = moods[hoveredMood] || moods["productive"];

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning ? (
        <motion.div
          key="selector"
          className="fixed inset-0 z-[200] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <style>{SELECTOR_STYLES}</style>

          {/* Background */}
          <div
            className="absolute inset-0"
            style={{ background: "#0a0a14" }}
          />

          {/* Marquee strips */}
          <div
            className="absolute pointer-events-none whitespace-nowrap select-none w-full"
            style={{ top: "12%" }}
          >
            <div
              className="ms-marquee font-black"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 10rem)",
                letterSpacing: "-0.05em",
                color: "transparent",
                WebkitTextStroke: `1px ${ambientMood.colors.primary}25`,
                lineHeight: 1,
                transition: "all 0.5s ease",
              }}
            >
              <span className="pr-12">{MARQUEE_TEXT}</span>
              <span className="pr-12">{MARQUEE_TEXT}</span>
            </div>
          </div>
          <div
            className="absolute pointer-events-none whitespace-nowrap select-none w-full"
            style={{ bottom: "10%" }}
          >
            <div
              className="ms-marquee reverse font-black"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 8rem)",
                letterSpacing: "-0.05em",
                color: "transparent",
                WebkitTextStroke: `1px ${ambientMood.colors.secondary}20`,
                lineHeight: 1,
                transition: "all 0.5s ease",
              }}
            >
              <span className="pr-12">{MARQUEE_TEXT}</span>
              <span className="pr-12">{MARQUEE_TEXT}</span>
            </div>
          </div>

          {/* Ambient orb — shifts to hovered mood color */}
          <motion.div
            className="absolute pointer-events-none rounded-full blur-3xl"
            style={{
              width: 700,
              height: 700,
              top: "25%",
              left: "10%",
              background: `radial-gradient(circle, ${ambientMood.colors.primary}30, transparent 60%)`,
              transition: "background 0.5s ease",
            }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
          <motion.div
            className="absolute pointer-events-none rounded-full blur-3xl"
            style={{
              width: 600,
              height: 600,
              bottom: "20%",
              right: "10%",
              background: `radial-gradient(circle, ${ambientMood.colors.secondary}25, transparent 60%)`,
              transition: "background 0.5s ease",
            }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 16, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
            {/* Question */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mb-10 sm:mb-14"
            >
              <p
                className="text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-3 sm:mb-4 font-bold"
                style={{
                  color: ambientMood.colors.primary,
                  transition: "color 0.5s ease",
                }}
              >
                Welcome · Step 01
              </p>
              <h1
                className="font-black text-white leading-[0.95]"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 6rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                What's your{" "}
                <span
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${ambientMood.colors.primary}, ${ambientMood.colors.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transition: "all 0.5s ease",
                  }}
                >
                  mood?
                </span>
              </h1>
              <p
                className="text-sm sm:text-base mt-4 max-w-xl"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Pick a vibe — it changes how this whole site looks and moves.
                You can switch any time.
              </p>
            </motion.div>

            {/* Mood rows */}
            <ul className="space-y-0 max-w-3xl">
              {moodKeys.map((key, i) => {
                const m = moods[key];
                return (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.07,
                      type: "spring",
                      stiffness: 80,
                    }}
                  >
                    <button
                      onClick={() => handleSelect(key)}
                      onMouseEnter={() => setHoveredMood(key)}
                      onMouseLeave={() => setHoveredMood(null)}
                      className="ms-row group"
                      style={{
                        "--p": m.colors.primary,
                        "--s": m.colors.secondary,
                      }}
                    >
                      <span className="ms-num">
                        0{i + 1}
                      </span>
                      <span className="ms-swatch" />
                      <span className="ms-label">{m.name}</span>
                      <span className="ms-tag hidden sm:inline">
                        {m.tagline}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Skip / footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 sm:mt-14 flex flex-wrap items-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.4em]"
            >
              <button
                onClick={handleSkip}
                className="font-bold transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
              >
                Skip — Use Default
              </button>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>
                Click any mood to enter
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* Transition screen */
        <motion.div
          key="transition"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${moods[selectedMood]?.colors.primary}, ${moods[selectedMood]?.colors.secondary})`,
          }}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2), transparent 50%)",
            }}
          />

          <motion.div
            className="relative text-center px-6"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.p
              className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-bold text-white/80 mb-3"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Entering
            </motion.p>
            <motion.h2
              className="font-black text-white leading-none"
              style={{
                fontSize: "clamp(3.5rem, 14vw, 11rem)",
                letterSpacing: "-0.06em",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 80 }}
            >
              {moods[selectedMood]?.name}
            </motion.h2>
            <motion.p
              className="text-white/70 text-sm sm:text-base mt-4 italic"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {moods[selectedMood]?.tagline}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoodSelector;
