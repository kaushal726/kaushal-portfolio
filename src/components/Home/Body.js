import React, { useEffect, useState, useRef, useMemo } from "react";
import "./Home.css";
import Quotes from "./Quotes";
import "animate.css";
import {
  motion,
  useInView,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaNpm,
  FaLightbulb,
  FaRocket,
  FaMagic,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaArrowRight,
  FaUserAstronaut,
  FaTools,
  FaCogs,
  FaCog,
  FaWaveSquare,
  FaShieldAlt,
  FaLock,
  FaVideo,
  FaServer,
  FaPalette,
  FaPencilRuler,
  FaMobileAlt,
  FaBug,
  FaCubes,
  FaPlug,
  FaGamepad,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiChakraui,
  SiSpringboot,
  SiAngular,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiFigma,
  SiJest,
  SiMocha,
  SiMysql,
  SiPostman,
} from "react-icons/si";
import { useMood } from "../../context/MoodContext";
import { usePortfolioScroll } from "../../hooks/usePortfolioScroll";
import CentralDottedCircle from "../Common/CentralDottedCircle";
import OrganicBlobBackground from "../Common/OrganicBlobBackground";

// =================== DATA ===================
const HERO_ROLES = [
  "Software Developer",
  "React + Java Specialist",
  "Full-Stack Engineer",
];

const HERO_STATS = [
  { value: "3+", label: "Years Shipping", Icon: FaRocket },
  { value: "50+", label: "Bugs Squashed", Icon: FaBug },
  { value: "14", label: "Modules Built", Icon: FaCubes },
  { value: "80+", label: "APIs Designed", Icon: FaPlug },
];

const EXPERIENCE = [
  {
    company: "Zillout Technologies",
    role: "Software Developer",
    period: "Feb 2025 — Present",
    current: true,
    points: [
      "Worked across Customer, Admin, Merchant, Partner, and Marketing platforms using React, Chakra UI, Java (Spring Boot), and SQL.",
      "Owned end-to-end delivery — from feature design and implementation to testing, deployment, and maintenance.",
      "Built and optimized Pub & Event Booking, Marketing Automation, and Analytics modules.",
      "Implemented offline functionality via WebRTC and WebSocket for real-time communication without constant internet.",
    ],
    stack: ["React", "Chakra UI", "Java", "Spring Boot", "SQL", "WebRTC"],
  },
  {
    company: "C.E. Info Systems (MAPPLS)",
    role: "Software Associate",
    period: "Aug 2022 — Feb 2025",
    points: [
      "Developed map plugins and micro-frontend components in React.js for location-based visualization and layered maps.",
      "Implemented the mGIS 5.0 UI revamp — improving scalability, modularity, and user experience.",
      "Built an Annotations Draw Platform and Compare-view module for image/video analysis and AI inferences.",
      "Created microservices and resolved 50+ bugs across plugins and analytics.",
    ],
    stack: ["React", "Micro-Frontends", "Microservices", "JavaScript"],
  },
  {
    company: "Bright Code",
    role: "Software Engineer Intern",
    period: "Jan 2022 — Mar 2022",
    points: [
      "Implemented a React.js component for filtering, searching, and sorting data efficiently.",
    ],
    stack: ["React"],
  },
];

