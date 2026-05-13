import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import Particles from "react-tsparticles";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import scrollImage from "./assets/arrowA.png";
import Mainnav from "./components/Navbar/Mainnav";
import Index from "./components/Index";
import Project from "./components/Projects/Project";
import "./fonts/AmsterdamBright-DOPmD.woff";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { MoodProvider, useMood } from "./context/MoodContext";
import MoodSelector from "./components/MoodSelector/MoodSelector";
import MoodSwitcher from "./components/MoodSelector/MoodSwitcher";
import MouseFollower from "./components/Common/MouseFollower";

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

function ParticlesBg() {
  const { mood } = useMood();

  // Reduce particles for better performance
  const particlesIntensity = mood.animation.intensity === "high" || mood.animation.intensity === "maximum" ? 40 : 25;
  const particleSpeed = mood.animation.speed === "fast" || mood.animation.speed === "dynamic" ? 1.5 : 0.8;

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fullScreen: { enable: true, zIndex: 0 },
    fpsLimit: 40, // Reduced for performance
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: false, // Disabled for performance
      },
      modes: {
        grab: {
          distance: 150,
          duration: 0.3,
          links: {
            opacity: 0.4,
          },
        },
      },
    },
    particles: {
      color: { value: mood.colors.primary },
      links: {
        color: mood.colors.primary,
        distance: 80,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: particleSpeed,
      },
      number: { value: particlesIntensity },
      opacity: { value: 0.5 },
      size: { value: 2 },
    },
    detectRetina: true,
  };

  return (
    <Particles
      key={mood.id} // Force re-render on mood change
      id="tsparticles"
      init={async (engine) => {
        await import("tsparticles").then(({ loadFull }) => loadFull(engine));
      }}
      options={particlesOptions}
    />
  );
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

      {/* Particles - key forces recreation on mood change */}
      <ParticlesBg />

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
