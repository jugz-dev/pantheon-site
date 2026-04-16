import React, { useRef } from "react";
import { Menu, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import myImage from "../assets/hero-background.png";
import PantheonLogo from "../assets/pantheon-logo-2.png";

const HeroSection = () => {
  const container = useRef();
  const bgRef = useRef();
  const buttonRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Background Zoom-In (Cinematic entry)
      tl.from(bgRef.current, {
        scale: 1.2,
        duration: 2.5,
        ease: "power2.out",
      });

      // 2. Nav Slide Down
      tl.from(
        "nav",
        {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.5",
      );

      // 3. Main Content Reveal (Staggered)
      // 3. Main Content Reveal (Refined & Smooth)
      tl.from(
        ".hero-title",
        {
          yPercent: 30, // Move up by 30% of its own height
          filter: "blur(15px)", // Resolves from blur to sharp (very cinematic)
          opacity: 0,
          scale: 1.05, // Subtle shrink-down
          duration: 1.8,
          ease: "expo.out", // Ultra-smooth deceleration
        },
        "-=1.2",
      )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.4",
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1.0",
        );
      // 4. Subtle Parallax on Scroll for the background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  // Magnetic Button Effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    gsap.to(buttonRef.current, { x, y, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={container}
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black" />

      {/* Main Content Container */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 w-full max-w-7xl mx-auto">
        {/* Text Wrapper */}
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="hero-title text-5xl md:text-8xl font-bold tracking-wide leading-[0.9] uppercase w-full antialiased font-cinzel ">
            Designed to Define
            <br />
            <span className="font-semibold opacity-80">Built to Endure.</span>
          </h1>

          <p className="hero-description max-w-3xl text-lg md:text-xl text-gray-400 leading-relaxed font-sans">
            Made by The Pantheon is a design agency dedicated to crafting
            refined visual identities and impactful creative solutions for
            brands that aim to stand above the rest.
          </p>
        </div>
        {/* CTA Button Wrapper */}
        <div className="hero-cta flex justify-center w-full">
          <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mt-12 group flex items-center gap-4 bg-white text-black px-6 py-4 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gray-200 transition-all shadow-xl"
          >
            Discuss your Vision
            {/* <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            /> */}
          </button>
        </div>
      </main>

      {/* Bottom spacing decoration */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
