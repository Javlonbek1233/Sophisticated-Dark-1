import { useState, useRef, ChangeEvent, FormEvent, MouseEvent } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate real high-end digital communication pipeline delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Auto close success panel in 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  // Magnetic button coordinates shift on hover
  const handleButtonMove = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Shift coordinates slightly
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10 max-w-7xl mx-auto">
      {/* Services title and headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-3.5 h-3.5 text-white/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              COMMUNICATION MATRIX
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-white">
            START A PROJECT / <br className="hidden sm:inline" />
            <span className="text-white/40 font-serif italic font-light">SECURE PIPELINE</span>
          </h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] leading-relaxed text-white/40 uppercase">
          Open communication corridors. Standard latency response times 12-24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                AETHER DESIGN HOUSE
              </span>
              <h3 className="font-display font-black text-2xl lg:text-3xl text-white tracking-tight">
                LET'S ORCHESTRATE <br />
                SOMETHING TRANSCENDENTAL
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
                Get in touch for bespoke designs, responsive spatial layouts, 
                and full-fledged React microcomputers.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Primary Contact details */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">
                    Direct Email
                  </span>
                  <a
                    href="mailto:xaitboyjava1@gmail.com"
                    className="font-mono text-xs text-white/80 hover:text-white transition-all duration-300 cursor-none"
                  >
                    xaitboyjava1@gmail.com
                  </a>
                </div>
              </div>

              {/* Geo Vector Coordinates */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">
                    Location Orbit
                  </span>
                  <span className="font-mono text-xs text-white/80">
                    LAT 1.3521° N, LON 103.8198° E // SOUTH-EAST REGION
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections segment */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
              Social Links Matrix
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center hover:border-white/20 text-white/50 hover:text-white transition-all duration-300 cursor-none"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center hover:border-white/20 text-white/50 hover:text-white transition-all duration-300 cursor-none"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center hover:border-white/20 text-white/50 hover:text-white transition-all duration-300 cursor-none"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form sector */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-8 rounded-lg bg-white/[0.01] border border-white/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {/* Thin dynamic stencils */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 select-none">
                  SECURE PORT: 3000
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-widest text-white/45">
                    Identity Coordinates (Name)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-white/[0.01] border border-white/5 rounded-md text-white font-sans text-sm tracking-wide placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] hover:border-white/10 transition-all duration-300 cursor-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-widest text-white/45">
                    Primary Route Link (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-white/[0.01] border border-white/5 rounded-md text-white font-sans text-sm tracking-wide placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] hover:border-white/10 transition-all duration-300 cursor-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-widest text-white/45">
                    Signal Content (Message)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Provide details about requirements..."
                    className="w-full px-4 py-3 bg-white/[0.01] border border-white/5 rounded-md text-white font-sans text-sm tracking-wide placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] hover:border-white/10 transition-all duration-300 resize-none cursor-none"
                  />
                </div>

                {/* Submit button wrapper */}
                <div className="flex justify-end mt-4">
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={isSubmitting}
                    onMouseMove={handleButtonMove}
                    onMouseLeave={handleButtonLeave}
                    className="group relative px-6 py-3.5 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest rounded-md overflow-hidden flex items-center gap-2 cursor-none select-none disabled:opacity-50 transition-all duration-300 hover:bg-[#eaeaea]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin rounded-full" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Signal</span>
                          <Send className="w-3.5 h-3.5 text-black" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="submit-success"
                className="flex flex-col items-center justify-center text-center p-12 rounded-lg bg-white/[0.02] border border-white/10 relative overflow-hidden h-full min-h-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-[10%] left-[10%] w-[15vw] h-[15vw] bg-white/5 blur-[50px] rounded-full pointer-events-none" />
                <div className="p-4 rounded-full border border-white/10 bg-white/[0.02] text-white mb-6 animate-pulse">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                    Transmit Successful
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-white tracking-tight mb-3">
                  PIPELINE ROUTED
                </h3>
                <p className="text-white/60 text-sm max-w-sm font-light leading-relaxed">
                  Your coordinates have been validated. Our system telemetry will 
                  relay a message to our core units shortly. Welcome to the loop.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
