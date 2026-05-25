import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  "INITIALIZING CINEMATIC ENGINE...",
  "RESOLVING SHADER STENCIL MASK...",
  "CALIBRATING CURSOR MAGNETIC VECTORS...",
  "GENERATING DYNAMIC SYSTEM MATRIX...",
  "COMPILE SUCCESSFUL. WELCOME TO AETHER STUDY.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Simulate non-linear beautiful digital preloader
    const stepProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsCompleted(true);
            setTimeout(onComplete, 800); // Allow fadeout animation trigger
          }, 350);
          return 100;
        }
        
        // Random increments to make loaders look organic and authentic
        const remaining = 100 - prev;
        const increment = Math.max(1, Math.min(Math.floor(Math.random() * 15) + 1, remaining));
        return prev + increment;
      });
    };

    timer = setInterval(stepProgress, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Handle subtitle changing based on dynamic progress levels
  useEffect(() => {
    if (progress === 0) setStepIndex(0);
    else if (progress < 25) setStepIndex(0);
    else if (progress < 50) setStepIndex(1);
    else if (progress < 75) setStepIndex(2);
    else if (progress < 95) setStepIndex(3);
    else setStepIndex(4);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-8 lg:p-14 select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0.9,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Header metadata */}
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                Aether System Beta v2.56
              </span>
            </div>
            <div className="font-mono text-[10px] text-white/30 text-right uppercase tracking-wider">
              PORTFOLIO CORE MODULE // 2026
            </div>
          </div>

          {/* Central Percentage Reveal */}
          <div className="flex flex-col items-center justify-center my-auto">
            {/* Massive modern percentage indicator */}
            <div className="relative overflow-hidden h-[12vw] sm:h-[8vw] flex items-center justify-center">
              <motion.h1 
                className="font-display font-extrabold text-[12vw] sm:text-[8vw] tracking-tighter leading-none text-white flex items-baseline select-none"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: "power4.out" }}
              >
                {progress.toString().padStart(3, "0")}
                <span className="text-white/40 font-sans font-light text-[5vw] sm:text-[3vw] ml-1">%</span>
              </motion.h1>
            </div>
            
            {/* Cinematic loader line */}
            <div className="w-full max-w-[280px] h-[1px] bg-white/10 rounded-full mt-4 overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-white/20 via-white to-white/20"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Footer statuses */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="font-mono text-[10px] tracking-widest text-white/60 min-h-[1.5rem] flex items-center uppercase">
              <span className="text-white/40 mr-2">&gt;&gt;</span>
              {loadingSteps[stepIndex]}
            </div>
            
            <div className="font-mono text-[9px] text-white/20 select-none text-right flex flex-col self-end hidden sm:block">
              <span>LATENCY: 14MS // CLOUD RUN INFRASTRUCTURE READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
