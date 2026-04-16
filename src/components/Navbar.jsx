import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import PantheonLogo from "../assets/pantheon-logo-2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const { contextSafe } = useGSAP({ scope: menuRef });
  const navigationRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Background Zoom-In (Cinematic entry)

    // 2. Nav Slide Down
    tl.from(
      navigationRef.current,
      {
        y: -50,
        opacity: 0,
        duration: 2.5,
        ease: "power3.out",
      },
      // "-=1.5",
    );
  });

  const toggleMenu = contextSafe(() => {
    const tl = gsap.timeline();

    if (!isOpen) {
      setIsOpen(true);
      gsap.set(menuRef.current, { visibility: "visible", opacity: 1 });

      tl.to(".menu-panel", {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.inOut",
      }).fromTo(
        ".menu-link",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      );
    } else {
      tl.to(".menu-link", {
        opacity: 0,
        y: -20,
        duration: 0.3,
      }).to(".menu-panel", {
        y: "-100%",
        duration: 0.8,
        stagger: -0.05,
        ease: "power4.inOut",
        onComplete: () => {
          setIsOpen(false);
          gsap.set(menuRef.current, { visibility: "hidden", opacity: 0 });
        },
      });
    }
  });

  return (
    <>
      {/* 1. Changed 'mix-blend-difference' to 'bg-black'
          2. Added 'backdrop-blur-sm' and 'bg-black/80' for a cinematic feel
      */}
      <nav
        ref={navigationRef}
        className="fixed top-0 left-0 w-full z-[70] flex justify-between items-center px-8 py-4 md:px-16 bg-black/90 backdrop-blur-md "
      >
        {/* Brand Identity */}
        <div className="flex gap-4 items-center">
          <img src={PantheonLogo} alt="Logo" className="w-8 h-auto lg:w-10" />
          <h2
            className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Made by the Pantheon
          </h2>
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={toggleMenu}
          className="p-2 text-white z-[80] hover:opacity-70 transition-opacity"
        >
          {isOpen ? (
            <X size={32} strokeWidth={1.5} />
          ) : (
            <Menu size={32} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* Waterfall Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] invisible opacity-0 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 flex pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="menu-panel w-1/4 h-full bg-black -translate-y-full border-r border-white/5"
            />
          ))}
        </div>

        <ul className="relative z-10 text-center space-y-8">
          {["Work", "About", "Services", "Portfolio", "Contact"].map((item) => (
            <li
              key={item}
              className="menu-link text-4xl md:text-6xl text-white uppercase font-cinzel tracking-widest font-bold"
            >
              <a
                href={`#${item.toLowerCase()}`}
                onClick={toggleMenu}
                className="hover:text-zinc-500 transition-all duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
