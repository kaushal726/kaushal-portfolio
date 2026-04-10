import React, { useEffect, useState, useMemo } from "react";
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
import { motion, useInView, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useMood } from "../../context/MoodContext";
import { usePortfolioScroll } from "../../hooks/usePortfolioScroll";
import CentralDottedCircle from "../Common/CentralDottedCircle";
import OrganicBlobBackground from "../Common/OrganicBlobBackground";

const TEXTS = ["MERN Stack Developer", "Photographer", "Editor"];

const stats = [
  { value: "20+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "14+", label: "Technologies" },
  { value: "100%", label: "Passion" },
];

const timelineItems = [
  { year: "2023", title: "Full Stack Developer", desc: "Building scalable MERN applications" },
  { year: "2022", title: "Frontend Developer", desc: "Crafting responsive UIs" },
  { year: "2021", title: "Java Developer", desc: "Enterprise solutions" },
];

export const Body = () => {
  const { mood } = useMood();
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [time, setTime] = useState();
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const {
    scrollYProgress,
    heroOpacity,
    heroY,
    visionTextY1,
    visionTextY2,
    centralScale,
    centralY,
    centralOpacity,
  } = usePortfolioScroll();

  // Intro animation sequence
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setShowContent(true), 600);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Text transition
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Clock and greeting
  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const hh = date.getHours();
      const mm = date.getMinutes();
      const ss = date.getSeconds();
      const day = date.getDay();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      setTime({
        hours: hh.toString().padStart(2, "0"),
        minutes: mm.toString().padStart(2, "0"),
        seconds: ss.toString().padStart(2, "0"),
      });
      setDayOfWeek(daysOfWeek[day]);

      if (hh >= 0 && hh < 12) {
        setMessage("Good Morning. Create a positive vibe.");
      } else if (hh >= 12 && hh < 17) {
        setMessage("Good Afternoon. Your presence makes today amazing.");
      } else {
        setMessage("A Great Day is About to End.");
      }
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch quote
  useEffect(() => {
    Quotes().then((data) => {
      if (data) {
        setAuthor(data?.author);
        setQuote(data?.quote);
      }
    });
  }, []);

  const skills = useMemo(() => [
    { name: "HTML", img: HTML },
    { name: "CSS", img: CSS },
    { name: "JavaScript", img: Javascript },
    { name: "TypeScript", img: Typescript },
    { name: "React", img: ReactLogo },
    { name: "Tailwind", img: TailwindLogo },
    { name: "SASS", img: SAAS },
    { name: "Node.js", img: Node },
    { name: "Express", img: Express },
    { name: "MongoDB", img: Mongo },
    { name: "Java", img: Java },
    { name: "GitHub", img: GitHub },
    { name: "NPM", img: NPM },
    { name: "Linux", img: Linux },
  ], []);

  return (
    <div className="h-full overflow-y-auto fancy-scrollbar">
      {/* Central Dotted Circle - BIG and Scroll Driven */}
      <CentralDottedCircle scale={centralScale} y={centralY} opacity={centralOpacity} />

      {/* Intro Overlay - AnimatePresence for proper exit animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: mood.colors.background }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateX: -15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-24 flex justify-center items-center text-center text-white">
              <motion.h1
                className="text-7xl sm:text-4xl md:text-[9rem]"
                style={{ fontFamily: "Amsterdam-2" }}
                initial={{ y: -200, opacity: 0, rotateX: 45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: 100, opacity: 0, rotateX: 15 }}
                transition={{
                  y: { type: "spring", stiffness: 80, damping: 15, duration: 1.2 },
                  opacity: { duration: 0.6 },
                  rotateX: { duration: 0.8 },
                }}
              >
                Kaushal Raj
              </motion.h1>
            </div>

            {/* Fade out overlay hint */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${mood.colors.background}, transparent)`,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <div className="flex flex-col">
          {/* ============ HERO SECTION ============ */}
          <HeroSection
            mood={mood}
            scrollYProgress={scrollYProgress}
            index={index}
            stats={stats}
            heroOpacity={heroOpacity}
            heroY={heroY}
          />

          {/* ============ ABOUT SECTION ============ */}
          <AboutSection mood={mood} />

          {/* ============ TECH STACK SECTION ============ */}
          <TechStackSection mood={mood} skills={skills} />

          {/* ============ TIMELINE SECTION ============ */}
          <TimelineSection mood={mood} items={timelineItems} />

          {/* ============ QUOTE SECTION ============ */}
          <QuoteSection mood={mood} quote={quote} author={author} />

          {/* ============ VISION SECTION ============ */}
          <VisionSection mood={mood} visionTextY1={visionTextY1} visionTextY2={visionTextY2} />

          {/* ============ GREETING SECTION ============ */}
          <GreetingSection mood={mood} time={time} message={message} dayOfWeek={dayOfWeek} />
        </div>
      )}
    </div>
  );
};

// ============ HERO SECTION ============
const HeroSection = ({ mood, scrollYProgress, index, stats, heroOpacity, heroY }) => {
  // Parallax transforms for different elements
  const eyebrowY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [0, -30]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const roleY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);
  const statsY = useTransform(scrollYProgress, [0, 0.15], [0, 40]);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        opacity: heroOpacity,
        y: heroY,
        backgroundColor: mood.colors.background,
      }}
    >
      {/* Subtle gradient for text readability - only at edges, not center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, ${mood.colors.background}60 100%),
            linear-gradient(to bottom, ${mood.colors.background} 0%, transparent 15%, transparent 85%, ${mood.colors.background} 100%)
          `,
        }}
      />

      {/* Central content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow - Parallax */}
        <motion.p
          className="text-sm uppercase tracking-[0.3em] mb-6"
          style={{ color: mood.colors.primary, y: eyebrowY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome
        </motion.p>

        {/* Main heading - Parallax with Splash font & light sweep */}
        <motion.h1
          className="light-sweep-heading relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight"
          style={{
            letterSpacing: "-0.03em",
            y: nameY,
            scale: nameScale,
            fontFamily: "'Splash', cursive",
            //@ts-ignore
            "--highlight": mood.colors.primary,
          }}
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
        >
          I'm Kaushal Raj
        </motion.h1>

        <style>{`
          .light-sweep-heading {
            position: relative;
            background: linear-gradient(
              120deg,
              #ffffff 0%,
              #ffffff 30%,
              var(--highlight) 50%,
              #ffffff 70%,
              #ffffff 100%
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            animation: lightSweep 4s ease-in-out;
          }

          .light-sweep-heading::after {
            content: "I'm Kaushal Raj";
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(
              120deg,
              transparent 0%,
              transparent 30%,
              var(--highlight) 50%,
              transparent 70%,
              transparent 100%
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            filter: blur(12px);
            opacity: 0.5;
            z-index: -1;
            animation: lightSweep 4s ease-in-out;
          }

          @keyframes lightSweep {
            0% {
              background-position: -100% center;
            }
            40% {
              background-position: 100% center;
            }
            100% {
              background-position: 100% center;
            }
          }
        `}</style>

        {/* Role text - Premium animated showcase */}
        <motion.div
          className="mb-12"
          style={{ y: roleY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Glowing container */}
          <div className="relative">
            {/* Outer glow effect */}
            <motion.div
              className="absolute -inset-4 rounded-2xl blur-xl"
              style={{
                background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, transparent 70%)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main container */}
            <div
              className="relative px-8 py-4 rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.surface}95, ${mood.colors.surface}80)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${mood.colors.primary}30`,
              }}
            >
              {/* Animated background gradient */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `linear-gradient(90deg, transparent, ${mood.colors.primary}20, transparent)`,
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />

              {/* Content */}
              <div className="relative flex items-center justify-center gap-4">
                {/* Left icon */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: mood.colors.background }}
                  />
                </motion.div>

                {/* Animated role text */}
                <div className="h-12 overflow-hidden flex items-center">
                  <motion.span
                    key={index}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap"
                    initial={{ y: 80, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -80, opacity: 0, rotateX: 90 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      mass: 1,
                    }}
                  >
                    <span
                      className="text-transparent bg-clip-text"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary}, ${mood.colors.primary})`,
                        backgroundSize: '200% auto',
                        animation: 'gradientFlow 3s ease infinite',
                      }}
                    >
                      {TEXTS[index % TEXTS.length]}
                    </span>
                  </motion.span>
                </div>

                {/* Right icon */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${mood.colors.secondary}, ${mood.colors.primary})`,
                  }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: mood.colors.background }}
                  />
                </motion.div>
              </div>

              {/* Decorative lines */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${mood.colors.secondary}, ${mood.colors.primary}, transparent)`,
                }}
              />
            </div>
          </div>

          {/* Gradient animations */}
          <style>{`
            @keyframes shimmer {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
            @keyframes gradientFlow {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
        </motion.div>

        {/* Stats row - Parallax in opposite direction */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})` }}
              >
                {stat.value}
              </div>
              <div className="text-sm mt-1" style={{ color: mood.colors.textMuted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border flex justify-center pt-2"
            style={{ borderColor: `${mood.colors.primary}50` }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: mood.colors.primary }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============ ABOUT SECTION ============
const AboutSection = ({ mood }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <OrganicBlobBackground variant="default" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Abstract avatar representation */}
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}30, ${mood.colors.secondary}30)`,
                border: `2px solid ${mood.colors.primary}40`,
              }}
            >
              {/* Inner gradient circle */}
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  opacity: 0.6,
                }}
              />

              {/* Code bracket decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-6xl font-bold"
                  style={{ color: mood.colors.primary, opacity: 0.8 }}
                >
                  {"<"}
                </span>
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute w-4 h-4 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: mood.colors.primary,
                }}
              />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: mood.colors.primary }}>
              About Me
            </p>

            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building digital
              <br />
              <span style={{ color: mood.colors.primary }}>experiences</span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: mood.colors.textMuted }}>
              I'm a passionate MERN Stack Developer specializing in creating modern,
              responsive web applications. With expertise in React, Node.js, and MongoDB,
              I transform complex problems into elegant solutions.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "MongoDB", "TypeScript", "Photography"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${mood.colors.primary}15`,
                    color: mood.colors.primary,
                    border: `1px solid ${mood.colors.primary}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ============ TECH STACK SECTION ============
const TechStackSection = ({ mood, skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${mood.colors.primary}10, transparent)`,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          <p
            className="text-sm uppercase tracking-[0.4em] mb-4"
            style={{ color: mood.colors.primary }}
          >
            Expertise
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{
              letterSpacing: "-0.03em",
              fontFamily: "'Irish Grover', cursive",
            }}
          >
            Tech{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            >
              Stack
            </span>
          </h2>

          {/* Animated line */}
          <motion.div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            }}
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Skills Grid - Premium Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.1 + i * 0.04,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, transparent 70%)`,
                }}
              />

              {/* Card */}
              <div
                className="relative p-6 rounded-2xl flex flex-col items-center justify-center gap-3"
                style={{
                  background: `${mood.colors.surface}90`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${mood.colors.surfaceLight}`,
                }}
              >
                {/* Icon */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <img
                    alt={skill.name}
                    src={skill.img}
                    className="w-10 h-10 object-contain relative z-10"
                    style={{ filter: "brightness(0.9) saturate(1.1)" }}
                  />
                </div>

                {/* Name */}
                <span
                  className="text-xs font-semibold text-center"
                  style={{ color: mood.colors.textMuted }}
                >
                  {skill.name}
                </span>

                {/* Bottom gradient line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============ TIMELINE SECTION ============
const TimelineSection = ({ mood, items }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <OrganicBlobBackground variant="experience" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: mood.colors.primary }}>
            Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
            }}
          />

          {items.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative flex items-center mb-12 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
            >
              {/* Content */}
              <div className={`w-5/12 ${i % 2 === 0 ? "pr-8 text-right" : "ml-auto pl-8 text-left"}`}>
                <div
                  className="p-6 rounded-2xl backdrop-blur-md border"
                  style={{
                    backgroundColor: `${mood.colors.surface}80`,
                    borderColor: `${mood.colors.primary}20`,
                  }}
                >
                  <span className="text-2xl font-bold" style={{ color: mood.colors.primary }}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-2">{item.title}</h3>
                  <p className="text-sm mt-1" style={{ color: mood.colors.textMuted }}>
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                style={{
                  backgroundColor: mood.colors.primary,
                  borderColor: mood.colors.background,
                  boxShadow: `0 0 20px ${mood.colors.primary}60`,
                }}
              />

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============ QUOTE SECTION ============
const QuoteSection = ({ mood, quote, author }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  // Typing animation effect - restarts when section comes into view
  useEffect(() => {
    if (!quote || !isInView) return;

    setDisplayedQuote("");
    setIsTyping(true);
    setCharIndex(0);

    let currentIndex = 0;
    const chars = quote.split("");

    const typeInterval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayedQuote(chars.slice(0, currentIndex + 1).join(""));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [quote, isInView]);

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? mood.colors.primary : mood.colors.secondary,
              left: `${15 + i * 6}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}25, transparent)`,
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}20, transparent)`,
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Orbital rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: `${mood.colors.primary}15` }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: `${mood.colors.secondary}10` }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Quote card - Premium design */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15 }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-12 rounded-[3rem] blur-3xl"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, ${mood.colors.secondary}20, transparent 70%)`,
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Main card */}
          <div
            className="relative px-12 py-16 md:px-16 md:py-20 rounded-[2rem] overflow-hidden"
            style={{
              background: `${mood.colors.surface}85`,
              backdropFilter: 'blur(40px)',
              border: `1px solid ${mood.colors.surfaceLight}`,
            }}
          >
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 rounded-[2rem] p-px" style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}60, transparent 30%, transparent 70%, ${mood.colors.secondary}60)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }} />

            {/* Decorative quote icon */}
            <motion.div
              className="absolute top-6 left-6 md:top-8 md:left-8"
              animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}30, ${mood.colors.secondary}30)`,
                }}
              >
                <span
                  className="text-4xl md:text-5xl"
                  style={{
                    filter: `drop-shadow(0 0 10px ${mood.colors.primary}50)`,
                  }}
                >
                  ❝
                </span>
              </div>
            </motion.div>

            {/* Closing quote */}
            <motion.div
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
              animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.secondary}30, ${mood.colors.primary}30)`,
                }}
              >
                <span
                  className="text-4xl md:text-5xl"
                  style={{
                    filter: `drop-shadow(0 0 10px ${mood.colors.secondary}50)`,
                  }}
                >
                  ❞
                </span>
              </div>
            </motion.div>

            {/* Quote text */}
            <motion.blockquote
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-snug text-center mb-10"
              style={{
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                }}
              >
                "
              </span>
              <span className="italic">
                {displayedQuote || "Loading inspiration..."}
              </span>
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-8 ml-1"
                  style={{ backgroundColor: mood.colors.primary }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${mood.colors.secondary}, ${mood.colors.primary})`,
                }}
              >
                "
              </span>
            </motion.blockquote>

            {/* Animated divider */}
            <motion.div
              className="w-24 h-1 mx-auto mb-8 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary}, ${mood.colors.primary})`,
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Author */}
            <motion.cite
              className="block text-center not-italic"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span
                className="text-lg md:text-xl font-medium"
                style={{
                  color: mood.colors.primary,
                  textShadow: `0 0 20px ${mood.colors.primary}40`,
                }}
              >
                — {author || "Anonymous"}
              </span>
            </motion.cite>

            {/* Sparkle decorations */}
            <motion.div
              className="absolute top-1/2 left-4 -translate-y-1/2"
              animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-2xl" style={{ color: mood.colors.primary, opacity: 0.3 }}>
                ✦
              </span>
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-4 -translate-y-1/2"
              animate={{ rotate: [360, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-2xl" style={{ color: mood.colors.secondary, opacity: 0.3 }}>
                ✦
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom floating elements */}
        <motion.div
          className="flex justify-center items-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === 2 ? mood.colors.primary : `${mood.colors.primary}40`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============ VISION SECTION ============
const VisionSection = ({ mood, visionTextY1, visionTextY2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { num: "01", title: "Create", desc: "Build innovative solutions that solve real problems", icon: "💡" },
    { num: "02", title: "Innovate", desc: "Push boundaries with cutting-edge technologies", icon: "🚀" },
    { num: "03", title: "Inspire", desc: "Create experiences that leave lasting impressions", icon: "✨" },
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Animated particle field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: mood.colors.primary,
              left: `${10 + i * 5}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}30, transparent)`,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}30, transparent)`,
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Orbital ring decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: `${mood.colors.primary}20` }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header - Premium with light sweep */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <motion.p
            className="text-sm uppercase tracking-[0.4em] mb-6"
            style={{ color: mood.colors.primary }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Future
          </motion.p>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 vision-heading" style={{ letterSpacing: "-0.03em" }}>
            Vision
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-32 h-1 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
            }}
            animate={{ width: [100, 200, 100], backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Vision statement - Glassmorphism card */}
        <motion.div
          className="relative mb-20"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 80 }}
        >
          {/* Glow */}
          <motion.div
            className="absolute -inset-6 rounded-3xl blur-2xl"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}25, transparent 70%)`,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Card */}
          <div
            className="relative px-12 py-10 rounded-3xl overflow-hidden"
            style={{
              background: `${mood.colors.surface}80`,
              backdropFilter: 'blur(30px)',
              border: `1px solid ${mood.colors.surfaceLight}`,
            }}
          >
            {/* Gradient borders */}
            <div className="absolute inset-0 rounded-3xl p-px" style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}50, transparent, ${mood.colors.secondary}50)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }} />

            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  boxShadow: `0 10px 40px ${mood.colors.primary}40`,
                }}
              >
                🎯
              </div>
            </motion.div>

            <p
              className="text-2xl md:text-3xl lg:text-4xl text-white text-center leading-relaxed font-light"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building digital experiences that{" "}
              <span
                className="font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                }}
              >
                inspire
              </span>{" "}
              and{" "}
              <span
                className="font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${mood.colors.secondary}, ${mood.colors.primary})`,
                }}
              >
                connect
              </span>{" "}
              people across the world.
            </p>
          </div>
        </motion.div>

        {/* Steps - Premium cards with icons */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative group"
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.8, type: "spring", stiffness: 100 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, transparent 70%)`,
                }}
              />

              {/* Card */}
              <div
                className="relative p-8 rounded-3xl overflow-hidden"
                style={{
                  background: `${mood.colors.surface}90`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${mood.colors.surfaceLight}`,
                }}
              >
                {/* Animated gradient top border */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.15, duration: 1, ease: "easeOut" }}
                />

                {/* Number with glow */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${mood.colors.primary}20, ${mood.colors.secondary}20)`,
                    border: `1px solid ${mood.colors.primary}30`,
                  }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className="font-bold text-4xl"
                    style={{
                      color: mood.colors.primary,
                      textShadow: `0 0 20px ${mood.colors.primary}50`,
                    }}
                  >
                    {step.num}
                  </span>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="text-5xl mb-4 flex justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold text-white text-center mb-3"
                  style={{ fontFamily: "'Irish Grover', cursive" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-center leading-relaxed"
                  style={{ color: mood.colors.textMuted }}
                >
                  {step.desc}
                </p>

                {/* Bottom gradient line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${mood.colors.primary}50, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-20 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
              }}
            />
            <motion.span
              className="text-2xl"
              style={{ color: mood.colors.primary }}
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              ✦
            </motion.span>
            <motion.div
              className="w-20 h-px"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============ GREETING SECTION ============
const GreetingSection = ({ mood, time, message, dayOfWeek }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [prevSeconds, setPrevSeconds] = useState("00");
  const [digitKey, setDigitKey] = useState(0);

  // Animate digit changes
  useEffect(() => {
    if (time && time.seconds !== prevSeconds) {
      setDigitKey((k) => k + 1);
      setPrevSeconds(time.seconds);
    }
  }, [time?.seconds, prevSeconds]);

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${mood.colors.primary}15, transparent)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Time card - Premium design */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Glow behind */}
          <motion.div
            className="absolute -inset-8 rounded-3xl blur-2xl"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}30, transparent 70%)`,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Main card */}
          <div
            className="relative px-10 py-8 rounded-3xl overflow-hidden"
            style={{
              background: `${mood.colors.surface}90`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${mood.colors.surfaceLight}`,
            }}
          >
            {/* Animated top border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary}, ${mood.colors.primary})`,
              }}
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Clock icon with rotation */}
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  boxShadow: `0 8px 30px ${mood.colors.primary}40`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-10 h-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Time */}
            <motion.div
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 flex items-center justify-center gap-1"
              style={{
                fontFamily: "'Irish Grover', cursive",
                letterSpacing: "-0.02em",
              }}
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {time?.hours}:{time?.minutes}
              <span className="relative inline-flex">
                <motion.span
                  key={digitKey}
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  }}
                  initial={{ y: 10, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                >
                  :{time?.seconds}
                </motion.span>
              </span>
            </motion.div>

            {/* Subtitle */}
            <div
              className="text-sm uppercase tracking-[0.3em]"
              style={{ color: mood.colors.textMuted }}
            >
              Current Time
            </div>
          </div>
        </motion.div>

        {/* Message - Elegant card */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div
            className="relative px-8 py-6 rounded-2xl"
            style={{
              background: `${mood.colors.surface}60`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mood.colors.primary}20`,
            }}
          >
            {/* Quote marks */}
            <span
              className="absolute top-2 left-4 text-4xl opacity-20"
              style={{ color: mood.colors.primary }}
            >
              "
            </span>

            <p
              className="text-xl md:text-2xl text-white font-light italic"
              style={{ letterSpacing: "-0.01em" }}
            >
              {message}
            </p>

            <span
              className="absolute bottom-2 right-4 text-4xl opacity-20"
              style={{ color: mood.colors.primary }}
            >
              "
            </span>
          </div>
        </motion.div>

        {/* Day badge - Sparkle style */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 150 }}
        >
          {/* Glow */}
          <motion.div
            className="absolute -inset-4 rounded-full opacity-50"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}40, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Badge */}
          <div
            className="relative px-8 py-4 rounded-full flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              boxShadow: `0 8px 30px ${mood.colors.primary}40`,
            }}
          >
            {/* Sparkle icon */}
            <motion.span
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-xl"
            >
              ✦
            </motion.span>

            <span className="text-xl md:text-2xl font-bold text-white">
              Happy {dayOfWeek}
            </span>

            <motion.span
              animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-xl"
            >
              ✦
            </motion.span>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center items-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
            }}
          />
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl" style={{ color: mood.colors.primary }}>
              ☀️
            </span>
          </motion.div>
          <motion.div
            className="w-16 h-px"
            style={{
              background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};
