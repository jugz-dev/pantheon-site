import { useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import BottomSocialSection from "./components/BottomSocialSection";
import CallToActionSection from "./components/CallToActionSection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-black">
      {/* The Navbar is fixed, so it stays on top of all sections */}
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection></ServicesSection>
        <PortfolioSection></PortfolioSection>
        <CallToActionSection></CallToActionSection>
      </main>

      <BottomSocialSection></BottomSocialSection>
    </div>
  );
}

export default App;
