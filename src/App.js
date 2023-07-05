import './App.css';
import { Body } from './components/body';
import Navbar from './components/navbar';
import Connect from './components/connect';
import About from './components/about';
// import CarouselComponent from './components/carousel';
import Particles from 'react-tsparticles'
// import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from 'react';
import Readme from './components/readme';
import Contact from './components/contact';



function App() {
  const particlesInit = useCallback(async engine => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
  }, []);

  return (
    <div className="App background">
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
              resize: true,
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
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30,
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
      <Navbar />
      {/* <CarouselComponent /> */}
      <Body />
      <About />
      <Readme />
      <Contact />
      <Connect />
    </div>
  );
}

export default App;
