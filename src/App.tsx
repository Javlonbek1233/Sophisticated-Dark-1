import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedCursor from "./components/AnimatedCursor";
import BackgroundCanvas from "./components/BackgroundCanvas";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { ArrowUp, Sparkles, AlertCircle } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWarpTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Cinematic intro preloader screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen selection:bg-white selection:text-black">
          {/* Real-time interactive canvas starlight networks */}
          <BackgroundCanvas />

          {/* Liquid animated mouse cursor tracker */}
          <AnimatedCursor />

          {/* Glassmorphism futuristic navigation bar */}
          <Navbar />

          {/* Immersive layout contents */}
          <motion.main
            id="app-main"
            className="relative z-10 flex flex-col w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* 1. Hero Entrance Sector */}
            <Hero />

            {/* 2. Interactive Projects Grid */}
            <Projects />

            {/* 3. Specialized Services Bento */}
            <Services />

            {/* 4. Skills Telemetry Analysis */}
            <Skills />

            {/* 5. Contact Corridor Forms */}
            <Contact />
          </motion.main>

          {/* Minimal cinematic technical footer */}
          <footer className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-12 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                <span className="font-display font-black text-sm uppercase tracking-widest text-white">
                  ÆTHER STUDY // CREATIVE INFRASTRUCTURE
                </span>
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                  Copyright © {new Date().getFullYear()} Aether Studio. All permissions calibrated.
                </span>
               </div>

              {/* Back to top warp control */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    onClick={handleWarpTop}
                    className="group flex items-center gap-2.5 px-4 py-2 border border-white/10 bg-white/[0.02] rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 self-center sm:self-auto cursor-none"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest">Warp Top</span>
                    <ArrowUp className="w-3.5 h-3.5 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
