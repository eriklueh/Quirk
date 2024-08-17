"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import TypeWriterInitialText from "~/my_components/type_writed_initial_text";
import {DesktopMenu} from "~/my_components/navigation/desktop_menu";

export default function HomePage() {
    const typewriterRef = useRef(null);
    const isTypewriterInView = useInView(typewriterRef, { amount: 0.5 });
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
        <main className="bg-background-black min-h-screen">
            <div className="h-screen flex items-center justify-center" ref={typewriterRef}>
                <TypeWriterInitialText />
            </div>
            {showMenu && <DesktopMenu />}
            {/* Add more content here to enable scrolling */}
            <div className="h-[200vh] bg-background-black">
                {/* Your additional content goes here */}
            </div>
        </main>
    );
}