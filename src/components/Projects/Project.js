import React from "react";
import Card from "./Cards";
import dataStore from "../../db/dataStore";
import { motion } from "framer-motion";

const Project = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen w-full pt-24 pb-40 px-4 md:px-8">
      {/* Header Section */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-bold text-lg md:text-xl mb-3">
          FEATURED WORKS
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
          My Projects
        </h1>
        <div className="flex justify-center gap-2 mb-4">
          <motion.div
            className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore my latest projects showcasing modern design, cutting-edge
          technologies, and creative solutions
        </p>
      </motion.div>

      {/* Staggered Bento Grid Layout */}
      <motion.div
        className="max-w-7xl mx-auto overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max overflow-hidden">
          {dataStore.map((data, i) => {
            // Determine card size based on index for bento-style layout
            const sizeClass =
              i === 0 ? "lg:col-span-2 lg:row-span-1" : "col-span-1";
            const isLarge = i === 0;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative overflow-hidden ${sizeClass}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -10 }}
              >
                {/* Card with responsive sizing */}
                <div className={isLarge ? "h-auto" : "h-auto"}>
                  <Card
                    key={i}
                    heading={data.name}
                    paragraph={data.description}
                    src={data.src}
                    href={data.link}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom decorative elements */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-400 text-sm">More projects coming soon... 🚀</p>
      </motion.div>
    </div>
  );
};

export default Project;
