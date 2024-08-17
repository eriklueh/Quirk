import React, { useEffect, useState } from "react";
import { IconFileText, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import { FloatingDock } from "~/components/ui/floating-dock";
import { AnimatePresence, motion } from "framer-motion";

export const MobileMenu = () => {
  const links = [
    {
      title: "Portfolio",
      icon: (
        <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Quirk",
      icon: (
        <Image src="/quirk_icon.ico" width={20} height={20} alt="Quirk Logo" />
      ),
      href: "#",
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const [isDockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setDockVisible(true);
      } else {
        setDockVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <AnimatePresence>
        {isDockVisible && (
          <motion.div
              className="fixed bottom-4 -translate-x-1/2 w-[60vw]"
              initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FloatingDock items={links} className="w-full" />
          </motion.div>
        )}
      </AnimatePresence>
  );
};
