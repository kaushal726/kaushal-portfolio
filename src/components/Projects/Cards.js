import React from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { useMood } from "../../context/MoodContext";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

function Card({ heading, paragraph, src, href }) {
  const { mood } = useMood();

  return (
    <motion.div
      className="card-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      style={{ "--primary": mood.colors.primary, "--secondary": mood.colors.secondary }}
      whileHover={{ y: -8 }}
    >
      <div className="card-image-wrapper">
        <img src={src} alt={heading} className="card-image" />
        <div className="card-image-overlay" />
        <div className="card-live-badge">
          <span className="card-live-dot" />
          <span>Live</span>
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{heading}</h3>
        <p className="card-desc">{paragraph}</p>

        <div className="card-tech">
          <span className="card-tech-tag">React</span>
          <span className="card-tech-tag">Node</span>
          <span className="card-tech-tag">MongoDB</span>
        </div>

        <div className="card-footer">
          <a href={href} target="_blank" rel="noreferrer" className="card-link">
            View Details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href={href} target="_blank" rel="noreferrer" className="card-btn">
            Live
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
