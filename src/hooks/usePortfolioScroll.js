import { useScroll, useTransform, useSpring } from "framer-motion";

export const usePortfolioScroll = () => {
  const { scrollYProgress } = useScroll();

  // Ultra-smooth spring for buttery animations even during fast scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // Hero content fades as user scrolls (delayed start for smooth transition)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]);

  // Parallax values for vision section
  const visionTextY1 = useTransform(scrollYProgress, [0.5, 0.7], [0, -40]);
  const visionTextY2 = useTransform(scrollYProgress, [0.5, 0.7], [0, -20]);

  // Central circle scale - BIG during hero, then shrinks
  const centralScale = useTransform(scrollYProgress, [0, 0.15, 0.3], [1.4, 1.2, 0.5]);
  const centralY = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, -30, -150]);
  const centralOpacity = useTransform(scrollYProgress, [0, 0.35], [0.8, 0]);

  // Intro overlay
  const introOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.05], [0, -100]);
  const introScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);

  return {
    scrollYProgress: smoothProgress,
    introOpacity,
    introY,
    introScale,
    heroOpacity,
    heroY,
    visionTextY1,
    visionTextY2,
    centralScale,
    centralY,
    centralOpacity,
  };
};
