"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {HoveredLink, Menu, MenuItem, ProductItem} from "~/components/ui/navbar-menu";

export const DesktopMenu: React.FC = () => {
    const [active, setActive] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const showThreshold = 100;
        setIsVisible(latest > showThreshold);
    });

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            className="fixed top-4 transform -translate-x-1/2 w-9/12 max-w-lg z-50 "
        >

          <Menu setActive={setActive}>
            <img src="/quirk_icon.ico" alt="logo"
                 className="absolute left-0 top-4 h-10 w-10 rounded-full ml-4"/>

            <MenuItem setActive={setActive} active={active} item="Esto">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Web Development</HoveredLink>
                <HoveredLink href="/">Mobile Development</HoveredLink>
                <HoveredLink href="/">UI/UX Design</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Parece">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <ProductItem
                    title="Prueba"
                    description="Project management"
                    href="/"
                    src="/path-to-image.jpg"
                />
                <ProductItem
                    title="Prueba"
                    description="Team collaboration"
                    href="/"
                    src="/path-to-image.jpg"
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Funcionar">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Contact Us</HoveredLink>
                <HoveredLink href="/">Support</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </motion.div>


    );
};