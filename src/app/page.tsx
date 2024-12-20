"use client";

import React, { useEffect, useRef, useState } from "react";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import ParallaxSection from "~/my_components/paralax_section";
import PortfolioSection from "~/my_components/portfolio_section/section";
import CharactersSection from "~/my_components/characters_section/section";
import CanvasDrawing from "~/my_components/canvas_drawing";
import { useAchievements } from "~/my_components/achievement/achievement";
import AboutSection from "~/my_components/about-section";
import ServerSection from "~/my_components/server-section";
import MobileView from "~/components/MobileView";

export default function HomePage() {
  const typewriterRef = useRef(null);
  const { unlockAchievement } = useAchievements();
  const hasDrawn = useRef(false);
  const hasUsedKeyboardNav = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if the active element is an input or textarea
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement;

      // Only process 'w' and 's' keys for navigation when not typing in an input or textarea
      if (
        !isInputActive &&
        (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "s")
      ) {
        e.preventDefault(); // Prevent default scrolling behavior
        if (e.key.toLowerCase() === "w") {
          window.scrollBy(0, -100);
        } else if (e.key.toLowerCase() === "s") {
          window.scrollBy(0, 100);
        }

        if (!hasUsedKeyboardNav.current) {
          hasUsedKeyboardNav.current = true;
          unlockAchievement("hidden_gamer");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [unlockAchievement]);

  const handleDraw = () => {
    if (!hasDrawn.current) {
      hasDrawn.current = true;
    }
  };

  if (isMobile) {
    return <MobileView />;
  }

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
      <div id="about">
        <AboutSection />
      </div>
      <div id="server">
        <ServerSection />
      </div>
    </main>
  );
}
