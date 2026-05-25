import { useState } from "react";
import { Cpu, ChevronRight, Sparkles, Server, Figma, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Skill } from "../types";

const skillsData: Skill[] = [
  // Core Skills
  { name: "React JS", category: "Frontend", level: 95, iconName: "LayoutGrid" },
  { name: "TypeScript", category: "Core", level: 92, iconName: "Cpu" },
  { name: "GSAP / Motion", category: "Frontend", level: 90, iconName: "Sparkles" },
  { name: "WebGL / HTML5 Canvas", category: "Design", level: 85, iconName: "Sparkles" },
  { name: "Tailwind CSS", category: "Frontend", level: 98, iconName: "LayoutGrid" },
  { name: "HMR Optimizations", category: "Core", level: 88, iconName: "Cpu" },
  
  // Backend & Servers
  { name: "Node.js / Express", category: "Backend", level: 85, iconName: "Server" },
  { name: "API Rate Limiting", category: "Backend", level: 80, iconName: "Server" },
  { name: "esbuild / Bundling", category: "Core", level: 84, iconName: "Cpu" },
  
  // Digital Design
  { name: "Figma Topology", category: "Design", level: 90, iconName: "Figma" },
  { name: "Kinetic UI Typography", category: "Design", level: 94, iconName: "Figma" },
  { name: "D3.js Topology mapping", category: "Frontend", level: 82, iconName: "LayoutGrid" },
];

const categories: Array<"All" | "Core" | "Frontend" | "Backend" | "Design"> = [
  "All",
  "Core",
  "Frontend",
  "Backend",
  "Design",
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Core" | "Frontend" | "Backend" | "Design">("All");

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-4 h-4 text-white/75" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-white/75" />;
      case "Server":
        return <Server className="w-4 h-4 text-white/75" />;
      case "Figma":
        return <Figma className="w-4 h-4 text-white/75" />;
      case "LayoutGrid":
        return <LayoutGrid className="w-4 h-4 text-white/75" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10 max-w-7xl mx-auto">
      {/* Services title and headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-3.5 h-3.5 text-white/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              Engine Diagnostics
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white">
            EXPERTISE / <br className="hidden sm:inline" />
            <span className="text-white/40 font-serif italic font-light">STACK TELEMETRY</span>
          </h2>
        </div>
        
        {/* Category switcher pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-white/[0.02] border border-white/5 max-w-full">
          {categories.map((cat) => (
            <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider transition-all duration-300 select-none cursor-none ${
                 activeCategory === cat
                   ? "bg-white/10 text-white border border-white/15"
                   : "text-white/40 hover:text-white border border-transparent"
               }`}
             >
               {cat}
             </button>
          ))}
        </div>
      </div>

      {/* Grid of custom status bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-lg bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300 group flex flex-col justify-between gap-4 cursor-none relative overflow-hidden"
            >
              {/* Internal abstract visual lines */}
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-white/5 group-hover:bg-white/20 transition-colors duration-500" />

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-white/[0.02] border border-white/5 group-hover:border-white/20 group-hover:bg-white/[0.02] transition-all duration-300">
                      {getIcon(skill.iconName)}
                    </div>
                    <span className="font-mono text-xs uppercase text-white/40 group-hover:text-white/60">
                      {skill.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/30 group-hover:text-white/80">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg text-white group-hover:text-white/90 transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>

              {/* Progress bar metrics */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="w-full h-[3px] bg-white/5 mt-1 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/30 via-white to-white/30"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Cyber diagnostics diagnostics diagnostic system table footer details */}
      <div className="mt-12 p-5 rounded-lg border border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Diagnostic Status: Clean execution parameters compiled successfully.
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-white/30 uppercase">
          <span>Continuous Integration Active</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
