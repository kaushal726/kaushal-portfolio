import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const MoodIcon = ({ icon, size = 32, color }) => {
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

const MoodSelector = () => {
  const { moods, setMood, setRevealed } = useMood();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelectMood = (moodId) => {
    setSelectedMood(moodId);
    setIsTransitioning(true);

    setTimeout(() => {
      setMood(moodId);
      setTimeout(() => {
        setRevealed(true);
      }, 300);
    }, 800);
  };

  const moodKeys = Object.keys(moods);
  const currentMood = selectedMood || "productive";

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning ? (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Blur backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
            onClick={() => {
              setMood("productive");
              setRevealed(true);
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${moods[currentMood].colors.surface}, ${moods[currentMood].colors.background})`,
              border: `1px solid ${moods[currentMood].colors.primary}40`,
            }}
            initial={{ scale: 0.85, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            {/* Animated gradient top bar */}
            <motion.div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${moods[currentMood].colors.primary}, ${moods[currentMood].colors.secondary}, ${moods[currentMood].colors.primary})`,
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Glow effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: moods[currentMood].colors.primary }}
            />

            <div className="relative p-6 md:p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${moods[currentMood].colors.primary}, ${moods[currentMood].colors.secondary})`,
                    boxShadow: `0 8px 32px ${moods[currentMood].colors.primary}40`,
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <MoodIcon icon="sparkles" size={32} color="#ffffff" />
                </motion.div>

                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Choose Your Mood
                </h2>
                <p className="text-sm" style={{ color: moods[currentMood].colors.textMuted }}>
                  Select a vibe that matches your energy
                </p>
              </motion.div>

              {/* Mood Options */}
              <motion.div
                className="grid grid-cols-1 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {moodKeys.map((moodId, index) => {
                  const mood = moods[moodId];
                  const isSelected = selectedMood === moodId;

                  return (
                    <motion.button
                      key={moodId}
                      onClick={() => handleSelectMood(moodId)}
                      className="relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer overflow-hidden"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${mood.colors.primary}25, ${mood.colors.secondary}15)`
                          : `${mood.colors.surface}60`,
                        border: `1px solid ${isSelected ? mood.colors.primary : mood.colors.surfaceLight}`,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.06 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(90deg, ${mood.colors.primary}10, transparent)`,
                        }}
                      />

                      {/* Icon */}
                      <motion.div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isSelected
                            ? `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`
                            : `${mood.colors.primary}15`,
                          boxShadow: isSelected ? `0 4px 20px ${mood.colors.primary}40` : "none",
                        }}
                        animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <MoodIcon
                          icon={mood.icon}
                          size={26}
                          color={isSelected ? "#ffffff" : mood.colors.primary}
                        />
                      </motion.div>

                      {/* Text */}
                      <div className="relative flex-1 text-left">
                        <h3 className="text-white font-semibold text-base">{mood.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: mood.colors.textMuted }}>
                          {mood.tagline}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <motion.div
                          className="relative w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: mood.colors.primary }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Skip option */}
              <motion.p
                className="text-center mt-6 text-xs cursor-pointer transition-colors"
                style={{ color: moods[currentMood].colors.textMuted }}
                onClick={() => {
                  setMood("productive");
                  setRevealed(true);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ color: "#ffffff" }}
              >
                Press Enter or skip to continue with default
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="transition"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${moods[selectedMood]?.colors.primary}, ${moods[selectedMood]?.colors.secondary})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <MoodIcon icon={moods[selectedMood]?.icon} size={64} color="#ffffff" />
            </motion.div>
            <motion.h2
              className="text-white text-3xl font-bold mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {moods[selectedMood]?.name} Mode
            </motion.h2>
            <motion.p
              className="text-white/70 mt-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Entering your vibe...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoodSelector;
