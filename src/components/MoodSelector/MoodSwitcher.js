import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const MoodIcon = ({ icon, size = 24, color }) => {
  const icons = {
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: size, height: size }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: size, height: size }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: size, height: size }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: size, height: size }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    flame: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" style={{ width: size, height: size }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48zM12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  };
  return icons[icon] || icons.rocket;
};

const MoodSwitcher = () => {
  const { mood, moodName, setMood, moods } = useMood();
  const [isOpen, setIsOpen] = useState(false);

  const moodKeys = Object.keys(moods);

  return (
    <div className="fixed top-4 right-4 z-[100]">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl shadow-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${mood.colors.surface}, ${mood.colors.background})`,
          border: `1px solid ${mood.colors.primary}40`,
          boxShadow: `0 4px 20px ${mood.colors.primary}30`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MoodIcon icon={mood.icon} size={22} color={mood.colors.primary} />
        </motion.div>

        {/* Glow ring on active */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
          }}
          animate={{ opacity: isOpen ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>

      {/* Mood Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-64 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${mood.colors.surface}, ${mood.colors.background})`,
              border: `1px solid ${mood.colors.primary}30`,
            }}
          >
            {/* Animated top bar */}
            <div
              className="h-0.5 w-full"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            />

            <div className="p-3">
              {/* Header */}
              <div className="mb-2 pb-2 flex items-center justify-between" style={{ borderColor: `${mood.colors.primary}20` }}>
                <h3 className="text-sm font-bold text-white">Change Mood</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${mood.colors.primary}20`, color: mood.colors.primary }}>
                  {mood.name}
                </span>
              </div>

              {/* Mood Options */}
              <div className="space-y-1">
                {moodKeys.map((key) => {
                  const m = moods[key];
                  const isActive = moodName === key;

                  return (
                    <motion.button
                      key={key}
                      onClick={() => {
                        setMood(key);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                      style={{
                        background: isActive ? `linear-gradient(135deg, ${m.colors.primary}25, ${m.colors.secondary}15)` : "transparent",
                        border: `1px solid ${isActive ? m.colors.primary : "transparent"}`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${m.colors.primary}, ${m.colors.secondary})`
                            : `${m.colors.primary}15`,
                        }}
                      >
                        <MoodIcon
                          icon={m.icon}
                          size={18}
                          color={isActive ? "#ffffff" : m.colors.primary}
                        />
                      </div>

                      {/* Text */}
                      <div className="text-left flex-1">
                        <span className="text-sm font-medium text-white block">{m.name}</span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: m.colors.primary }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Close hint */}
              <p className="text-xs text-center mt-3" style={{ color: mood.colors.textMuted }}>
                Click outside to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodSwitcher;
