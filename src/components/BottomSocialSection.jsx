import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 1. IMPORT THE LOGO ASSET
import PantheonLogo from "../assets/pantheon-logo-1.png";

gsap.registerPlugin(ScrollTrigger);

const Icons = {
  Instagram: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Linkedin: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
};

export default function PantheonFooter() {
  const container = useRef();
  const logoRef = useRef();

  useGSAP(
    () => {
      // Subtle Float Animation for the real logo
      gsap.to(logoRef.current, {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Content Reveal
      gsap.from(".footer-reveal", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
        },
      });
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      className="bg-black text-white pt-32 pb-12 px-8 md:px-16 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand & Logo Area */}
          <div className="footer-reveal md:col-span-5">
            {/* 2. REPLACED PLACEHOLDER WITH IMAGE */}
            <div ref={logoRef} className="mb-8 flex items-center justify-start">
              <img
                src={PantheonLogo}
                alt="The Pantheon Logo"
                className="w-20 h-auto opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
              />
            </div>

            <h3
              className="text-2xl font-black tracking-tighter uppercase mb-6 leading-none"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Made by <br /> The Pantheon
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-8">
              A design collective specialized in visual identity, digital
              experiences, and cinematic branding.
            </p>
            <div className="flex gap-6 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">
                <Icons.Instagram />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Icons.Twitter />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Icons.Linkedin />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-reveal md:col-span-2 md:col-start-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8 font-serif">
              Studio
            </h4>
            <ul className="space-y-4 text-[13px] font-medium text-zinc-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Area */}
          <div className="footer-reveal md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8 font-serif">
              Inquiries
            </h4>
            <div className="space-y-4 text-[13px] text-zinc-400">
              <p className="hover:text-white cursor-pointer transition-colors font-medium">
                hello@thepantheon.design
              </p>
              <p className="text-zinc-600 uppercase tracking-widest text-[10px]">
                Bislig City, Philippines
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-zinc-700">
          <p>© 2026 Made by The Pantheon</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
