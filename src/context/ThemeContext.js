import React, { createContext, useContext, useState, useMemo } from "react";

const themes = {
  purple: {
    name: "Purple Dream",
    primary: "#8b5cf6",
    secondary: "#ec4899",
    accent: "#3b82f6",
    background: "#111113",
    surface: "#1a1a2e",
    surfaceLight: "#16213e",
    text: "#ffffff",
    textMuted: "#a1a1aa",
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    gradientText: "from-purple-400 via-pink-400 to-blue-400",
    cardBg: "from-gray-900/80 via-purple-900/20 to-gray-900/80",
    glow: "purple",
  },
  ocean: {
    name: "Ocean Blue",
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    accent: "#22d3ee",
    background: "#0c1929",
    surface: "#111827",
    surfaceLight: "#1e3a5f",
    text: "#ffffff",
    textMuted: "#94a3b8",
    gradient: "from-cyan-600 via-blue-600 to-teal-600",
    gradientText: "from-cyan-400 via-blue-400 to-teal-400",
    cardBg: "from-gray-900/80 via-blue-900/20 to-gray-900/80",
    glow: "cyan",
  },
  forest: {
    name: "Forest",
    primary: "#22c55e",
    secondary: "#10b981",
    accent: "#34d399",
    background: "#0a1a0a",
    surface: "#111827",
    surfaceLight: "#1a2e1a",
    text: "#ffffff",
    textMuted: "#a3e635",
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    gradientText: "from-green-400 via-emerald-400 to-teal-400",
    cardBg: "from-gray-900/80 via-green-900/20 to-gray-900/80",
    glow: "green",
  },
  sunset: {
    name: "Sunset",
    primary: "#f97316",
    secondary: "#ef4444",
    accent: "#fbbf24",
    background: "#1a0a0a",
    surface: "#111827",
    surfaceLight: "#2a1a1a",
    text: "#ffffff",
    textMuted: "#fca5a5",
    gradient: "from-orange-600 via-red-600 to-yellow-600",
    gradientText: "from-orange-400 via-red-400 to-yellow-400",
    cardBg: "from-gray-900/80 via-red-900/20 to-gray-900/80",
    glow: "orange",
  },
  midnight: {
    name: "Midnight",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
    background: "#080810",
    surface: "#0f0f1a",
    surfaceLight: "#1a1a2e",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    gradient: "from-indigo-600 via-violet-600 to-purple-600",
    gradientText: "from-indigo-400 via-violet-400 to-purple-400",
    cardBg: "from-gray-900/80 via-indigo-900/20 to-gray-900/80",
    glow: "indigo",
  },
  neon: {
    name: "Neon",
    primary: "#f0abfc",
    secondary: "#22d3d3",
    accent: "#a3e635",
    background: "#0a0a0a",
    surface: "#111111",
    surfaceLight: "#1a1a1a",
    text: "#ffffff",
    textMuted: "#d1d5db",
    gradient: "from-pink-600 via-cyan-600 to-green-600",
    gradientText: "from-pink-400 via-cyan-400 to-green-400",
    cardBg: "from-gray-900/80 via-pink-900/20 to-gray-900/80",
    glow: "pink",
  },
};

const ThemeContext = createContext({
  theme: themes.purple,
  themeName: "purple",
  setTheme: () => {},
  themes: themes,
});

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("purple");

  const value = useMemo(() => ({
    theme: themes[themeName],
    themeName,
    setTheme: setThemeName,
    themes,
  }), [themeName]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
