"use client";

import React, { useEffect, useRef, useState } from "react";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import { DesktopMenu } from "~/my_components/navigation/desktop_menu";
import { MobileMenu } from "~/my_components/navigation/mobile_menu";
import ParallaxSection from "~/my_components/paralax_section";
import PortfolioSection from "~/my_components/portfolio_section/section";
import CharactersSection from "~/my_components/characters_section/section";
import CanvasDrawing from "~/my_components/canvas_drawing";

export default function HomePage() {
  const typewriterRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-background-black">
      <CanvasDrawing />
      <div className="flex flex-grow items-center justify-center">
        <div
          className="flex h-screen items-center justify-center"
          ref={typewriterRef}
        >
          <TypeWriterInitialText />
        </div>

        {isMobile ? <MobileMenu /> : showMenu && <DesktopMenu />}
      </div>
      <ParallaxSection />
      <PortfolioSection />
      <CharactersSection />
    </main>
  );
}