// Tech split into 4 marquee rows
const TECH_ROWS = [
  // Row 1: Frontend frameworks & languages
  [
    { name: "React", Icon: FaReact },
    { name: "Angular", Icon: SiAngular },
    { name: "Redux", Icon: SiRedux },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "HTML5", Icon: SiHtml5 },
    { name: "CSS3", Icon: SiCss3 },
    { name: "Tailwind CSS", Icon: SiTailwindcss },
    { name: "Chakra UI", Icon: SiChakraui },
  ],
  // Row 2: Backend & APIs
  [
    { name: "Node.js", Icon: FaNodeJs },
    { name: "Express", Icon: SiExpress },
    { name: "Java", Icon: FaJava },
    { name: "Spring Boot", Icon: SiSpringboot },
    { name: "REST APIs", Icon: FaServer },
    { name: "WebSocket", Icon: FaWaveSquare },
    { name: "WebRTC", Icon: FaVideo },
    { name: "JWT Auth", Icon: FaShieldAlt },
    { name: "Encryption", Icon: FaLock },
  ],
  // Row 3: Data & tooling
  [
    { name: "MongoDB", Icon: SiMongodb },
    { name: "SQL", Icon: SiMysql },
    { name: "Git", Icon: FaGitAlt },
    { name: "GitHub", Icon: FaGithub },
    { name: "NPM", Icon: FaNpm },
    { name: "Linux", Icon: FaLinux },
    { name: "Postman", Icon: SiPostman },
    { name: "Figma", Icon: SiFigma },
  ],
  // Row 4: Architecture / concepts
  [
    { name: "Microservices", Icon: FaCogs },
    { name: "Micro-Frontends", Icon: FaTools },
    { name: "Wireframing", Icon: FaPencilRuler },
    { name: "UI / UX Design", Icon: FaPalette },
    { name: "Responsive Web", Icon: FaMobileAlt },
    { name: "Middleware", Icon: FaCog },
    { name: "Jest", Icon: SiJest },
    { name: "Mocha", Icon: SiMocha },
  ],
];

const VISION_STEPS = [
  {
    num: "01",
    title: "Create",
    desc: "Build solutions that solve real problems for real users — not toys, not demos.",
    Icon: FaLightbulb,
  },
  {
    num: "02",
    title: "Iterate",
    desc: "Ship, measure, learn, refine. Momentum beats perfection every time.",
    Icon: FaRocket,
  },
  {
    num: "03",
    title: "Inspire",
    desc: "Leave the interface a little more thoughtful than I found it.",
    Icon: FaMagic,
  },
];

// =================== GLOBAL STYLES ===================
const GLOBAL_STYLES = `
  /* Color sweep — ONLY used for Kaushal Raj name */
  .color-sweep-text {
    background: linear-gradient(
      90deg,
      var(--sweep-from) 0%,
      var(--sweep-from) 25%,
      var(--sweep-mid) 45%,
      var(--sweep-mid2) 55%,
      var(--sweep-from) 75%,
      var(--sweep-from) 100%
    );
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: colorSweep 2.6s linear infinite;
  }
  @keyframes colorSweep {
    0%   { background-position: 200% center; }
    100% { background-position: -100% center; }
  }

  /* Tech marquee */
  .marquee-viewport { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .marquee-track { display: inline-flex; gap: 0.75rem; padding-right: 0.75rem; animation: marqueeX 35s linear infinite; }
  .marquee-track.reverse { animation-direction: reverse; }
  .marquee-track.fast { animation-duration: 26s; }
  .marquee-track.slow { animation-duration: 44s; }
  .marquee-viewport:hover .marquee-track { animation-play-state: paused; }
  @keyframes marqueeX {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* Watermark mega text — used behind sections */
  .watermark {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.85;
    user-select: none;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  }

  /* Time digit flicker on update */
  @keyframes digitTick {
    0%   { transform: translateY(0); opacity: 1; }
    49%  { transform: translateY(-12%); opacity: 0; }
    50%  { transform: translateY(12%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

// =================== HELPERS ===================
function SweepText({ children, mood, className = "", style = {} }) {
  return (
    <span
      className={`color-sweep-text ${className}`}
      style={{
        "--sweep-from": "#ffffff",
        "--sweep-mid": mood.colors.primary,
        "--sweep-mid2": mood.colors.secondary,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function MagneticTilt({ children, strength = 18, className = "", style = {} }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength);
    y.set(((e.clientY - cy) / r.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section heading — eyebrow + big word + thin underline
function SectionHeading({ eyebrow, title, mood, accent = true }) {
  return (
    <div className="text-center mb-12 sm:mb-16 relative">
      <p
        className="text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-3"
        style={{ color: mood.colors.primary }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
        style={{ letterSpacing: "-0.04em" }}
      >
        {title}
      </h2>
      {accent && (
        <motion.div
          className="h-px w-16 sm:w-20 mx-auto mt-5"
          style={{
            background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, transparent)`,
          }}
          animate={{ width: [50, 90, 50] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}
    </div>
  );
}

