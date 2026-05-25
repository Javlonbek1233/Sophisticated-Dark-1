import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  const [activeType, setActiveType] = useState<"normal" | "interactive" | "view" | "drag">("normal");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    
    if (!cursor || !ring) return;

    // Set initial position out of view
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power2.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      
      xToRing(e.clientX);
      yToRing(e.clientY);
      
      // Secondary cursor is positioned relative to standard client coordinates
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const trackInteractivity = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .interactive-card'
      );
      
      const handlers: Array<{ element: Element; enter: () => void; leave: () => void }> = [];

      hoverables.forEach((el) => {
        const isProjectCard = el.classList.contains("project-card");
        
        const onEnter = () => {
          if (isProjectCard) {
            setActiveType("view");
          } else {
            setActiveType("interactive");
          }
        };
        
        const onLeave = () => {
          setActiveType("normal");
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        
        handlers.push({ element: el, enter: onEnter, leave: onLeave });
      });

      return handlers;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Initial tracking
    let trackingHandlers = trackInteractivity();

    // Re-track periodically if page content changes dynamically
    const mutationObserver = new MutationObserver(() => {
      trackingHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
      trackingHandlers = trackInteractivity();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      mutationObserver.disconnect();
      trackingHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [isVisible]);

  // Handle visual morphing based on hover elements
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    if (activeType === "interactive") {
      gsap.to(ring, {
        width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        borderColor: "#ffffff",
        borderWidth: "1px",
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (activeType === "view") {
      gsap.to(ring, {
        width: 90,
        height: 90,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: "0px",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(ring, {
        width: 28,
        height: 28,
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderColor: "rgba(255, 255, 255, 0.35)",
        borderWidth: "1px",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeType]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block">
      {/* Outer fluid tracker ring */}
      <div
        id="custom-cursor-ring"
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-white/30 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <span
          ref={textRef}
          className={`text-[8px] font-mono font-bold uppercase tracking-widest text-[#050505] select-none pointer-events-none transition-opacity duration-300 ${
            activeType === "view" ? "opacity-100 scale-100 font-bold" : "opacity-0 scale-50 absolute"
          }`}
        >
          View
        </span>
      </div>

      {/* Inner precise dot */}
      <div
        id="custom-cursor-dot"
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_rgba(255,255,255,0.3)]"
      />
    </div>
  );
}
