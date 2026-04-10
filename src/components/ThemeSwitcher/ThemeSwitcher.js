import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, themeName, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeKeys = Object.keys(themes);

  return (
    <div className="fixed top-4 right-4 z-[100]">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
        style={{ backgroundColor: theme.surface }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Current theme color indicator */}
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        />
        <div className="absolute inset-0 border border-white/10 rounded-full" />

        {/* Gear icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </motion.button>

      {/* Theme Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-72 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-4 overflow-hidden"
            style={{ backgroundColor: theme.surface }}
          >
            {/* Header */}
            <div className="mb-4 pb-3 border-b border-white/10">
              <h3 className="text-white font-bold text-lg">Choose Theme</h3>
              <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                {theme.name}
              </p>
            </div>

            {/* Theme Options */}
            <div className="grid grid-cols-2 gap-3">
              {themeKeys.map((key) => {
                const t = themes[key];
                const isActive = themeName === key;

                return (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setIsOpen(false);
                    }}
                    className={`relative p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-white/40 shadow-lg"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    style={{ backgroundColor: t.surface }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient preview */}
                    <div
                      className="w-full h-8 rounded-lg mb-2"
                      style={{
                        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                      }}
                    />

                    {/* Theme name */}
                    <span className="text-xs font-medium text-white block text-left">
                      {t.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTheme"
                        className="absolute inset-0 rounded-xl border-2 border-white/40"
                        style={{
                          borderColor: t.primary,
                        }}
                      />
                    )}

                    {/* Checkmark for active */}
                    {isActive && (
                      <div
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: t.primary }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Close button hint */}
            <p className="text-xs text-center mt-4" style={{ color: theme.textMuted }}>
              Click outside to close
            </p>
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

export default ThemeSwitcher;
