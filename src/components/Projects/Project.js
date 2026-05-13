import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaShieldAlt,
  FaBoxOpen,
  FaLayerGroup,
  FaTruck,
  FaUserFriends,
  FaShoppingCart,
  FaCashRegister,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHistory,
  FaUserTie,
  FaCalendarCheck,
  FaChartLine,
  FaFilePdf,
  FaFileExcel,
  FaBuilding,
  FaCogs,
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import { eBillX } from "../../db/dataStore";
import { useMood } from "../../context/MoodContext";

const ICONS = {
  auth: FaShieldAlt,
  security: FaLock,
  products: FaBoxOpen,
  categories: FaLayerGroup,
  suppliers: FaTruck,
  customers: FaUserFriends,
  purchase: FaShoppingCart,
  sale: FaCashRegister,
  purchaseReturn: FaUndoAlt,
  saleReturn: FaUndoAlt,
  payments: FaMoneyBillWave,
  stock: FaHistory,
  staff: FaUserTie,
  attendance: FaCalendarCheck,
  dashboard: FaChartLine,
  pdf: FaFilePdf,
  excel: FaFileExcel,
  tenant: FaBuilding,
  finance: FaMoneyBillWave,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: "spring", stiffness: 80, damping: 18 },
  }),
};

function SectionHeading({ eyebrow, title, accent, secondary, description }) {
  return (
    <div className="text-center mb-12">
      <p
        className="text-xs uppercase tracking-[0.4em] mb-3"
        style={{ color: accent }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-3xl md:text-5xl font-bold text-white mb-4"
        style={{ fontFamily: "'Notable', sans-serif", letterSpacing: "0.03em" }}
      >
        {title}
      </h2>
      <motion.div
        className="w-24 h-1 mx-auto rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, ${secondary}, transparent)`,
        }}
        animate={{ width: [80, 140, 80] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {description && (
        <p
          className="text-base md:text-lg mt-6 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function Hero({ mood }) {
  const { name, subtitle, tagline, version, image, status, links, metrics } =
    eBillX;

  return (
    <section className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        className="grid lg:grid-cols-2 gap-10 items-center"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest"
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.4)",
                color: "#22c55e",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {status.toUpperCase()}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold tracking-widest"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {version}
            </span>
          </div>

          <p
            className="text-sm uppercase tracking-[0.4em] mb-3"
            style={{ color: mood.colors.primary }}
          >
            Major Project
          </p>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
            style={{
              fontFamily: "'Notable', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            {name}
          </h1>
          <p
            className="text-lg md:text-xl font-medium mb-5"
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {subtitle}
          </p>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                boxShadow: `0 10px 30px ${mood.colors.primary}40`,
              }}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
            <a
              href={links.frontend}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <FaGithub /> Frontend
            </a>
            <a
              href={links.backend}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <FaGithub /> Backend
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border"
          style={{
            borderColor: `${mood.colors.primary}30`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${mood.colors.primary}20`,
          }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${mood.colors.primary}25 100%)`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Metrics strip */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            custom={i}
            variants={fadeUp}
            className="text-center p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="text-3xl md:text-4xl font-bold mb-1"
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {m.value}
            </div>
            <div
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Highlights({ mood }) {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Why it matters"
        title="Key Highlights"
        accent={mood.colors.primary}
        secondary={mood.colors.secondary}
        description="What makes e-BillX a complete platform, not just a CRUD app."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {eBillX.highlights.map((h, i) => {
          const Icon = ICONS[h.icon] || FaCogs;
          return (
            <motion.div
              key={h.title}
              custom={i}
              variants={fadeUp}
              className="p-6 rounded-2xl transition-all hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}30, ${mood.colors.secondary}20)`,
                  color: mood.colors.primary,
                  border: `1px solid ${mood.colors.primary}40`,
                }}
              >
                <Icon />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{h.title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {h.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function Features({ mood }) {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Capabilities"
        title="14 Modules. One Platform."
        accent={mood.colors.primary}
        secondary={mood.colors.secondary}
        description="Every domain a real retailer or wholesaler needs — wired end-to-end."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {eBillX.features.map((f, i) => {
          const Icon = ICONS[f.icon] || FaCogs;
          return (
            <motion.div
              key={f.title}
              custom={i % 6}
              variants={fadeUp}
              className="p-6 rounded-2xl flex flex-col h-full transition-all hover:-translate-y-1"
              style={{
                background: "rgba(10,10,20,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${mood.colors.primary}18`,
                    color: mood.colors.primary,
                    border: `1px solid ${mood.colors.primary}30`,
                  }}
                >
                  <Icon />
                </div>
                <h3 className="text-white font-bold text-base md:text-lg leading-tight mt-1">
                  {f.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {f.description}
              </p>
              <ul className="space-y-1.5 mt-auto">
                {f.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: mood.colors.primary }}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function TechStack({ mood }) {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Under the hood"
        title="Tech Stack"
        accent={mood.colors.primary}
        secondary={mood.colors.secondary}
        description="Production-grade libraries chosen for reliability, security, and developer ergonomics."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-2 gap-5"
      >
        {eBillX.techStack.map((group, i) => (
          <motion.div
            key={group.group}
            custom={i}
            variants={fadeUp}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaServer style={{ color: mood.colors.primary }} />
              <h3
                className="text-sm uppercase tracking-widest font-bold"
                style={{ color: mood.colors.primary }}
              >
                {group.group}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((it) => (
                <span
                  key={it.name}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  {it.name}
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>
                    · {it.note}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Workflows({ mood }) {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="How it works"
        title="Core Workflows"
        accent={mood.colors.primary}
        secondary={mood.colors.secondary}
        description="Every transaction triggers a coordinated chain: validation, persistence, stock movement, ledger updates, audit log."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid lg:grid-cols-3 gap-5"
      >
        {eBillX.workflows.map((w, i) => (
          <motion.div
            key={w.title}
            custom={i}
            variants={fadeUp}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              className="text-white font-bold mb-5 text-base"
              style={{ letterSpacing: "0.02em" }}
            >
              {w.title}
            </h3>
            <ol className="space-y-3">
              {w.steps.map((step, idx) => (
                <li key={step} className="flex gap-3 items-start">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                      color: "#fff",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className="text-sm leading-relaxed pt-0.5"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Architecture({ mood }) {
  return (
    <section className="relative py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="Codebase"
        title="Architecture Overview"
        accent={mood.colors.primary}
        secondary={mood.colors.secondary}
        description="Clean separation of concerns across controllers, models, routes, middlewares, and services."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="p-6 md:p-8 rounded-2xl"
        style={{
          background: "rgba(10,10,20,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <ul className="space-y-3">
          {eBillX.architecture.map((line, i) => (
            <motion.li
              key={line}
              custom={i}
              variants={fadeUp}
              className="flex gap-3 items-start"
            >
              <FaDatabase
                className="flex-shrink-0 mt-1"
                style={{ color: mood.colors.primary }}
              />
              <span
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {line}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

function FinalCTA({ mood }) {
  const { links } = eBillX;
  return (
    <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-5"
          style={{ fontFamily: "'Notable', sans-serif", letterSpacing: "0.03em" }}
        >
          Try it{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            live
          </span>
        </h2>
        <p
          className="text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Sign up with a test account, or browse the source.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              boxShadow: `0 10px 30px ${mood.colors.primary}40`,
            }}
          >
            <FaExternalLinkAlt /> Open App
          </a>
          <a
            href={links.frontend}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <FaGithub /> Frontend Repo
          </a>
          <a
            href={links.backend}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <FaGithub /> Backend Repo
          </a>
        </div>
      </motion.div>
    </section>
  );
}

const Project = () => {
  const { mood } = useMood();
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="min-h-screen w-full pb-20 relative overflow-hidden"
    >
      {/* Background ambient orbs */}
      <motion.div
        className="absolute top-32 left-10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}10, transparent)`,
        }}
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 50, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}10, transparent)`,
        }}
        animate={{ x: [0, -15, 0], y: [0, 12, 0] }}
        transition={{ duration: 55, repeat: Infinity }}
      />

      <Hero mood={mood} />
      <Highlights mood={mood} />
      <Features mood={mood} />
      <TechStack mood={mood} />
      <Workflows mood={mood} />
      <Architecture mood={mood} />
      <FinalCTA mood={mood} />
    </div>
  );
};

export default Project;
