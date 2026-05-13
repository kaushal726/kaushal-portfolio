import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaServer,
  FaPaintBrush,
  FaRocket,
  FaDownload,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import avatarImg from "../../assets/Kaushal.png";
import { useMood } from "../../context/MoodContext";

const RESUME_URL =
  "https://docs.google.com/document/d/1ah_2XrpLrWpvW9iAySFVL4mey1QvOWxWqU6Gbj67Lp0/edit?usp=sharing";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 80, damping: 18 },
  }),
};

const WHAT_I_DO = [
  {
    icon: FaCode,
    title: "Full-Stack Development",
    text: "End-to-end web apps — from database schema and REST APIs to the user interface that ships.",
  },
  {
    icon: FaServer,
    title: "APIs & Data Modeling",
    text: "Designing clean, indexed schemas and authenticated REST endpoints that scale per business.",
  },
  {
    icon: FaPaintBrush,
    title: "Interface Engineering",
    text: "Building thoughtful, accessible interfaces with React, Tailwind, and a careful eye for motion.",
  },
  {
    icon: FaRocket,
    title: "Shipping Products",
    text: "Taking an idea from blank file to a live URL — deploying, iterating, fixing the rough edges.",
  },
];

const VALUES = [
  {
    title: "Clarity over cleverness",
    text: "Boring code that reads well beats clever code that nobody can debug at 2am.",
  },
  {
    title: "Build the whole thing",
    text: "Front-end, back-end, deploy pipeline — owning every layer makes for better decisions everywhere.",
  },
  {
    title: "Polish matters",
    text: "Loading states, error paths, micro-interactions — the details are what make software feel real.",
  },
];

function Hero({ mood }) {
  return (
    <section className="relative pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center"
      >
        <motion.div
          className="relative mx-auto lg:mx-0"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-44 h-44 md:w-56 md:h-56 rounded-full p-1"
            style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              boxShadow: `0 0 60px ${mood.colors.primary}35`,
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{ background: mood.colors.background }}
            >
              <img
                src={avatarImg}
                alt="Kaushal Raj"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div
            className="absolute -inset-6 rounded-full blur-3xl opacity-30 -z-10"
            style={{
              background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            }}
          />
        </motion.div>

        <div className="text-center lg:text-left">
          <p
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: mood.colors.primary }}
          >
            About Me
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Notable', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            Kaushal{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Raj
            </span>
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            I build full-stack web applications — the kind that talk to a
            database, generate PDFs, hand back JSON, and still feel pleasant to
            click around.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Most of my work lives at the intersection of clean APIs and
            thoughtful interfaces. I care about how things are structured under
            the hood as much as how they feel on screen.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                boxShadow: `0 10px 30px ${mood.colors.primary}40`,
              }}
            >
              <FaDownload /> Resume
            </a>
            <Link
              to="/project"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              View Project <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function WhatIDo({ mood }) {
  return (
    <section className="relative py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs uppercase tracking-[0.4em] mb-3"
          style={{ color: mood.colors.primary }}
        >
          What I do
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-3"
          style={{ letterSpacing: "0.02em" }}
        >
          Four things I bring to every project
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {WHAT_I_DO.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
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
              <h3 className="text-white font-bold text-base mb-2">
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item.text}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function FeaturedProject({ mood }) {
  return (
    <section className="relative py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden p-8 md:p-12"
        style={{
          background: `linear-gradient(135deg, ${mood.colors.primary}10, ${mood.colors.secondary}08)`,
          border: `1px solid ${mood.colors.primary}25`,
        }}
      >
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none opacity-50"
          style={{
            background: `linear-gradient(135deg, transparent, ${mood.colors.primary}15, transparent)`,
          }}
        />

        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <p
              className="text-xs uppercase tracking-[0.4em] mb-3"
              style={{ color: mood.colors.primary }}
            >
              Featured Project
            </p>
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Notable', sans-serif" }}
            >
              e-BillX
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed mb-6 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              A multi-tenant inventory & billing SaaS — 14 modules, 80+ REST
              endpoints, JWT-secured, with real-time stock, PDF invoices, and a
              live dashboard. The work I'm most proud of.
            </p>
            <Link
              to="/project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                boxShadow: `0 10px 30px ${mood.colors.primary}40`,
              }}
            >
              Explore the case study <FaArrowRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Values({ mood }) {
  return (
    <section className="relative py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs uppercase tracking-[0.4em] mb-3"
          style={{ color: mood.colors.primary }}
        >
          What I value
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-white"
          style={{ letterSpacing: "0.02em" }}
        >
          A few things I keep returning to
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-3 gap-5"
      >
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            custom={i}
            variants={fadeUp}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="w-10 h-1 rounded-full mb-4"
              style={{
                background: `linear-gradient(90deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
              }}
            />
            <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {v.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function SocialFooter({ mood }) {
  return (
    <section className="relative py-16 px-4 md:px-8 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-sm uppercase tracking-[0.3em] mb-5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Find me elsewhere
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/kaushal726"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kaushal-raj-074673213"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            <FaLinkedin />
          </a>
        </div>

        <p
          className="text-xs mt-10"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          &copy; 2026 Kaushal Raj. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}

const About = () => {
  const { mood } = useMood();
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="min-h-screen w-full pb-12 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-32 left-10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}10, transparent)`,
        }}
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 50, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}10, transparent)`,
        }}
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 55, repeat: Infinity }}
      />

      <Hero mood={mood} />
      <WhatIDo mood={mood} />
      <FeaturedProject mood={mood} />
      <Values mood={mood} />
      <SocialFooter mood={mood} />
    </div>
  );
};

export default About;
