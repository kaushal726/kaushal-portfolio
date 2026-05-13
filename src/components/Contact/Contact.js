import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaPaperPlane,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { useMood } from "../../context/MoodContext";

const RESUME_URL =
  "https://docs.google.com/document/d/1ah_2XrpLrWpvW9iAySFVL4mey1QvOWxWqU6Gbj67Lp0/edit?usp=sharing";

const CONTACT_LINKS = [
  {
    icon: FaGithub,
    label: "GitHub",
    sub: "github.com/kaushal726",
    href: "https://github.com/kaushal726",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    sub: "Kaushal Raj",
    href: "https://www.linkedin.com/in/kaushal-raj-074673213",
  },
  {
    icon: FaDownload,
    label: "Resume",
    sub: "View or download (Google Doc)",
    href: RESUME_URL,
  },
];

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const { mood } = useMood();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        "service_86joc1d",
        "template_16sp5v4",
        form.current,
        "Iq8MAMWZJQD1KCqT_"
      )
      .then(
        () => {
          event.target.reset();
          toast.success("Message sent — talk soon!");
          setSending(false);
        },
        (error) => {
          console.log(error.text);
          toast.error("Something went wrong. Try again?");
          setSending(false);
        }
      );
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  };

  const inputFocusBorder = mood.colors.primary;

  return (
    <div
      className="min-h-screen w-full pt-24 pb-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Ambient background orbs */}
      <motion.div
        className="absolute top-32 left-10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.primary}12, transparent)`,
        }}
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 50, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-10 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${mood.colors.secondary}12, transparent)`,
        }}
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 55, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: mood.colors.primary }}
          >
            Contact
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Notable', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            Get In{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Touch
            </span>
          </h1>
          <motion.div
            className="h-1 w-24 mx-auto rounded-full mb-5"
            style={{
              background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
            }}
            animate={{ width: [80, 140, 80] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Have a project, a question, or just want to say hi? Drop a message —
            I read every one.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 items-start">
          {/* Left: contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-4"
          >
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${mood.colors.primary}18`,
                    color: mood.colors.primary,
                    border: `1px solid ${mood.colors.primary}30`,
                  }}
                >
                  <FaEnvelopeOpenText />
                </div>
                <h2 className="text-white font-bold text-lg">
                  Reach me on
                </h2>
              </div>

              <div className="space-y-3">
                {CONTACT_LINKS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl transition-all hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                        }}
                      >
                        <Icon />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white font-semibold text-sm">
                          {c.label}
                        </div>
                        <div
                          className="text-xs truncate"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          {c.sub}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${mood.colors.primary}10, ${mood.colors.secondary}08)`,
                border: `1px solid ${mood.colors.primary}25`,
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Prefer email? Use the form on the right — it lands directly in
                my inbox.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
            style={{
              background: "rgba(10,10,20,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.colors.primary}, ${mood.colors.secondary}, transparent)`,
              }}
            />

            <form
              ref={form}
              className="space-y-5"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Your Name
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl outline-none transition-all focus:bg-white/5"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                  name="user_name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Your Email
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl outline-none transition-all focus:bg-white/5"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                  name="user_email"
                  type="email"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Your Message
                </label>
                <textarea
                  className="w-full min-h-[160px] p-4 rounded-xl outline-none transition-all focus:bg-white/5 resize-none"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                  name="user_message"
                  rows="6"
                  placeholder="Tell me a bit about what you're working on..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-13 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white inline-flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  boxShadow: `0 10px 30px ${mood.colors.primary}40`,
                }}
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs mt-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          &copy; 2026 Kaushal Raj. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default Contact;
