import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

let Contact = () => {
  const form = useRef();

  let handleSubmit = (event) => {
    event.preventDefault();
    emailjs
      .sendForm(
        "service_86joc1d",
        "template_16sp5v4",
        form.current,
        "Iq8MAMWZJQD1KCqT_",
      )
      .then(
        (result) => {
          console.log(result.text);
          event.target.reset();
          toast.success("🚀 Message sent to the cosmos! 🌌");
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center flex-col py-24 px-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      style={{ perspective: "2000px" }}
    >
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 50, rotateX: -20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 80,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-60 animate-pulse"></div>
              <span className="text-7xl relative z-10 drop-shadow-2xl">✉️</span>
            </div>
          </motion.div>
          <motion.h2
            className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Have an exciting project or just want to chat? I'd love to hear from
            you!
          </motion.p>
        </div>

        {/* Form Container with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          whileHover={{
            scale: 1.02,
            rotateY: 1,
            transition: { duration: 0.3 },
          }}
          className="relative p-10 md:p-14 rounded-3xl backdrop-blur-3xl bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-slate-900/80 border border-purple-500/30 shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            transformStyle: "preserve-3d",
            transform: "translateZ(0)",
          }}
        >
          {/* Gradient Background Overlay */}
          <div className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-600/15 to-blue-600/15 animate-gradient"></div>
          </div>

          <form
            ref={form}
            className="relative z-10 space-y-6"
            onSubmit={handleSubmit}
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Name Input */}
            <motion.div
              className="group"
              whileHover={{ x: 5 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <label className="block text-gray-200 text-sm font-semibold mb-3 ml-1">
                Your Name
              </label>
              <div className="relative">
                <input
                  className="w-full h-14 px-5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-400/30 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-slate-800/80 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/30"
                  name="user_name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="group"
              whileHover={{ x: 5 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <label className="block text-gray-200 text-sm font-semibold mb-3 ml-1">
                Your Email
              </label>
              <div className="relative">
                <input
                  className="w-full h-14 px-5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-400/30 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-slate-800/80 focus:border-pink-400/60 focus:shadow-lg focus:shadow-pink-500/30"
                  name="user_email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              className="group"
              whileHover={{ x: 5 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <label className="block text-gray-200 text-sm font-semibold mb-3 ml-1">
                Your Message
              </label>
              <div className="relative">
                <textarea
                  placeholder="Tell me about your exciting project..."
                  className="w-full min-h-[160px] p-5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-400/30 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-slate-800/80 focus:border-blue-400/60 focus:shadow-lg focus:shadow-blue-500/30 resize-none"
                  name="user_message"
                  rows="6"
                  required
                ></textarea>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              className="relative w-full h-14 overflow-hidden rounded-xl font-bold text-lg text-white transition-all duration-300 group/btn"
              type="submit"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transform: "translateZ(40px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transition-all duration-300 group-hover/btn:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </span>
            </motion.button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Contact;
