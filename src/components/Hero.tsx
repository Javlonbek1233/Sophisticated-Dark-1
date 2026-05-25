import { motion } from "motion/react";
import { ArrowDown, Flame, AppWindow, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [timeStr, setTimeStr] = useState("00:00:00 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getUTCHours().toString().padStart(2, "0");
      const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      const seconds = now.getUTCSeconds().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("projects");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 lg:px-12 overflow-hidden"
    >
      {/* Visual glowing overlay elements */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Hero Sub-header Tech Metrics */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-white/5 pb-8 relative z-10">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Core Unit Status
          </span>
          <span className="font-mono text-xs text-white/50 animate-pulse">DEPLOYED // SYSTEMS NATIVE</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Temporal Vector</span>
          <span className="font-mono text-xs text-white/70">{timeStr}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Primary Studio</span>
          <span className="font-serif italic text-xs text-white/90 uppercase tracking-widest font-bold">DIGITAL CRAFTSTUDIO</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Core Specialty</span>
          <span className="font-mono text-xs text-white/70">UX INTERFACES & SCROLL GRAPHICS</span>
        </div>
      </div>

      {/* Main Display Title and Cinematic Presentation */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start justify-center flex-grow py-12 relative z-10">
        <div className="w-full max-w-5xl">
          {/* Tagline micro text */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flame className="w-3.5 h-3.5 text-white/75" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
              Interactive Web Architect Portfolio
            </span>
          </motion.div>

          {/* Massively bold editorial mask display title */}
          <h1 className="font-display font-black text-[10vw] md:text-[6.5vw] tracking-tighter leading-[0.9] text-white select-none">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              WEAVING SENSORY
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/25"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-serif italic capitalize text-white">Digital</span> Surfaces
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              FOR DEEP SPECTRUMS.
            </motion.span>
          </h1>

          {/* Descriptive cinematic subtext */}
          <motion.p
            className="mt-8 text-white/50 text-base md:text-lg max-w-xl font-light leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A high-fidelity developer crafting award-winning spatial screen systems, 
            smooth responsive interactions, and immersive 3D canvas rendering matrices.
          </motion.p>
        </div>
      </div>

      {/* Hero Footer Action Guides */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10 border-t border-white/5 pt-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full border border-white/10 bg-white/[0.02]">
              <AppWindow className="w-4 h-4 text-white/50" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-white/40 uppercase">Architecture</span>
              <span className="font-mono text-xs text-white/80">Tailwind + GSAP Vector</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full border border-white/10 bg-white/[0.02]">
              <Cpu className="w-4 h-4 text-white/50" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-white/40 uppercase">Performance</span>
              <span className="font-mono text-xs text-white/80">Fluid 60FPS Refresh</span>
            </div>
          </div>
        </div>

        {/* Floating animated down arrow scroll anchor */}
        <motion.button
          onClick={handleScrollDown}
          className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/[0.01] hover:border-white/40 transition-colors duration-500 self-end select-none cursor-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors duration-300">
            DISCOVER PROJECTS
          </span>
          <motion.div
            className="p-1 rounded-full bg-white/5 text-white flex items-center justify-center"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
