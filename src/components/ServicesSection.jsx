import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: "BRAND IDENTITY SYSTEMS" },
  { id: 2, title: "BRAND STRATEGY" },
  { id: 3, title: "UI/UX DESIGN" },
  { id: 4, title: "WEB DEVELOPMENT" },
  { id: 5, title: "CREATIVE DIRECTION" },
];

export default function GsapServices() {
  const container = useRef();
  const sliderRef = useRef();
  const ctaButtonRef = useRef();

  const [current, setCurrent] = useState(0);

  const CARD_WIDTH = 432; // 400px card + 32px gap
  const total = services.length;

  // 🔁 Duplicate for infinite illusion
  const loopedServices = [...services, ...services];

  useGSAP(
    () => {
      // Header animation
      gsap.from(".header-content", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".header-content",
          start: "top 80%",
        },
      });

      gsap.from(".header-slider", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".header-slider",
          start: "top 80%",
        },
      });

      gsap.from(".cta-services", {
        opacity: 0,
        y: 5,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-services",
          start: "top 80%",
        },
      });

      // Cards animation
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".card-container",
          start: "top 75%",
        },
      });
    },
    { scope: container },
  );

  const slideTo = (index) => {
    const newIndex = index;
    setCurrent(newIndex);

    gsap.to(sliderRef.current, {
      x: -newIndex * CARD_WIDTH,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        // 👉 Jump back seamlessly when reaching clone end
        if (newIndex >= total) {
          gsap.set(sliderRef.current, { x: 0 });
          setCurrent(0);
        }

        // 👉 Handle reverse infinite
        if (newIndex < 0) {
          gsap.set(sliderRef.current, {
            x: -total * CARD_WIDTH,
          });
          setCurrent(total - 1);
        }
      },
    });
  };

  return (
    <section
      ref={container}
      className="bg-white py-22 px-6 md:px-24 overflow-hidden"
    >
      {/* Header */}
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8 px-4 md:px-16">
        <div className="header-content flex flex-col gap-1">
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold uppercase leading-[0.8]">
            What We Do
          </h2>
          <p className="text-zinc-500 text-md md:text-lg font-sans leading-relaxed">
            We provide a full spectrum of design services tailored to modern
            brands.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 header-slider">
          <button
            onClick={() => slideTo(current - 1)}
            className="p-3 border border-zinc-300 rounded-full hover:bg-black hover:text-white transition disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => slideTo(current + 1)}
            className="p-3 border border-zinc-300 rounded-full hover:bg-black hover:text-white transition"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="overflow-hidden mb-14">
        <div ref={sliderRef} className="card-container flex gap-6">
          {loopedServices.map((service, index) => (
            <div
              key={index}
              className="service-card min-w-[320px] md:min-w-[400px] flex-shrink-0 group"
            >
              <div className="relative aspect-[4/5] bg-zinc-200 overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-500" />

                {/* Title inside */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-white text-lg md:text-xl font-black tracking-tighter uppercase font-serif">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center cta-services" ref={ctaButtonRef}>
        <button className="py-2 px-6 font-sans text-zinc-500 border border-zinc-300 rounded-full hover:bg-black hover:text-white hover:cursor-pointer transition-all duration-500 ease-in-out">
          View Our Services
        </button>
      </div>
    </section>
  );
}
