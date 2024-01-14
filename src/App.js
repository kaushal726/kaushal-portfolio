import './App.css';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { loadFull } from "tsparticles";
import Particles from 'react-tsparticles'
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import scrollImage from './assets/arrowA.png'
import Mainnav from './components/Navbar/Mainnav';
import Index from './components/Index';
import Project from './components/Projects/Project';
import './fonts/AmsterdamBright-DOPmD.woff'

function App() {
  const [scrolling, setScrolling] = useState(false);
  const scrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500,
    });
  };
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className="App background relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {

          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: false,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffff",
            },
            links: {
              color: "#fff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 20,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "polygon",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className='flex'>
        <button onClick={scrollToTop} className={`${scrolling ? 'animate-bounce w-10 md:w-14 m-3 scroll-to-top text-white fixed z-50 bottom-0 right-0' : 'hidden'}`}>
          <img src={scrollImage} alt=''></img>
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
