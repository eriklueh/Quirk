"use client";

import { useEffect, useRef, useState } from "react";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import { DesktopMenu } from "~/my_components/navigation/desktop_menu";

export default function HomePage() {
  const typewriterRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-background-black flex min-h-screen justify-center">
      <div
        className="flex h-screen items-center justify-center"
        ref={typewriterRef}
      >
        <TypeWriterInitialText />
      </div>
      {showMenu && <DesktopMenu />}

      <div className="bg-background-black h-[200vh]">
      </div>

    </main>
  );
}