function getTimeIcon(hours) {
  const h = parseInt(hours || "0", 10);
  if (h >= 5 && h < 12) return FaSun;
  if (h >= 12 && h < 18) return FaCloudSun;
  return FaMoon;
}

function timeGreeting(hours) {
  const h = parseInt(hours || "0", 10);
  if (h >= 5 && h < 12) return "Morning";
  if (h >= 12 && h < 17) return "Afternoon";
  if (h >= 17 && h < 21) return "Evening";
  return "Night";
}

// =================== BODY ===================
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
    centralScale,
    centralY,
    centralOpacity,
  } = usePortfolioScroll();

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setShowContent(true), 500);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours();
      const mm = d.getMinutes();
      const ss = d.getSeconds();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      setTime({
        hours: hh.toString().padStart(2, "0"),
        minutes: mm.toString().padStart(2, "0"),
        seconds: ss.toString().padStart(2, "0"),
      });
      setDayOfWeek(days[d.getDay()]);
      if (hh >= 0 && hh < 12)
        setMessage("Good morning — make today count.");
      else if (hh >= 12 && hh < 17)
        setMessage("Good afternoon — keep the momentum going.");
      else setMessage("A great day is about to end.");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    Quotes().then((data) => {
      if (data) {
        setAuthor(data?.author);
        setQuote(data?.quote);
      }
    });
  }, []);

  return (
    <div className="h-full overflow-y-auto fancy-scrollbar">
      <style>{GLOBAL_STYLES}</style>

      <CentralDottedCircle
        scale={centralScale}
        y={centralY}
        opacity={centralOpacity}
      />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: mood.colors.background }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl md:text-[9rem] text-center text-white"
              style={{ fontFamily: "Amsterdam-2" }}
              initial={{ y: -180, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
            >
              <SweepText mood={mood}>Kaushal Raj</SweepText>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <div className="flex flex-col">
          <HeroSection
            mood={mood}
            scrollYProgress={scrollYProgress}
            index={index}
            stats={HERO_STATS}
            heroOpacity={heroOpacity}
            heroY={heroY}
          />
          <AboutSection mood={mood} />
          <TechStackSection mood={mood} />
          <ExperienceSection mood={mood} items={EXPERIENCE} />
          <QuoteSection mood={mood} quote={quote} author={author} />
          <VisionSection mood={mood} />
          <GreetingSection
            mood={mood}
            time={time}
            message={message}
            dayOfWeek={dayOfWeek}
          />
        </div>
      )}
    </div>
  );
};

