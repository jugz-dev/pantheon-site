import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PantheonLogo from "../assets/pantheon-logo-1.png";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef();
  const logoRef = useRef();
  const textRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Starts when the section is 70% from the top
          toggleActions: "play none none none",
        },
      });

      // 1. Logo scale and fade
      tl.from(logoRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // 2. Text Reveal (Rising from blur/opacity)
      tl.from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8",
      ); // Overlap with logo animation
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-black w-full min-h-[90vh] flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Logo Container */}
        <div ref={logoRef} className="mb-16 md:mb-20">
          <img
            src={PantheonLogo}
            alt="Pantheon Design Collective Logo"
            className="w-40 h-auto md:w-48 lg:w-56"
          />
        </div>

        {/* About Text */}
        <div className="overflow-hidden">
          <p
            ref={textRef}
            className="font-sans text-gray-300 text-base md:text-lg leading-relaxed md:leading-loose max-w-3xl"
          >
            We are a collective of designers committed to precision, clarity,
            and elevated aesthetics. Every project we take on is approached with
            intent — merging strategy with design to create work that is both
            timeless and effective.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
