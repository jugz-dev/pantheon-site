import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate Header & Button
      tl.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      })
        // Animate Bento Cards
        .from(
          ".bento-card",
          {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.4",
        ); // Starts slightly before text finish
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-22 px-6 md:px-24 min-h-screen"
    >
      <div className="mx-auto">
        {/* Top Section */}
        <div className="px-4 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="reveal-text text-4xl md:text-6xl font-cinzel font-bold uppercase leading-[0.8]">
              Selected Work
            </h2>
            <p className="reveal-text text-zinc-400 text-md md:text-lg font-sans leading-relaxed">
              A curated selection of our recent projects, showcasing our
              commitment to quality, detail, and visual excellence.
            </p>
          </div>
          <button className="reveal-text flex items-center gap-3 px-6 py-2 border border-zinc-700 rounded-full hover:bg-white hover:text-black transition-colors duration-500">
            View Our Works <ArrowRight size={14} />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="w-full mx-auto p-4">
          {/* 4-column grid for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {/* 1. TOP LEFT - Laptop (Spans 2 cols, 2 rows) */}
            <div className="bento-card md:col-span-2 md:row-span-2 bg-zinc-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Laptop Card
              </div>
            </div>

            {/* 2. TOP MIDDLE - Chips (1 col, 1 row) */}
            <div className="bento-card md:col-span-1 md:row-span-1 bg-zinc-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Small Card 1
              </div>
            </div>

            {/* 3. TOP RIGHT - Yoga (1 col, 1 row) */}
            <div className="bento-card md:col-span-1 md:row-span-1 bg-zinc-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Small Card 2
              </div>
            </div>

            {/* 4. BOTTOM LEFT - Beviamo (1 col, 1 row) */}
            {/* Force it to stay under the laptop card's left side */}
            <div className="bento-card md:col-span-1 md:row-span-1 bg-zinc-200  overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Small Card 3
              </div>
            </div>

            {/* 5. BOTTOM MIDDLE - Burger (1 col, 1 row) */}
            <div className="bento-card md:col-span-1 md:row-span-1 bg-zinc-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Small Card 4
              </div>
            </div>

            {/* 6. LARGE RIGHT - Carpentry (Spans 2 cols, 2 rows) */}
            {/* Use col-start-3 to force it to align with the small cards above it */}
            <div className="bento-card md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-2 bg-zinc-200 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                Large Feature Card
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
