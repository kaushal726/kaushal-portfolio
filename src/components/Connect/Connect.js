import { useRef } from "react";
import "./Connect.css";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMood } from "../../context/MoodContext";

const MARQUEE_PHRASE =
  "LET'S CONNECT · AVAILABLE · LET'S BUILD · OPEN TO COLLAB · LET'S CONNECT · AVAILABLE · LET'S BUILD · OPEN TO COLLAB · ";

const SOCIAL_LINKS = [
  {
    Icon: FaGithub,
    label: "GitHub",
    handle: "@kaushal726",
    href: "https://github.com/kaushal726",
    color: "#ffffff",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    handle: "Kaushal Raj",
    href: "https://www.linkedin.com/in/kaushal-raj-074673213",
    color: "#0a66c2",
  },
  {
    Icon: FaFacebookF,
    label: "Facebook",
    handle: "@kaushal.927",
    href: "https://www.facebook.com/kaushal.927",
    color: "#1877f2",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    handle: "@kaushal_726",
    href: "https://instagram.com/kaushal_726",
    color: "#e1306c",
  },
  {
    Icon: FaSnapchatGhost,
    label: "Snapchat",
    handle: "@kaushal_7266",
    href: "https://snapchat.com/add/kaushal_7266",
    color: "#fcdc00",
  },
];

const CONNECT_STYLES = `
  .connect-marquee {
    display: inline-flex;
    animation: connectMarquee 40s linear infinite;
    will-change: transform;
  }
  .connect-marquee.reverse { animation-direction: reverse; }
  .connect-marquee.fast { animation-duration: 28s; }
  @keyframes connectMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
`;

function Magnetic({ children, strength = 25, className = "", style = {} }) {
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

const Connect = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { mood } = useMood();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const marqueeOffset = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const marqueeOffset2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Cursor spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.section
      ref={ref}
      onMouseMove={onMove}
      className="relative py-28 sm:py-36 px-4 overflow-hidden"
      style={{ backgroundColor: mood.colors.background }}
    >
      <style>{CONNECT_STYLES}</style>

      {/* Two massive scrolling marquee strips behind content */}
      <motion.div
        className="absolute pointer-events-none whitespace-nowrap select-none"
        style={{
          top: "12%",
          left: 0,
          right: 0,
          y: marqueeOffset,
        }}
      >
        <div
          className="connect-marquee font-black"
          style={{
            fontSize: "clamp(4rem, 14vw, 12rem)",
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: `1px ${mood.colors.primary}25`,
            lineHeight: 1,
          }}
        >
          <span className="pr-12">{MARQUEE_PHRASE}</span>
          <span className="pr-12">{MARQUEE_PHRASE}</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none whitespace-nowrap select-none"
        style={{
          bottom: "12%",
          left: 0,
          right: 0,
          y: marqueeOffset2,
        }}
      >
        <div
          className="connect-marquee reverse fast font-black"
          style={{
            fontSize: "clamp(3rem, 10vw, 9rem)",
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: `1px ${mood.colors.secondary}20`,
            lineHeight: 1,
          }}
        >
          <span className="pr-12">{MARQUEE_PHRASE}</span>
          <span className="pr-12">{MARQUEE_PHRASE}</span>
        </div>
      </motion.div>

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}20, transparent)`,
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}20, transparent)`,
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-3xl hidden md:block"
        style={{
          width: 600,
          height: 600,
          x: useTransform(mx, (v) => v - 300),
          y: useTransform(my, (v) => v - 300),
          background: `radial-gradient(circle, ${mood.colors.primary}15, transparent 60%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-5 inline-flex items-center gap-2"
          style={{ color: mood.colors.primary }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#22c55e" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Available
        </motion.p>

        {/* MASSIVE heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
          className="font-black text-white leading-[0.9] mb-6"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 10rem)",
            letterSpacing: "-0.06em",
          }}
        >
          Let's{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Connect.
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl mb-12 max-w-xl mx-auto"
          style={{ color: mood.colors.textMuted }}
        >
          Open for collaborations, opportunities, and the occasional rabbit-hole
          conversation about clean APIs.
        </motion.p>

        {/* CTA — big magnetic button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <Magnetic strength={14}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 sm:gap-4 px-7 sm:px-9 py-4 sm:py-5 rounded-full font-bold text-white text-base sm:text-lg transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                boxShadow: `0 14px 40px ${mood.colors.primary}50`,
              }}
            >
              <motion.span
                className="text-xl sm:text-2xl"
                animate={{ x: [0, 4, 0], y: [0, -2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaPaperPlane />
              </motion.span>
              <span>Drop a message</span>
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>

        {/* Social row — floating, no card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary})`,
              }}
            />
            <span
              className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold"
              style={{ color: mood.colors.textMuted }}
            >
              or find me on
            </span>
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, transparent)`,
              }}
            />
          </div>

          <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            {SOCIAL_LINKS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1, y: 0 } : {}
                  }
                  transition={{
                    delay: 0.6 + i * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <Magnetic strength={22}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group relative block"
                    >
                      <motion.div
                        className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                        style={{
                          background: `radial-gradient(circle, ${s.color}70, transparent 70%)`,
                        }}
                      />
                      <div
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all group-hover:-translate-y-1"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          backdropFilter: "blur(8px)",
                          color: s.color === "#ffffff" ? "#fff" : s.color,
                        }}
                      >
                        <Icon />
                      </div>
                      <div
                        className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: mood.colors.textMuted }}
                      >
                        {s.handle}
                      </div>
                    </a>
                  </Magnetic>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-xs" style={{ color: mood.colors.textMuted }}>
            &copy; 2026{" "}
            <span
              className="font-semibold"
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kaushal Raj
            </span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Connect;
