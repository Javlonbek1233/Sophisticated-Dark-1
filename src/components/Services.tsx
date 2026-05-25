import { useRef, MouseEvent } from "react";
import { Cpu, Terminal, Eye, Layers, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Service } from "../types";

const servicesData: Service[] = [
  {
    id: "01",
    title: "SENSORY UI/UX SKELETONS",
    description: "Designing hyper-polished, responsive layouts aligned with mathematical aspect ratios, high accessibility, and gorgeous negative space.",
    icon: "Eye",
    features: ["Cinematic Aspect Ratios", "Accessiblity (WCAG) Hardened", "Custom Variable Typography", "Interactions mapping"],
  },
  {
    id: "02",
    title: "WebGL & CREATIVE ENGINE CODE",
    description: "Crafting fluid interactive graphics and interactive canvas systems featuring lightning-fast drawing iterations and low telemetry.",
    icon: "Cpu",
    features: ["SVG Matrix Displacement", "60 FPS Fluid Animation", "Kinetic Particle Loops", "Canvas WebGL Overlays"],
  },
  {
    id: "03",
    title: "KINETIC MOTION ENGINE DESIGN",
    description: "Developing custom, unified, high-performance page-scrolling matrices and spring mechanics that feel like organic movement.",
    icon: "Layers",
    features: ["Unified Spring Mechanics", "GSAP Scroll Integration", "Dynamic Morphing cursors", "Haptic Hover Triggers"],
  },
  {
    id: "04",
    title: "HIGH SPEED NODE INTEGRATIONS",
    description: "Configuring robust backend tunnels, lazy rendering parameters, and server-side pipelines maximizing cold-start speed and reliability.",
    icon: "Terminal",
    features: ["Secure Token Proxying", "Express Middleware Routing", "Optimized Build Compilations", "JSON schema validation"],
  },
];

export default function Services() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Track cursor position inside the service cards to draw dynamic lighting (Glow hover effect)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Eye":
        return <Eye className="w-5 h-5 text-white/75" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-white/75" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-white/75" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-white/75" />;
      default:
        return <Eye className="w-5 h-5 text-white/75" />;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10 max-w-7xl mx-auto">
      {/* Services title and headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-3.5 h-3.5 text-white/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              CORE SERVICES
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white">
            SERVICE MODULES / <br className="hidden sm:inline" />
            <span className="text-white/40 font-serif italic font-light">FUNCTIONAL RANGE</span>
          </h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] leading-relaxed text-white/40 uppercase">
          A broad scope of high-performance architectural systems and design models ready for delivery.
        </p>
      </div>

      {/* 2x2 Bento Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => {
              if (el) cardsRef.current[idx] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            className="glow-hover p-8 md:p-10 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-8 group cursor-none transition-colors duration-500 hover:border-white/10"
          >
            {/* Upper sector metadata */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-center">
                {/* Custom circle layout icon wrapper */}
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/[0.02] transition-all duration-500">
                  {getIcon(service.icon)}
                </div>
                <span className="font-mono text-3xl font-extrabold text-white/5 select-none tracking-tight group-hover:text-white/10 transition-colors duration-500">
                  {service.id}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <h3 className="font-display font-extrabold text-xl lg:text-2xl tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Feature lists segment */}
            <div className="flex flex-col gap-5 relative z-10">
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors duration-500 flex-shrink-0" />
                    <span className="font-mono text-[10px] tracking-wide text-white/60 group-hover:text-white/80 transition-colors duration-500 uppercase">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
