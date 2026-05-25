import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle active anchor tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Dynamic navbar styling when user scrolls down
      setIsScrolled(window.scrollY > 40);

      // Track active section element
      const sections = ["hero", "projects", "services", "skills", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <motion.nav
        id="site-navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-4 bg-[#050505]/75 backdrop-blur-md border-b border-white/5" 
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo with cinematic glint */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className="group relative flex items-center font-display font-extrabold text-lg uppercase tracking-[0.3em] text-white no-select cursor-none"
          >
            <span>Æ</span>
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out inline-block">
              THER
            </span>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-colors duration-300 select-none cursor-none ${
                      isActive ? "text-white" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        layoutId="navGlow"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Quick Consultation Magnet Button */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="group relative px-5 py-2 overflow-hidden rounded-full border border-white/20 font-mono text-[10px] tracking-widest uppercase text-white shadow-[0_0_10px_rgba(255,255,255,0.02)] cursor-none"
            >
              <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-full" />
              <div className="relative flex items-center gap-1.5">
                <span>Start Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>

          {/* Mobile menu toggle action */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/[0.03] text-white/80 hover:text-white focus:outline-none cursor-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen cinematic overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-overlay"
            className="fixed inset-0 bg-[#050505] z-30 flex flex-col justify-between p-8 pt-32 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Ambient cyber grid helper */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

            {/* Navigation links stack */}
            <div className="flex flex-col gap-6 relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">
                MAIN MAP / CORE DIRECTORY
              </span>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="group flex justify-between items-center py-2 border-b border-white/5 cursor-none"
                    >
                      <span
                        className={`font-display font-medium text-3xl transition-transform duration-300 group-hover:translate-x-3 ${
                          isActive ? "text-white font-semibold" : "text-white/60"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-white/20 select-none">
                        (0{idx + 1})
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer credentials */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="h-[1px] bg-white/5 w-full" />
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/50">
                    Aether Creative Inc.
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    SENSORY DIGITAL EXPERIENCES
                  </span>
                </div>
                <div className="font-mono text-[9px] text-white/20">
                  ESTD // 2026
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
