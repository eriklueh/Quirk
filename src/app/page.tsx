"use client";

import { useEffect, useRef, useState } from "react";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import { DesktopMenu } from "~/my_components/navigation/desktop_menu";
import { MobileMenu } from "~/my_components/navigation/mobile_menu";

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
        <main className="bg-background-black flex min-h-screen justify-center">
            <div
                className="flex h-screen items-center justify-center"
                ref={typewriterRef}
            >
                <TypeWriterInitialText />
            </div>

            {isMobile ? (
                <MobileMenu />
            ) : (
                showMenu && <DesktopMenu />
            )}

            <div className="bg-background-black h-[200vh]"></div>
        </main>
    );
}
