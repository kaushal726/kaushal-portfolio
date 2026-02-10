import React, { useEffect, useState } from "react";
import "./Home.css";
import Quotes from "./Quotes";
import "animate.css";
import Javascript from "../../assets/Skills/javascript.png";
import Typescript from "../../assets/Skills/typescript.png";
import CSS from "../../assets/Skills/css.png";
import Express from "../../assets/Skills/express.png";
import GitHub from "../../assets/Skills/github.png";
import HTML from "../../assets/Skills/html.png";
import Java from "../../assets/Skills/java.png";
import Linux from "../../assets/Skills/linux.png";
import Mongo from "../../assets/Skills/mongo-db.png";
import Node from "../../assets/Skills/node.png";
import NPM from "../../assets/Skills/npm.png";
import ReactLogo from "../../assets/Skills/react.png";
import SAAS from "../../assets/Skills/saas.png";
import TailwindLogo from "../../assets/Skills/tailwind.png";
import TextTransition, { presets } from "react-text-transition";
import { motion, useAnimation } from "framer-motion";
const TEXTS = ["Mern Stack Developer", "Photographer", "Editor"];
let render = true;
export const Body = () => {
  const [quote, setQuote] = useState();
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState();
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [time, setTime] = useState();
  const [index, setIndex] = React.useState(0);
  const [showNormalContent, setShowNormalContent] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (render) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: "easeInOut" },
      });
      const timeout = setTimeout(() => {
        setShowNormalContent(true);
        controls.start({
          opacity: 0,
          y: -20,
          scale: 0.8,
          transition: { duration: 0.5, ease: "easeIn" },
        });
      }, 3000);
      render = false;
      return () => clearTimeout(timeout);
    } else {
      setShowNormalContent(true);
      controls.start({
        opacity: 0,
        y: -20,
        scale: 0.8,
        transition: { duration: 0.5, ease: "easeIn" },
      });
    }
  }, [controls]);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hh = date.getHours();
      const mm = date.getMinutes();
      const day = date.getDay();
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const formattedTime = `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
      setTime(formattedTime);
      setDayOfWeek(daysOfWeek[day]);

      if (hh >= 0 && hh < 12) {
        setMessage(
          `Good Morning. Create a positive vibe. Embrace the day with a smile, and let positivity guide your way!`,
        );
      } else if (hh >= 12 && hh < 17) {
        setMessage(
          `Good Afternoon. Your presence has the power to make today amazing. Shine on!`,
        );
      } else if (hh >= 17 && hh < 24) {
        setMessage(
          `A Great Day is About to End. Radiate good vibes and watch the world transform around you!`,
        );
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dayOfWeek]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    Quotes().then((data) => {
      if (data) {
        setAuthor(data?.author);
        setQuote(data?.quote);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full overflow-hidden ">
      <motion.div
        className="flex items-center justify-center bg-black absolute top-0 left-0 w-full h-screen md:h-screen z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <div className="mb-24 flex justify-center items-center text-center text-white">
          <h1
            className="text-7xl sm:text-4xl md:text-[9rem] animate__animated animate__hinge "
            style={{ fontFamily: "Amsterdam-2" }}
          >
            Kaushal Raj
          </h1>
        </div>
      </motion.div>
      {showNormalContent && (
        <div className="flex flex-col justify-center items-center h-full ">
          {/* Enhanced Hero Section with SVG Background */}
          <div className="flex-col top-0 flex justify-center items-center h-screen w-full relative overflow-hidden">
            {/* Animated SVG Background with Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="hero-grad-1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3">
                      <animate
                        attributeName="stopOpacity"
                        values="0.3;0.6;0.3"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3">
                      <animate
                        attributeName="stopOpacity"
                        values="0.3;0.6;0.3"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <linearGradient
                    id="hero-grad-2"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity="0.25"
                    />
                  </linearGradient>
                </defs>
                {/* Floating Circles */}
                <circle cx="15%" cy="25%" r="150" fill="url(#hero-grad-1)">
                  <animate
                    attributeName="cx"
                    values="15%;25%;15%"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="25%;35%;25%"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="150;200;150"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="85%" cy="70%" r="180" fill="url(#hero-grad-2)">
                  <animate
                    attributeName="cx"
                    values="85%;75%;85%"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="70%;60%;70%"
                    dur="22s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="180;220;180"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Floating Hexagons */}
                <polygon
                  points="100,50 130,70 130,110 100,130 70,110 70,70"
                  fill="url(#hero-grad-1)"
                  opacity="0.4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 100 90; 360 100 90"
                    dur="30s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 50,30; 0,0"
                    dur="15s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </polygon>
                <polygon
                  points="1800,600 1830,620 1830,660 1800,680 1770,660 1770,620"
                  fill="url(#hero-grad-2)"
                  opacity="0.3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 1800 640; -360 1800 640"
                    dur="25s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; -40,40; 0,0"
                    dur="18s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </polygon>
              </svg>
            </div>

            {/* Hero Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-4">
              {/* Greeting with Stagger Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-4"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Hey There! 👋
                </motion.h1>
              </motion.div>

              {/* Main Name with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="text-center mb-6"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <h1 className="text-5xl md:text-8xl font-black text-white mb-3 relative">
                  I'm{" "}
                  <motion.span
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 relative"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(251, 146, 60, 0.5)",
                        "0 0 40px rgba(236, 72, 153, 0.8)",
                        "0 0 20px rgba(251, 146, 60, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    Kaushal Raj
                  </motion.span>
                </h1>
                {/* Decorative Line */}
                <motion.div
                  className="h-1 w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Role with Animated Text Transition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-center"
              >
                <div className="inline-block relative">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-50 blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative px-8 py-4 md:px-12 md:py-6 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <h2 className="text-3xl md:text-6xl font-bold text-white">
                      <TextTransition
                        className="flex items-center justify-center"
                        delay={30}
                        springConfig={presets.molasses}
                      >
                        {TEXTS[index % TEXTS.length]}
                      </TextTransition>
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* Floating Code Brackets Animation */}
              <motion.div
                className="absolute top-1/4 left-[10%] text-purple-500/30 text-6xl font-mono"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {"</>"}
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 right-[10%] text-pink-500/30 text-6xl font-mono"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                {"{}"}
              </motion.div>
            </div>
          </div>
          <motion.section
            className="w-full flex justify-center items-center py-24 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Animated SVG Mesh Background */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="mesh-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3">
                      <animate
                        attributeName="stopColor"
                        values="#a855f7;#ec4899;#3b82f6;#a855f7"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4">
                      <animate
                        attributeName="stopColor"
                        values="#ec4899;#3b82f6;#a855f7;#ec4899"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3">
                      <animate
                        attributeName="stopColor"
                        values="#3b82f6;#a855f7;#ec4899;#3b82f6"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <radialGradient id="radial-grad">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse
                  cx="20%"
                  cy="30%"
                  rx="400"
                  ry="300"
                  fill="url(#radial-grad)"
                >
                  <animate
                    attributeName="cx"
                    values="20%;80%;20%"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="30%;70%;30%"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                <ellipse
                  cx="80%"
                  cy="60%"
                  rx="350"
                  ry="280"
                  fill="url(#radial-grad)"
                >
                  <animate
                    attributeName="cx"
                    values="80%;20%;80%"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="60%;40%;60%"
                    dur="22s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                <path
                  d="M0,0 L1920,0 L1920,1080 L0,1080 Z"
                  fill="url(#mesh-grad)"
                  opacity="0.1"
                />
              </svg>
            </div>

            <div className="relative w-full max-w-7xl px-4">
              {/* Bold 3D Gradient Card */}
              <div
                className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-1 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="bg-black rounded-3xl p-8 md:p-12 lg:p-16">
                  {/* Header Section */}
                  <div className="mb-10 md:mb-12">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-white">
                        Tech Stack
                      </h2>
                    </div>
                    <p className="text-gray-400 text-lg md:text-xl ml-20 font-medium">
                      Tools & Technologies I Master
                    </p>
                  </div>

                  {/* Skills Grid with 3D Effect */}
                  <div
                    className="grid grid-cols-4 md:grid-cols-7 gap-5 md:gap-8"
                    style={{ perspective: "1000px" }}
                  >
                    <div className="skill-badge">
                      <img
                        alt="HTML"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={HTML}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="CSS"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={CSS}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="JavaScript"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Javascript}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="TypeScript"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Typescript}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="React"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={ReactLogo}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="Tailwind"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={TailwindLogo}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="SASS"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={SAAS}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="Node.js"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Node}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="Express"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Express}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="MongoDB"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Mongo}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="Java"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Java}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="GitHub"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={GitHub}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="NPM"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={NPM}
                      />
                    </div>
                    <div className="skill-badge">
                      <img
                        alt="Linux"
                        className="w-14 h-14 md:w-16 md:h-16"
                        src={Linux}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
          <motion.div
            className="py-24 w-full px-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated SVG Geometric Shapes Background */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="quote-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                    <stop
                      offset="100%"
                      stopColor="#ec4899"
                      stopOpacity="0.15"
                    />
                  </linearGradient>
                </defs>
                {/* Floating Geometric Shapes */}
                <polygon
                  points="100,50 150,150 50,150"
                  fill="url(#quote-grad)"
                  opacity="0.3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 50,30; 0,0"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 100 100; 360 100 100"
                    dur="20s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </polygon>
                <rect
                  x="85%"
                  y="10%"
                  width="100"
                  height="100"
                  fill="url(#quote-grad)"
                  opacity="0.2"
                  rx="20"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; -30,40; 0,0"
                    dur="18s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 50 50; -360 50 50"
                    dur="25s"
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </rect>
                <circle cx="10%" cy="80%" r="60" fill="#8b5cf6" opacity="0.1">
                  <animate
                    attributeName="cy"
                    values="80%;50%;80%"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="60;80;60"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            <div className="flex justify-center items-center w-full">
              <div className="relative max-w-6xl w-full">
                {/* Modern Bordered Quote Card with 3D Effect */}
                <div
                  className="relative bg-gradient-to-br from-gray-900 to-black border-l-4 border-purple-500 rounded-2xl p-10 md:p-16 shadow-2xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Quote Content */}
                  <div className="flex gap-6 md:gap-8">
                    {/* Quote Icon */}
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-purple-500/20 rounded-2xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-10 h-10 md:w-14 md:h-14 text-purple-400"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <blockquote className="mb-6">
                        <p className="text-white text-xl md:text-3xl font-normal leading-relaxed">
                          {quote ? quote : "Loading inspiration..."}
                        </p>
                      </blockquote>
                      <cite className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl md:text-2xl font-bold not-italic">
                        — {author ? author : ""}
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.section
            className="w-full py-24 px-4 flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated SVG Wave Pattern Background */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="wave-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2">
                      <animate
                        attributeName="stopColor"
                        values="#3b82f6;#8b5cf6;#ec4899;#3b82f6"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3">
                      <animate
                        attributeName="stopColor"
                        values="#8b5cf6;#ec4899;#3b82f6;#8b5cf6"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2">
                      <animate
                        attributeName="stopColor"
                        values="#ec4899;#3b82f6;#8b5cf6;#ec4899"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                </defs>
                {/* Animated Wave Paths */}
                <path
                  d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 L2000,0 L0,0 Z"
                  fill="url(#wave-grad)"
                  opacity="0.3"
                >
                  <animate
                    attributeName="d"
                    values="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 L2000,0 L0,0 Z;
                            M0,100 Q250,150 500,100 T1000,100 T1500,100 T2000,100 L2000,0 L0,0 Z;
                            M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100 L2000,0 L0,0 Z"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M0,150 Q300,100 600,150 T1200,150 T1800,150 T2400,150 L2400,200 L0,200 Z"
                  fill="url(#wave-grad)"
                  opacity="0.2"
                >
                  <animate
                    attributeName="d"
                    values="M0,150 Q300,100 600,150 T1200,150 T1800,150 T2400,150 L2400,200 L0,200 Z;
                            M0,150 Q300,200 600,150 T1200,150 T1800,150 T2400,150 L2400,200 L0,200 Z;
                            M0,150 Q300,100 600,150 T1200,150 T1800,150 T2400,150 L2400,200 L0,200 Z"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>

            <div className="relative max-w-6xl w-full">
              {/* Enhanced Dark Card with 3D Gradient Badges */}
              <div
                className="relative bg-gradient-to-br from-black via-gray-900 to-black border border-gray-700 rounded-3xl overflow-hidden shadow-2xl p-10 md:p-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Radial Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent"></div>

                {/* Content */}
                <div className="text-center relative z-10">
                  {/* Time Display - 3D Card */}
                  <div className="mb-8">
                    <motion.div
                      className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl"
                      animate={{
                        boxShadow: [
                          "0 20px 50px rgba(139, 92, 246, 0.4)",
                          "0 20px 50px rgba(236, 72, 153, 0.4)",
                          "0 20px 50px rgba(59, 130, 246, 0.4)",
                          "0 20px 50px rgba(139, 92, 246, 0.4)",
                        ],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(20px)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-4xl md:text-5xl font-black text-white tracking-wider">
                        {time}
                      </span>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-200 text-2xl md:text-3xl mb-8 font-semibold leading-relaxed">
                    {message}
                  </p>

                  {/* Day Badge - 3D Floating */}
                  <motion.div
                    className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full shadow-2xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(15px)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-7 h-7 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                    <span className="text-white font-black text-xl md:text-2xl">
                      Happy {dayOfWeek}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};
