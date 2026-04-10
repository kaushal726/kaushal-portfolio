import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const moods = {
  productive: {
    id: "productive",
    name: "Productive",
    icon: "rocket",
    tagline: "Clean, focused, professional",
    colors: {
      primary: "#6366f1",
      secondary: "#818cf8",
      accent: "#a5b4fc",
      background: "#0f172a",
      surface: "#1e293b",
      surfaceLight: "#334155",
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      gradient: "from-indigo-600 via-purple-600 to-blue-600",
      gradientText: "from-indigo-400 via-purple-400 to-blue-400",
      cardBg: "from-slate-900/90 to-slate-800/90",
      glow: "indigo",
    },
    typography: {
      headingWeight: "700",
      bodyWeight: "400",
      letterSpacing: "tight",
      lineHeight: "relaxed",
    },
    spacing: {
      sectionPadding: "py-24",
      cardPadding: "p-8",
      gap: "gap-8",
    },
    animation: {
      speed: "slow",
      intensity: "subtle",
      parallax: true,
      bounce: false,
      float: false,
      blur: false,
    },
    layout: {
      style: "grid",
      cardStyle: "sharp",
      borderRadius: "rounded-xl",
      shadows: "elevation-2",
    },
    scroll: {
      transitionDuration: 800,
      easing: [0.4, 0, 0.2, 1],
      staggerDelay: 150,
    },
  },
  party: {
    id: "party",
    name: "Party",
    icon: "sparkles",
    tagline: "Vibrant, energetic, wild",
    colors: {
      primary: "#f472b6",
      secondary: "#c084fc",
      accent: "#22d3ee",
      background: "#0c0a1d",
      surface: "#1a1033",
      surfaceLight: "#2d1f4e",
      text: "#ffffff",
      textMuted: "#e9d5ff",
      gradient: "from-pink-600 via-purple-600 to-cyan-600",
      gradientText: "from-pink-400 via-purple-400 to-cyan-400",
      cardBg: "from-purple-900/80 to-pink-900/80",
      glow: "pink",
    },
    typography: {
      headingWeight: "900",
      bodyWeight: "500",
      letterSpacing: "wide",
      lineHeight: "normal",
    },
    spacing: {
      sectionPadding: "py-16",
      cardPadding: "p-6",
      gap: "gap-6",
    },
    animation: {
      speed: "fast",
      intensity: "high",
      parallax: false,
      bounce: true,
      float: true,
      blur: true,
    },
    layout: {
      style: "fluid",
      cardStyle: "rounded-3xl",
      borderRadius: "rounded-3xl",
      shadows: "glow",
    },
    scroll: {
      transitionDuration: 400,
      easing: [0.68, -0.55, 0.265, 1.55],
      staggerDelay: 80,
    },
  },
  calm: {
    id: "calm",
    name: "Calm",
    icon: "moon",
    tagline: "Peaceful, serene, minimal",
    colors: {
      primary: "#6ee7b7",
      secondary: "#a78bfa",
      accent: "#7dd3fc",
      background: "#0a0f1a",
      surface: "#111827",
      surfaceLight: "#1f2937",
      text: "#e5e7eb",
      textMuted: "#9ca3af",
      gradient: "from-emerald-500 via-violet-500 to-sky-500",
      gradientText: "from-emerald-400 via-violet-400 to-sky-400",
      cardBg: "from-gray-900/70 to-emerald-900/20",
      glow: "emerald",
    },
    typography: {
      headingWeight: "300",
      bodyWeight: "300",
      letterSpacing: "normal",
      lineHeight: "loose",
    },
    spacing: {
      sectionPadding: "py-40",
      cardPadding: "p-12",
      gap: "gap-12",
    },
    animation: {
      speed: "very-slow",
      intensity: "minimal",
      parallax: true,
      bounce: false,
      float: false,
      blur: false,
    },
    layout: {
      style: "airy",
      cardStyle: "soft",
      borderRadius: "rounded-2xl",
      shadows: "subtle",
    },
    scroll: {
      transitionDuration: 1200,
      easing: [0.25, 0.1, 0.25, 1],
      staggerDelay: 300,
    },
  },
  focused: {
    id: "focused",
    name: "Focused",
    icon: "target",
    tagline: "Distraction-free, sharp, clean",
    colors: {
      primary: "#fafafa",
      secondary: "#d4d4d4",
      accent: "#737373",
      background: "#000000",
      surface: "#0a0a0a",
      surfaceLight: "#171717",
      text: "#ffffff",
      textMuted: "#525252",
      gradient: "from-white via-gray-300 to-gray-500",
      gradientText: "from-white via-gray-200 to-gray-400",
      cardBg: "from-black to-neutral-900",
      glow: "white",
    },
    typography: {
      headingWeight: "600",
      bodyWeight: "400",
      letterSpacing: "tighter",
      lineHeight: "tight",
    },
    spacing: {
      sectionPadding: "py-32",
      cardPadding: "p-10",
      gap: "gap-10",
    },
    animation: {
      speed: "none",
      intensity: "none",
      parallax: false,
      bounce: false,
      float: false,
      blur: false,
    },
    layout: {
      style: "minimal",
      cardStyle: "flat",
      borderRadius: "rounded-none",
      shadows: "none",
    },
    scroll: {
      transitionDuration: 600,
      easing: [0, 0, 1, 1],
      staggerDelay: 200,
    },
  },
  experimental: {
    id: "experimental",
    name: "Experimental",
    icon: "flame",
    tagline: "Creative, bold, unexpected",
    colors: {
      primary: "#fb923c",
      secondary: "#f472b6",
      accent: "#a3e635",
      background: "#0c0c0c",
      surface: "#1a0a1a",
      surfaceLight: "#2d1525",
      text: "#ffffff",
      textMuted: "#fda4af",
      gradient: "from-orange-600 via-pink-600 to-lime-600",
      gradientText: "from-orange-400 via-pink-400 to-lime-400",
      cardBg: "from-orange-900/30 to-pink-900/30",
      glow: "orange",
    },
    typography: {
      headingWeight: "800",
      bodyWeight: "400",
      letterSpacing: "-0.02em",
      lineHeight: "normal",
    },
    spacing: {
      sectionPadding: "py-20",
      cardPadding: "p-5",
      gap: "gap-4",
    },
    animation: {
      speed: "dynamic",
      intensity: "maximum",
      parallax: true,
      bounce: true,
      float: true,
      blur: true,
    },
    layout: {
      style: "mosaic",
      cardStyle: "mixed",
      borderRadius: "rounded-none",
      shadows: "colorful",
    },
    scroll: {
      transitionDuration: 300,
      easing: [0.175, 0.885, 0.32, 1.275],
      staggerDelay: 50,
    },
  },
};

const MoodContext = createContext({
  mood: moods.productive,
  moodName: "productive",
  setMood: () => {},
  moods: moods,
  isRevealed: false,
  setRevealed: () => {},
});

export const MoodProvider = ({ children }) => {
  const [moodName, setMoodName] = useState(() => {
    const saved = localStorage.getItem("portfolio-mood");
    return saved && moods[saved] ? saved : "productive";
  });
  const [isRevealed, setRevealed] = useState(() => {
    const saved = localStorage.getItem("portfolio-revealed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-mood", moodName);
  }, [moodName]);

  useEffect(() => {
    localStorage.setItem("portfolio-revealed", isRevealed);
  }, [isRevealed]);

  const setMood = useCallback((moodId) => {
    if (moods[moodId]) {
      setMoodName(moodId);
    }
  }, []);

  const value = useMemo(() => ({
    mood: moods[moodName],
    moodName,
    setMood,
    moods,
    isRevealed,
    setRevealed,
  }), [moodName, setMood, isRevealed]);

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);

export default MoodContext;