// =================== HERO ===================
const HeroSection = ({ mood, scrollYProgress, index, stats, heroOpacity, heroY }) => {
  const eyebrowY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [0, -30]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const roleY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);
  const statsY = useTransform(scrollYProgress, [0, 0.15], [0, 40]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.section
      onMouseMove={onHeroMove}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
      style={{ opacity: heroOpacity, y: heroY, backgroundColor: mood.colors.background }}
    >
      <motion.div
        className="absolute pointer-events-none rounded-full blur-3xl hidden md:block"
        style={{
          width: 500,
          height: 500,
          x: useTransform(mx, (v) => v - 250),
          y: useTransform(my, (v) => v - 250),
          background: `radial-gradient(circle, ${mood.colors.primary}18, transparent 60%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, ${mood.colors.background}60 100%),
            linear-gradient(to bottom, ${mood.colors.background} 0%, transparent 15%, transparent 85%, ${mood.colors.background} 100%)
          `,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Coming soon announcement */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
          whileHover={{ y: -2 }}
          className="relative inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-7 sm:mb-8 overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}1a, ${mood.colors.secondary}10)`,
            border: `1px solid ${mood.colors.primary}45`,
            backdropFilter: "blur(10px)",
          }}
          onClick={(e) => e.preventDefault()}
        >
          {/* Sweep highlight */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary}30, transparent)`,
              width: "40%",
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />

          <motion.span
            className="relative w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: mood.colors.primary,
              boxShadow: `0 0 8px ${mood.colors.primary}`,
            }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <span
            className="relative text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold"
            style={{ color: mood.colors.primary }}
          >
            Coming Soon
          </span>

          <span
            className="relative w-px h-3"
            style={{ background: `${mood.colors.primary}50` }}
          />

          <motion.span
            className="relative"
            style={{ color: mood.colors.primary }}
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
          >
            <FaGamepad className="text-sm sm:text-base" />
          </motion.span>

          <span className="relative text-xs sm:text-sm font-bold text-white whitespace-nowrap">
            3D View Game
          </span>

          <span
            className="relative hidden sm:inline text-[9px] uppercase tracking-[0.3em] font-bold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            · Dropping Soon
          </span>
        </motion.a>

        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.4em] mb-5"
          style={{ color: mood.colors.primary, y: eyebrowY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome
        </motion.p>

        <motion.h1
          className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 leading-tight text-white"
          style={{
            letterSpacing: "-0.03em",
            y: nameY,
            scale: nameScale,
            fontFamily: "'Splash', cursive",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}
        >
          <span className="text-white">I'm </span>
          <SweepText mood={mood}>Kaushal Raj</SweepText>
        </motion.h1>

        {/* Minimal cycling role tagline */}
        <motion.div
          className="mb-14 sm:mb-16 flex items-center justify-center gap-3 sm:gap-4"
          style={{ y: roleY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span
            className="h-px w-8 sm:w-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary}80)`,
            }}
          />
          <div className="h-7 sm:h-8 overflow-hidden relative min-w-[180px] sm:min-w-[260px] text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg font-medium tracking-wide whitespace-nowrap"
                style={{ color: mood.colors.primary }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {HERO_ROLES[index % HERO_ROLES.length]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span
            className="h-px w-8 sm:w-12"
            style={{
              background: `linear-gradient(90deg, ${mood.colors.primary}80, transparent)`,
            }}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center items-start gap-8 sm:gap-14 md:gap-20"
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.Icon;
            return (
              <motion.div
                key={stat.label}
                className="relative text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {/* Icon badge */}
                <motion.div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `${mood.colors.primary}14`,
                    border: `1px solid ${mood.colors.primary}40`,
                    color: mood.colors.primary,
                  }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="text-base sm:text-lg" />
                </motion.div>

                {/* Number */}
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-black leading-none"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className="text-[10px] sm:text-xs mt-2 uppercase tracking-[0.3em] font-bold"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.label}
                </div>

                {/* Vertical separator (between items, hidden on mobile/wrap) */}
                {i < stats.length - 1 && (
                  <span
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-10 lg:-right-12 w-px h-12"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${mood.colors.primary}40, transparent)`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border flex justify-center pt-2"
            style={{ borderColor: `${mood.colors.primary}50` }}
            animate={{ y: [0, 6, 0] }}
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

// =================== ABOUT ===================
const AboutSection = ({ mood }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6"
      style={{ backgroundColor: mood.colors.background }}
    >
      <OrganicBlobBackground variant="default" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <MagneticTilt strength={20}>
              <motion.div
                className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}20, ${mood.colors.secondary}10)`,
                  border: `1px solid ${mood.colors.primary}25`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-dashed"
                  style={{ borderColor: `${mood.colors.primary}30` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-2xl border border-dashed"
                  style={{ borderColor: `${mood.colors.secondary}25` }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                    boxShadow: `0 10px 40px ${mood.colors.primary}50`,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaUserAstronaut className="text-white text-3xl sm:text-4xl" />
                </motion.div>
              </motion.div>
            </MagneticTilt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p
              className="text-xs uppercase tracking-[0.4em] mb-3"
              style={{ color: mood.colors.primary }}
            >
              About Me
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building{" "}
              <span
                style={{
                  color: mood.colors.primary,
                }}
              >
                scalable
              </span>
              <br className="hidden sm:block" /> web experiences
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-6"
              style={{ color: mood.colors.textMuted }}
            >
              React and Java developer focused on clean, responsive UIs and
              well-structured APIs. I work across the stack — from Spring Boot
              services to Chakra UI components — and care about how the pieces
              fit together.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all group"
              style={{ color: mood.colors.primary }}
            >
              Read my full story
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// =================== TECH STACK (marquee) ===================
const TechChip = ({ tech, mood }) => {
  const Icon = tech.Icon;
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap select-none transition-all hover:-translate-y-0.5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Icon
        className="text-base flex-shrink-0"
        style={{ color: mood.colors.primary }}
      />
      <span>{tech.name}</span>
    </div>
  );
};

const TechStackSection = ({ mood }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const speeds = ["", "fast", "slow", ""];
  const dirs = ["", "reverse", "", "reverse"];

  return (
    <motion.section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      {/* Watermark behind */}
      <div
        className="watermark"
        style={{
          fontSize: "clamp(8rem, 22vw, 18rem)",
        }}
      >
        TECH
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${mood.colors.primary}10, transparent)`,
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative">
        <div className="px-4 sm:px-6 max-w-5xl mx-auto">
          <SectionHeading eyebrow="Toolbox" title="Tech Stack" mood={mood} />
        </div>

        <motion.div
          className="space-y-4 sm:space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {TECH_ROWS.map((row, ri) => (
            <div key={ri} className="marquee-viewport">
              <div className={`marquee-track ${speeds[ri]} ${dirs[ri]}`}>
                {[...row, ...row].map((t, i) => (
                  <TechChip key={`${t.name}-${i}`} tech={t} mood={mood} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// =================== EXPERIENCE (typography timeline, no boxes) ===================
const ExperienceSection = ({ mood, items }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      <div
        className="watermark"
        style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
      >
        Journey
      </div>

      <OrganicBlobBackground variant="experience" />

      <div className="relative max-w-3xl mx-auto">
        <SectionHeading eyebrow="Journey" title="Experience" mood={mood} />

        <div className="relative pl-8 sm:pl-12">
          {/* Vertical rail */}
          <div
            className="absolute left-2 sm:left-4 top-2 bottom-0 w-px"
            style={{
              background: `linear-gradient(to bottom, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
            }}
          />

          <div className="space-y-12 sm:space-y-16">
            {items.map((item, i) => (
              <motion.div
                key={item.company}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.7 }}
              >
                {/* Dot on rail */}
                <motion.span
                  className="absolute -left-[26px] sm:-left-[34px] top-2 w-3 h-3 rounded-full z-10"
                  style={{
                    background: item.current
                      ? mood.colors.primary
                      : `${mood.colors.primary}70`,
                    boxShadow: `0 0 0 4px ${mood.colors.background}, 0 0 18px ${mood.colors.primary}80`,
                  }}
                  animate={item.current ? { scale: [1, 1.35, 1] } : {}}
                  transition={item.current ? { duration: 2, repeat: Infinity } : {}}
                />

                {/* Top row: period + current */}
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold"
                    style={{ color: mood.colors.primary }}
                  >
                    {item.period}
                  </span>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        background: "rgba(34,197,94,0.14)",
                        border: "1px solid rgba(34,197,94,0.4)",
                        color: "#22c55e",
                      }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-green-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      Current
                    </span>
                  )}
                </div>

                {/* Company - big */}
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {item.company}
                </h3>
                <p
                  className="text-sm sm:text-base font-medium mb-5"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {item.role}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2.5 mb-5">
                  {item.points.map((p, pi) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.3 + i * 0.15 + pi * 0.05,
                        duration: 0.4,
                      }}
                      className="flex gap-3 text-sm sm:text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <span
                        className="mt-2 sm:mt-2.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: mood.colors.primary }}
                      />
                      <span>{p}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// =================== QUOTE (full-bleed, no card) ===================
const QuoteSection = ({ mood, quote, author }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!quote || !isInView) return;
    setDisplayedQuote("");
    setIsTyping(true);
    let i = 0;
    const chars = quote.split("");
    const id = setInterval(() => {
      if (i < chars.length) {
        setDisplayedQuote(chars.slice(0, i + 1).join(""));
        i++;
      } else {
        clearInterval(id);
        setIsTyping(false);
      }
    }, 40);
    return () => clearInterval(id);
  }, [quote, isInView]);

  return (
    <motion.section
      ref={ref}
      className="relative py-32 sm:py-40 px-4 sm:px-6 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: mood.colors.background }}
    >
      {/* Massive watermark quote mark */}
      <motion.span
        className="absolute pointer-events-none font-serif select-none leading-none"
        style={{
          top: "10%",
          left: "5%",
          fontSize: "clamp(20rem, 50vw, 40rem)",
          color: "transparent",
          WebkitTextStroke: `1.5px ${mood.colors.primary}25`,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        “
      </motion.span>
      <motion.span
        className="absolute pointer-events-none font-serif select-none leading-none"
        style={{
          bottom: "5%",
          right: "5%",
          fontSize: "clamp(20rem, 50vw, 40rem)",
          color: "transparent",
          WebkitTextStroke: `1.5px ${mood.colors.secondary}25`,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ”
      </motion.span>

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}15, transparent)`,
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}15, transparent)`,
        }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <motion.div
        className="relative max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <p
          className="text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-6"
          style={{ color: mood.colors.primary }}
        >
          Daily Thought
        </p>

        <blockquote
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-snug italic"
          style={{ letterSpacing: "-0.02em" }}
        >
          {displayedQuote || "Loading inspiration..."}
          {isTyping && (
            <motion.span
              className="inline-block w-0.5 h-7 sm:h-9 ml-1 align-middle"
              style={{ backgroundColor: mood.colors.primary }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </blockquote>

        <motion.div
          className="flex items-center justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span
            className="h-px w-8 sm:w-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
            }}
          />
          <cite
            className="not-italic text-sm sm:text-base font-medium"
            style={{ color: mood.colors.primary }}
          >
            {author || "Anonymous"}
          </cite>
          <span
            className="h-px w-8 sm:w-12"
            style={{
              background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// =================== VISION (floating circular badges) ===================
const VisionSection = ({ mood }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      <div
        className="watermark"
        style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
      >
        Vision
      </div>

      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}20, transparent)`,
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}20, transparent)`,
        }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: `${mood.colors.primary}12` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="Future" title="Vision" mood={mood} />

        {/* Vision statement */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-white text-center leading-relaxed font-light max-w-3xl mx-auto mb-16 sm:mb-24"
          style={{ letterSpacing: "-0.01em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Building digital experiences that{" "}
          <span
            className="font-bold"
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            inspire
          </span>{" "}
          and{" "}
          <span
            className="font-bold"
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.secondary}, ${mood.colors.primary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            connect
          </span>{" "}
          people.
        </motion.p>

        {/* Floating badges — staircase on desktop, stacked on mobile */}
        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {VISION_STEPS.map((step, i) => {
            const Icon = step.Icon;
            const offsetClass =
              i === 0
                ? "md:mt-0"
                : i === 1
                ? "md:mt-12"
                : "md:mt-24";
            return (
              <motion.div
                key={step.num}
                className={`relative flex flex-col items-center text-center ${offsetClass}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  type: "spring",
                  stiffness: 70,
                }}
              >
                <MagneticTilt strength={10}>
                  <motion.div
                    className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: `radial-gradient(circle, ${mood.colors.primary}30, ${mood.colors.secondary}15)`,
                      boxShadow: `0 20px 60px ${mood.colors.primary}25, inset 0 0 0 1px ${mood.colors.primary}40`,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  >
                    {/* Step number ghost */}
                    <span
                      className="absolute -top-3 -left-1 text-5xl sm:text-6xl font-black"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1px ${mood.colors.primary}50`,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {step.num}
                    </span>
                    {/* Center icon */}
                    <Icon
                      className="text-4xl sm:text-5xl relative z-10"
                      style={{ color: mood.colors.primary }}
                    />
                    {/* Rotating dashed ring */}
                    <motion.div
                      className="absolute -inset-3 rounded-full border border-dashed"
                      style={{ borderColor: `${mood.colors.primary}30` }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </MagneticTilt>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed max-w-xs"
                  style={{ color: mood.colors.textMuted }}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

// =================== GREETING (massive typography time) ===================
const GreetingSection = ({ mood, time, message, dayOfWeek }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const TimeIcon = useMemo(() => getTimeIcon(time?.hours), [time?.hours]);
  const partOfDay = useMemo(() => timeGreeting(time?.hours), [time?.hours]);

  return (
    <motion.section
      ref={ref}
      className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      {/* Watermark "TIME" */}
      <div
        className="watermark"
        style={{ fontSize: "clamp(10rem, 30vw, 24rem)" }}
      >
        Time
      </div>

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}18, transparent)`,
        }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}18, transparent)`,
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Top label row */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-2xl sm:text-3xl"
            style={{ color: mood.colors.primary }}
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <TimeIcon />
          </motion.div>
          <span
            className="text-xs sm:text-sm uppercase tracking-[0.5em] font-semibold"
            style={{ color: mood.colors.primary }}
          >
            {partOfDay} — Live
          </span>
        </motion.div>

        {/* Massive time display */}
        <motion.div
          className="relative flex items-center justify-center mb-8 sm:mb-10"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
        >
          {/* Outer rotating dashed dial */}
          <motion.div
            className="absolute w-[88vw] max-w-[560px] aspect-square rounded-full border border-dashed pointer-events-none"
            style={{ borderColor: `${mood.colors.primary}18` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[60vw] max-w-[380px] aspect-square rounded-full border border-dashed pointer-events-none"
            style={{ borderColor: `${mood.colors.secondary}18` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />

          <div
            className="relative flex items-baseline justify-center font-black select-none"
            style={{
              fontFamily: "'Irish Grover', cursive",
              fontSize: "clamp(5rem, 18vw, 14rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="text-white">{time?.hours || "00"}</span>
            <motion.span
              className="mx-1 sm:mx-2"
              style={{ color: mood.colors.primary }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              :
            </motion.span>
            <span className="text-white">{time?.minutes || "00"}</span>
          </div>
        </motion.div>

        {/* Seconds — separate clean badge below the big time */}
        <motion.div
          className="relative flex justify-center mb-8 sm:mb-10 -mt-4 sm:-mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${mood.colors.primary}40`,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: mood.colors.primary,
                boxShadow: `0 0 6px ${mood.colors.primary}`,
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.4em] font-bold"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              SEC
            </span>
            <div
              className="relative w-7 h-5 overflow-hidden font-mono font-black text-sm leading-none flex items-center justify-center"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={time?.seconds}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                  style={{ color: mood.colors.primary }}
                >
                  {time?.seconds || "00"}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Greeting message */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-center text-white font-light italic mb-8 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {message}
        </motion.p>

        {/* Day badge — minimal */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <span
              className="h-px w-6 sm:w-8"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
              }}
            />
            <span
              className="text-xs sm:text-sm uppercase tracking-[0.5em] font-bold"
              style={{ color: mood.colors.primary }}
            >
              Happy {dayOfWeek}
            </span>
            <span
              className="h-px w-6 sm:w-8"
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
