import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { AiOutlineForm } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/project", icon: GoProjectRoadmap, label: "Projects" },
    { to: "/about", icon: FaRegUser, label: "About" },
    { to: "/contact", icon: AiOutlineForm, label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolling
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo with Gradient Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <NavLink to="/" className="relative z-10">
              <h1
                className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                style={{ fontFamily: "Amsterdam-2" }}
              >
                Kaushal Raj
              </h1>
            </NavLink>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 md:gap-3"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setActiveIndex(index)}
                  className={({ isActive }) =>
                    `relative group px-4 py-3 md:px-5 md:py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "bg-white/5 hover:bg-white/10"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center"
                      >
                        <Icon
                          className={`text-xl md:text-2xl ${
                            isActive ? "text-white" : "text-gray-300"
                          }`}
                        />
                        {/* Desktop Label */}
                        <span className="hidden xl:inline-block ml-2 text-sm font-semibold text-white">
                          {item.label}
                        </span>
                      </motion.div>

                      {/* Hover Glow */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10 ${
                          isActive ? "opacity-40" : ""
                        }`}
                      ></div>

                      {/* Tooltip on Mobile */}
                      <div className="xl:hidden absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        {item.label}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolling ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.nav>
  );
};

export default Navbar;
