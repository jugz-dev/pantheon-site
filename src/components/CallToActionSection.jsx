import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const ctaRef = useRef();
  const glowRef = useRef();
  const buttonRef = useRef();

  useGSAP(
    () => {
      // 1. Initial Text Reveal
      gsap.from(".reveal-text", {
        y: "110%",
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      });

      // 2. Hide the glow initially
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });
    },
    { scope: ctaRef },
  );

  // --- MOUSE INTERACTION LOGIC ---
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    // Get the section's position to calculate relative coordinates
    const rect = ctaRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Make the glow follow the mouse with a slight delay (quickSetter is faster for performance)
    gsap.to(glowRef.current, {
      x: x - 250, // Center the 500px wide glow
      y: y - 150, // Center the 300px high glow
      opacity: 0.4,
      scale: 1,
      duration: 0.8, // Smoothness of the follow
      ease: "power2.out",
    });

    // Magnetic Button Logic (Keep this separate)
    const btnRect = buttonRef.current.getBoundingClientRect();
    const btnX = (clientX - (btnRect.left + btnRect.width / 2)) * 0.3;
    const btnY = (clientY - (btnRect.top + btnRect.height / 2)) * 0.3;
    gsap.to(buttonRef.current, { x: btnX, y: btnY, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    // Fade out glow when mouse leaves section
    gsap.to(glowRef.current, { opacity: 0, scale: 0.5, duration: 0.5 });

    // Reset button
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      ref={ctaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 bg-black py-24 md:py-32 px-6 border-b border-zinc-900 overflow-hidden cursor-none"
    >
      {/* --- THE INTERACTIVE GLOW --- */}
      <div
        ref={glowRef}
        className="cta-glow pointer-events-none absolute top-0 left-0 w-[500px] h-[300px] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen transition-opacity duration-500"
      />

      <div className="mx-auto text-center relative z-10 pointer-events-none">
        <div className="overflow-hidden">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold uppercase leading-tight text-white font-cinzel">
            ALL IN SA BLACK
          </h2>
        </div>

        <div className="overflow-hidden pt-2">
          <button
            ref={buttonRef}
            className="reveal-text pointer-events-auto group relative border border-zinc-700 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500"
          >
            BET NOW
          </button>
        </div>
      </div>
    </section>
  );
}
