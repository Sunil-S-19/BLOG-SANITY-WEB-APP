import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,23,0)_0%,rgba(10,10,12,1)_100%)] z-10"></div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 pointer-events-none z-0"
      >
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-red-500/30"></div>
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-red-500/30"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-red-500/30"></div>
      </motion.div>

      <section className="relative z-20 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-[2px] w-12 bg-red-500"></span>
          <span className="text-red-500 font-black tracking-[0.5em] uppercase text-sm">
            Welcome to the limit
          </span>
          <span className="h-[2px] w-12 bg-red-500"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-none mb-8"
        >
          PURE <span className="gradient-text">HORSEPOWER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 max-w-xl text-lg md:text-xl mb-12 leading-relaxed"
        >
          Deep dives into the mechanics, history, and future of the world's most
          impressive automotive achievements.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link
            to="/blog"
            className="group relative px-10 py-5 bg-red-600 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-red-600 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-red-600">
              Enter The Garage
            </span>
          </Link>

          <button className="px-10 py-5 border-2 border-white/20 rounded-full font-black uppercase tracking-widest text-sm hover:border-red-500 hover:text-red-500 transition-all duration-300">
            Collection '26
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-10 grid grid-cols-3 gap-12 border-t border-white/5 pt-12"
        >
          <div className="text-center group cursor-default">
            <p className="text-3xl font-black gradient-text group-hover:scale-110 transition-transform">
              500+
            </p>
            <p className="text-xs uppercase text-gray-500 tracking-widest mt-1">
              Classics
            </p>
          </div>
          <div className="text-center group cursor-default">
            <p className="text-3xl font-black gradient-text group-hover:scale-110 transition-transform">
              25k
            </p>
            <p className="text-xs uppercase text-gray-500 tracking-widest mt-1">
              Readers
            </p>
          </div>
          <div className="text-center group cursor-default">
            <p className="text-3xl font-black gradient-text group-hover:scale-110 transition-transform">
              8ms
            </p>
            <p className="text-xs uppercase text-gray-500 tracking-widest mt-1">
              Response
            </p>
          </div>
        </motion.div>
      </section>

      {/* Decorative side text */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 50, opacity: 0.1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute right-0 top-1/2 -rotate-90 translate-x-1/2 hidden lg:block"
      >
        <p className="text-8xl font-black italic uppercase tracking-tighter">
          Velocity
        </p>
      </motion.div>
    </div>
  );
}
