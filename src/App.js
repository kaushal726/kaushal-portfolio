import "./App.css";
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import scrollImage from "./assets/arrowA.png";
import Mainnav from "./components/Navbar/Mainnav";
import Index from "./components/Index";
import Project from "./components/Projects/Project";
import "./fonts/AmsterdamBright-DOPmD.woff";
import { Toaster } from "react-hot-toast";

function App() {
  const [scrolling, setScrolling] = useState(false);
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500,
    });
  };
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App background relative ">
      <Toaster />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fullScreen: {
            enable: true,
            zIndex: 0,
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 120,
                links: {
                  opacity: 0.4,
                },
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
            },
            number: {
              value: 20,
            },
            opacity: {
              value: 0.4,
            },
            size: {
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />
      <div className="flex">
        <button
          onClick={scrollToTop}
          className={`${scrolling ? "animate-bounce w-10 md:w-14 m-3 scroll-to-top text-white fixed z-50 bottom-0 right-0" : "hidden"}`}
        >
          <img src={scrollImage} alt=""></img>
        </button>
      </div>
      <BrowserRouter>
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

export default App;
