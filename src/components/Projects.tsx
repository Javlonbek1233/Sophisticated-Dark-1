import { useState, useRef, useEffect, MouseEvent } from "react";
import { ArrowUpRight, Code, Sparkles, Layers, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { Project } from "../types";

const projectsData: Project[] = [
  {
    id: "01",
    title: "VORTEX CRYPT",
    category: "SPATIAL WEBGL DECENTRALIZED PLATFORM",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "An immersive 3D cryptographic dashboard designed with WebGL shaders and real-time transaction pipelines.",
    tags: ["React", "Three.js", "GLSL Shaders", "GSAP"],
    link: "#",
    year: "2026",
  },
  {
    id: "02",
    title: "NEBULA COGNITIVE",
    category: "SYNAPSE AI LLM MANAGEMENT HUB",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    description: "A gorgeous, high-performance cognitive neural controller displaying multi-agent simulation vectors.",
    tags: ["Next.js", "D3.js Topology", "Tailwind CSS", "Motion"],
    link: "#",
    year: "2025",
  },
  {
    id: "03",
    title: "CHRONOS ANALYTICS",
    category: "QUANT QUANTUM DATA PREDICTOR",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80",
    description: "An editorial data engine rendering real-time quantum regression modeling and volumetric bar charts.",
    tags: ["TypeScript", "Recharts Node", "WebGL Grid", "GSAP"],
    link: "#",
    year: "2025",
  },
  {
    id: "04",
    title: "AURA ACOUSTICS",
    category: "CREATIVE SOUND DESIGN ENGINE",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Interactive browser-based digital synthesizer generating harmonic waves through touch canvases.",
    tags: ["Web Audio API", "HTML5 Canvas", "Lucide", "Motion"],
    link: "#",
    year: "2024",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply smooth tilt matrix calculations to project image containers (Image Distortion effect)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate rotation angles based on cursor offset
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12; // max 12 deg
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    const img = card.querySelector(".tilt-image") as HTMLImageElement;
    const overlay = card.querySelector(".distort-overlay") as HTMLDivElement;

    if (img) {
      gsap.to(img, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.06,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    }

    if (overlay) {
      // Dynamic shearing coordinates
      gsap.to(overlay, {
        x: (x - rect.width / 2) * 0.15,
        y: (y - rect.height / 2) * 0.15,
        rotate: rotateY * 0.2,
        duration: 0.4,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector(".tilt-image") as HTMLImageElement;
    const overlay = card.querySelector(".distort-overlay") as HTMLDivElement;

    if (img) {
      gsap.to(img, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.8,
      });
    }

    if (overlay) {
      gsap.to(overlay, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section id="projects" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10 max-w-7xl mx-auto">
      {/* Header section with category reveal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white/80 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              Selected Collections
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white">
            CASE STUDIES / <br className="hidden sm:inline" />
            <span className="text-white/40 font-serif italic font-light">DIGITAL CREATIONS</span>
          </h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] leading-relaxed text-white/40 uppercase">
          A curate-level collection of high-fidelity client files and personal labs built to solve interactive challenges.
        </p>
      </div>

      {/* Main projects columns */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            className="flex flex-col gap-6 group project-card cursor-none"
            onMouseEnter={() => setActiveProject(idx)}
            onMouseLeave={() => {
              setActiveProject(null);
            }}
          >
            {/* Interactive Image box with absolute displacement shear */}
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.02] border border-white/5"
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              {/* Image element with 3D tilt transformations */}
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="tilt-image w-full h-full object-cover transition-all duration-300 pointer-events-none filter grayscale group-hover:grayscale-0"
              />

              {/* Distort chromatic overlay */}
              <div className="distort-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-80" />

              {/* Glowing vector line borders */}
              <div className="absolute inset-0 border border-white/0 origin-center group-hover:border-white/20 transition-all duration-500 rounded-lg pointer-events-none" />

              {/* Modern floating tag */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#050505]/80 backdrop-blur-md rounded-full border border-white/10">
                <Code className="w-3 h-3 text-white/80" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/80">
                  {project.tags[0]}
                </span>
              </div>

              {/* Distort Matrix SVG overlay (simulates WebGL wave distortion on hover) */}
              <AnimatePresence>
                {activeProject === idx && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-color-dodge bg-white/[0.03]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* SVG Ripple Grid */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 stroke-white/40" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-pattern-${idx}`} width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-pattern-${idx})`} className="animate-pulse" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Project metadata */}
            <div className="flex flex-col gap-3 relative">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-white/30">{project.year}</span>
              </div>

              <div className="flex justify-between items-center group/title">
                <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white tracking-tight group-hover:text-white/80 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="p-2 rounded-full border border-white/5 bg-white/[0.02] text-white/50 group-hover:text-white group-hover:border-white/30 transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-white/55 text-sm font-light leading-relaxed">
                {project.description}
              </p>

              {/* Project Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-wider uppercase text-white/35 px-2 py-0.5 rounded border border-white/5 bg-white/[0.01]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
