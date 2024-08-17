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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-0 right-0 z-50"
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/mobile-dev">Mobile Development</HoveredLink>
                        <HoveredLink href="/design">UI/UX Design</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <ProductItem
                            title="Prueba"
                            description="Project management"
                            href="/acme-pro"
                            src="/path-to-image.jpg"
                        />
                        <ProductItem
                            title="Prueba"
                            description="Team collaboration"
                            href="/acme-plus"
                            src="/path-to-image.jpg"
                        />
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Contact">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/contact">Contact Us</HoveredLink>
                        <HoveredLink href="/support">Support</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </motion.div>
    );
};