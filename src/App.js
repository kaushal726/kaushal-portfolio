import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import scrollImage from "./assets/arrowA.png";
import Mainnav from "./components/Navbar/Mainnav";
import Index from "./components/Index";
import Project from "./components/Projects/Project";
import Game from "./components/Game/Game";
import "./fonts/AmsterdamBright-DOPmD.woff";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { MoodProvider, useMood } from "./context/MoodContext";
import MoodSelector from "./components/MoodSelector/MoodSelector";
import MoodSwitcher from "./components/MoodSelector/MoodSwitcher";
import MouseFollower from "./components/Common/MouseFollower";
import CursorTorch from "./components/Common/CursorTorch";
import ParticleField from "./components/Common/ParticleField";

// Scroll to top on route change — resets every possible scroll container
// (window + html + body + any inner .fancy-scrollbar div) synchronously
// before paint, then once more after the next frame as a safety net.
function ScrollToTop() {
  const location = useLocation();

  // Disable browser auto scroll-restoration once
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      // Body.js wraps the home page in <div class="overflow-y-auto fancy-scrollbar">
      // which is its own scroll container — reset that too.
      document.querySelectorAll(".fancy-scrollbar").forEach((el) => {
        el.scrollTop = 0;
      });
    };
    reset();
    // Run again after layout in case something else nudged scroll mid-mount.
    const raf = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const { mood, isRevealed } = useMood();
  const [scrolling, setScrolling] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop({ smooth: true, duration: 500 });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App relative" style={{ backgroundColor: mood.colors.background }}>
      <Toaster />

      {/* Canvas constellation background */}
      <ParticleField />

      {/* Minimal overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,0.03) 0%,
            rgba(0,0,0,0.01) 50%,
            rgba(0,0,0,0.05) 100%)`,
        }}
      />

      {/* Mood Selector Overlay */}
      {!isRevealed && <MoodSelector />}

      {/* Mood Switcher */}
      {isRevealed && <MoodSwitcher />}

      {/* Mouse Follower */}
      <MouseFollower />

      {/* Global cursor torch — highlights wherever the mouse goes (desktop) */}
      <CursorTorch />

      {/* Scroll to top button */}
      <div className="flex">
        <button
          onClick={scrollToTop}
          className={`${scrolling ? "animate-bounce w-10 md:w-14 m-3 scroll-to-top text-white fixed z-50 bottom-0 right-0" : "hidden"}`}
          style={{ color: mood.colors.primary }}
        >
          <img src={scrollImage} alt="scroll to top" />
        </button>
      </div>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Mainnav />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="project" element={<Project />} />
            <Route path="game" element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <MoodProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </MoodProvider>
  );
}

export default App;
