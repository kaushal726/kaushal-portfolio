import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { useMood } from "../../context/MoodContext";
import { useIsTouch } from "../../hooks/useIsTouch";

const NAV_ITEMS = [
  { to: "/", label: "Home", num: "01", hint: "The story so far" },
  { to: "/project", label: "Project", num: "02", hint: "e-BillX — full case study" },
  { to: "/about", label: "About", num: "03", hint: "Who I am, what I value" },
  { to: "/contact", label: "Contact", num: "04", hint: "Let's start a conversation" },
  { to: "/game", label: "Game", num: "05", hint: "3D garden — walk around" },
];

const PATH_TO_LABEL = {
  "/": "Home",
  "/project": "Project",
  "/about": "About",
  "/contact": "Contact",
  "/game": "Game",
};

const MARQUEE_TEXT =
  "MENU · NAVIGATE · GO ANYWHERE · MENU · NAVIGATE · GO ANYWHERE · ";

const NAV_STYLES = `
  .nav-marquee {
    display: inline-flex;
    animation: navMarquee 40s linear infinite;
    will-change: transform;
  }
  .nav-marquee.reverse { animation-direction: reverse; }
  @keyframes navMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* Pure-CSS menu item hover — no React state required */
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
    cursor: pointer;
    text-decoration: none;
  }
  @media (min-width: 640px) {
    .nav-item { gap: 1.5rem; padding: 0.75rem 0; }
  }
  @media (min-width: 768px) {
    .nav-item { gap: 2.5rem; }
  }
  .nav-item .nav-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255,255,255,0.35);
    transition: color 0.2s ease;
  }
  @media (min-width: 640px) { .nav-item .nav-num { font-size: 0.875rem; } }
  @media (min-width: 768px) { .nav-item .nav-num { font-size: 1rem; } }
  .nav-item .nav-label {
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.05em;
    color: #fff;
    font-size: clamp(2.75rem, 9vw, 7.5rem);
    transition: transform 0.3s ease, color 0.2s ease;
    will-change: transform;
    position: relative;
  }
  .nav-item .nav-arrow {
    color: var(--nav-primary);
    opacity: 0;
    transform: translateX(-12px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    font-size: 1.5rem;
  }
  @media (min-width: 768px) { .nav-item .nav-arrow { font-size: 1.75rem; } }
  .nav-item:hover .nav-label { transform: translateX(14px); color: var(--nav-primary); }
  .nav-item:hover .nav-num   { color: var(--nav-primary); }
  .nav-item:hover .nav-arrow { opacity: 1; transform: translateX(0); }
  .nav-item.active .nav-label { color: var(--nav-primary); }
  .nav-item.active .nav-num   { color: var(--nav-primary); }
  .nav-item.active .nav-dot {
    position: absolute;
    right: -14px; top: 50%;
    transform: translateY(-50%);
    width: 10px; height: 10px;
    border-radius: 9999px;
    background: var(--nav-primary);
    box-shadow: 0 0 14px var(--nav-primary);
  }

  /* "You're here" badge — only renders on the active item */
  .nav-item .nav-here {
    display: none;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--nav-primary);
    background: color-mix(in srgb, var(--nav-primary) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--nav-primary) 50%, transparent);
    white-space: nowrap;
  }
  @media (min-width: 640px) {
    .nav-item .nav-here { font-size: 0.7rem; padding: 0.4rem 0.9rem; }
  }
  .nav-item.active .nav-here { display: inline-flex; }
  .nav-item .nav-here-dot {
    width: 6px; height: 6px; border-radius: 9999px;
    background: var(--nav-primary);
    box-shadow: 0 0 8px var(--nav-primary);
    animation: nav-here-pulse 1.6s ease-in-out infinite;
  }
  @keyframes nav-here-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(1.3); }
  }
`;

/* --------- Magnetic wrapper --------- */
function Magnetic({ children, strength = 22, className = "", style = {} }) {
  const isTouch = useIsTouch();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18 });
  const sy = useSpring(y, { stiffness: 240, damping: 18 });

  if (isTouch) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

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

/* --------- Animated burger → X icon --------- */
function BurgerIcon({ open }) {
  return (
    <span className="relative w-5 h-5 flex flex-col justify-center items-center">
      <motion.span
        className="absolute h-px w-5 bg-white"
        animate={
          open
            ? { rotate: 45, y: 0 }
            : { rotate: 0, y: -4 }
        }
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute h-px w-5 bg-white"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute h-px w-5 bg-white"
        animate={
          open
            ? { rotate: -45, y: 0 }
            : { rotate: 0, y: 4 }
        }
        transition={{ duration: 0.3 }}
      />
    </span>
  );
}

