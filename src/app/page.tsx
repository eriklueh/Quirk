"use client";

import React, { useEffect, useRef, useState } from "react";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import { DesktopMenu } from "~/my_components/navigation/desktop_menu";
import { MobileMenu } from "~/my_components/navigation/mobile_menu";
import ParallaxSection from "~/my_components/paralax_section";
import PortfolioSection from "~/my_components/portfolio_section/section";
import CharactersSection from "~/my_components/characters_section/section";
import CanvasDrawing from "~/my_components/canvas_drawing";
import { useAchievements } from "~/my_components/achievement/achievement";

export default function HomePage() {
  const typewriterRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { unlockAchievement } = useAchievements();
  const hasDrawn = useRef(false);
  const hasUsedKeyboardNav = useRef(false);

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

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'w') {
        window.scrollBy(0, -100);
        if (!hasUsedKeyboardNav.current) {
          hasUsedKeyboardNav.current = true;
          unlockAchievement('hidden_gamer');
        }
      } else if (e.key.toLowerCase() === 's') {
        window.scrollBy(0, 100);
        if (!hasUsedKeyboardNav.current) {
          hasUsedKeyboardNav.current = true;
          unlockAchievement('hidden_gamer');
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [unlockAchievement]);

  const handleDraw = () => {
    if (!hasDrawn.current) {
      hasDrawn.current = true;
    }
  };

  return (
      <main className="flex min-h-screen flex-col bg-background-black">
        <CanvasDrawing onDraw={handleDraw} />
        <div className="flex flex-grow items-center justify-center">
          <div
              id="typewriter"
              className="flex h-screen items-center justify-center"
              ref={typewriterRef}
          >
            <TypeWriterInitialText />
          </div>

          {isMobile ? <MobileMenu /> : showMenu && <DesktopMenu />}
        </div>
        <div id="parallax">
          <ParallaxSection />
        </div>
        <div id="portfolio">
          <PortfolioSection />
        </div>
        <div id="characters">
          <CharactersSection />
        </div>
      </main>
  );
}