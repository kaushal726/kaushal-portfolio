import React from "react";
import "./Card.css";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

function Card(props) {
  return (
    <motion.div
      className="ultra-modern-card-wrapper"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="ultra-modern-card"
        whileHover={{
          y: -20,
          rotateY: 5,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated Border Gradient */}
        <div className="card-border-gradient"></div>

        {/* Main Card Container */}
        <div className="card-inner">
          {/* Animated Mesh Background */}
          <div className="card-mesh-bg"></div>

          {/* Floating Particles */}
          <div className="card-particles">
            <span className="particle particle-1"></span>
            <span className="particle particle-2"></span>
            <span className="particle particle-3"></span>
          </div>

          {/* Image Section with Hover Zoom */}
          <div
            className="card-image-section"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="image-frame">
              <motion.img
                alt={props.heading}
                className="card-project-image"
                src={props.src}
                whileHover={{ scale: 1.15, rotate: 2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {/* Gradient Overlay */}
              <div className="image-gradient-overlay"></div>
            </div>

            {/* Floating View Button */}
            <motion.a
              target="_blank"
              rel="noreferrer"
              href={props.href}
              className="floating-view-btn"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(50px)" }}
            >
              <span className="btn-glow"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="btn-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              <span className="btn-text">View Live</span>
            </motion.a>
          </div>

          {/* Content Section */}
          <div
            className="card-content-section"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Title with Animated Underline */}
            <motion.a
              target="_blank"
              rel="noreferrer"
              href={props.href}
              className="card-project-title"
              whileHover={{ x: 5 }}
            >
              <h3 className="title-text-modern">{props.heading}</h3>
              <div className="title-underline"></div>
            </motion.a>

            {/* Description */}
            <p className="card-project-description">{props.paragraph}</p>

            {/* Tech Stack Badges (if you have tech data) */}
            <div className="tech-badges">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">MongoDB</span>
            </div>

            {/* Bottom Action Bar */}
            <div className="card-action-bar">
              <motion.a
                href={props.href}
                target="_blank"
                rel="noreferrer"
                className="action-link"
                whileHover={{ scale: 1.05 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="action-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
                Details
              </motion.a>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="card-shine-effect"></div>
      </motion.div>
    </motion.div>
  );
}

export default Card;