/* --------- Main Navbar --------- */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { mood } = useMood();
  const location = useLocation();
  const isTouch = useIsTouch();
  const currentPageLabel = PATH_TO_LABEL[location.pathname] || null;

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Body scroll lock + ESC to close
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <style>{NAV_STYLES}</style>

      {/* Top-left brand — ONLY on Home page */}
      {location.pathname === "/" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed top-3 sm:top-5 left-8 sm:left-12 z-[90]"
        >
          <NavLink to="/" className="relative group inline-block">
            <h1
              className="text-lg md:text-2xl font-black text-transparent bg-clip-text leading-none"
              style={{
                fontFamily: "Amsterdam-2",
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            >
              Kaushal Raj
            </h1>
          </NavLink>
        </motion.div>
      )}

      {/* Left-edge vertical "You're on" tab — ONLY on non-Home pages */}
      {location.pathname !== "/" && currentPageLabel && (
        <motion.div
          key="side-tab"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 80,
            damping: 16,
          }}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[130]"
        >
          {/* Soft glow behind */}
          <div
            className="absolute -inset-3 blur-xl opacity-50 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${mood.colors.primary}40, transparent 70%)`,
            }}
          />

          <div
            className="relative inline-flex flex-col items-center gap-2.5 py-4 px-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${mood.colors.primary}55`,
              borderLeft: "none",
              borderTopRightRadius: "0.9rem",
              borderBottomRightRadius: "0.9rem",
              backdropFilter: "blur(12px)",
              boxShadow: `8px 0 24px rgba(0,0,0,0.4), 0 0 24px ${mood.colors.primary}30`,
            }}
          >
            {/* Top pulsing dot */}
            <motion.span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: mood.colors.primary,
                boxShadow: `0 0 8px ${mood.colors.primary}`,
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />

            {/* "YOU ARE HERE" prefix - tiny vertical text */}
            <span
              className="font-bold uppercase leading-none tracking-[0.3em]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: "0.55rem",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              You are here
            </span>

            {/* Separator */}
            <span
              className="w-3 h-px"
              style={{ background: `${mood.colors.primary}60` }}
            />

            {/* Page name - bigger vertical text */}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPageLabel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-black uppercase tracking-[0.3em] leading-none"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "0.8rem",
                  color: "#fff",
                  textShadow: `0 0 12px ${mood.colors.primary}80`,
                }}
              >
                {currentPageLabel}
              </motion.span>
            </AnimatePresence>

            {/* Bottom accent dot */}
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{
                background: mood.colors.secondary,
                boxShadow: `0 0 6px ${mood.colors.secondary}`,
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Floating menu trigger - bottom-left */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[110]"
      >
        <Magnetic strength={14}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="group relative flex items-center gap-3 pl-3 pr-5 sm:pl-4 sm:pr-6 py-3 sm:py-3.5 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-[0.3em]"
            style={{
              background: open
                ? `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`
                : "rgba(255,255,255,0.05)",
              border: open
                ? `1px solid ${mood.colors.primary}`
                : "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(12px)",
              boxShadow: open
                ? `0 14px 40px ${mood.colors.primary}50`
                : "0 8px 24px rgba(0,0,0,0.3)",
              transition: "all 0.4s ease",
            }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center -ml-1"
              style={{
                background: open
                  ? "rgba(255,255,255,0.18)"
                  : `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            >
              <BurgerIcon open={open} />
            </span>
            <span>{open ? "Close" : "Menu"}</span>
            {/* Pulsing ring */}
            {!open && (
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `1px solid ${mood.colors.primary}60` }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            )}
          </button>
        </Magnetic>
      </motion.div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background — clip-path reveal on desktop, plain fade on touch (clip-path
                animation on a fullscreen layer is janky on mobile GPUs) */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.background}fa, ${mood.colors.background}ff)`,
              }}
              initial={
                isTouch ? { opacity: 0 } : { clipPath: "circle(0% at 8% 92%)" }
              }
              animate={
                isTouch
                  ? { opacity: 1 }
                  : { clipPath: "circle(150% at 8% 92%)" }
              }
              exit={
                isTouch ? { opacity: 0 } : { clipPath: "circle(0% at 8% 92%)" }
              }
              transition={{
                duration: isTouch ? 0.25 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Marquee strip — desktop only (huge stroked text is paint-heavy on mobile) */}
            {!isTouch && (
              <div
                className="absolute pointer-events-none whitespace-nowrap select-none w-full"
                style={{ top: "22%" }}
              >
                <div
                  className="nav-marquee font-black"
                  style={{
                    fontSize: "clamp(4rem, 12vw, 10rem)",
                    letterSpacing: "-0.05em",
                    color: "transparent",
                    WebkitTextStroke: `1px ${mood.colors.primary}1f`,
                    lineHeight: 1,
                  }}
                >
                  <span className="pr-12">{MARQUEE_TEXT}</span>
                  <span className="pr-12">{MARQUEE_TEXT}</span>
                </div>
              </div>
            )}

            {/* Ambient orb — static, no continuous animation while menu open */}
            <div
              className="absolute pointer-events-none rounded-full blur-3xl"
              style={{
                width: 500,
                height: 500,
                top: "30%",
                left: "20%",
                background: `radial-gradient(circle, ${mood.colors.primary}22, transparent 60%)`,
              }}
            />

            {/* Top bar in overlay */}
            <motion.div
              className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span
                className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-bold"
                style={{ color: mood.colors.primary }}
              >
                Navigate
              </span>
              <Magnetic strength={14}>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <FaTimes className="text-base sm:text-lg" />
                </button>
              </Magnetic>
            </motion.div>

            {/* Menu items - CSS-only hover, no React state per item */}
            <div
              className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-7xl mx-auto"
              style={{ "--nav-primary": mood.colors.primary }}
            >
              <ul className="space-y-1 sm:space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      delay: 0.2 + i * 0.08,
                      type: "spring",
                      stiffness: 70,
                    }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                      }
                    >
                      <span className="nav-num">{item.num}</span>
                      <span className="nav-label">
                        {item.label}
                        <span className="nav-dot" />
                      </span>
                      <span className="nav-here">
                        <span className="nav-here-dot" />
                        You're here
                      </span>
                      <FaArrowRight className="nav-arrow hidden sm:block" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom row */}
              <motion.div
                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 md:left-20 right-6 sm:right-12 md:right-20 flex flex-wrap items-center justify-between gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <p
                  className="text-[10px] sm:text-xs uppercase tracking-[0.4em]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Press <kbd className="font-mono">ESC</kbd> to close
                </p>
                <p
                  className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold"
                  style={{ color: mood.colors.primary }}
                >
                  &copy; 2026 Kaushal Raj
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
