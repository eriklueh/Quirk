"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import GradientCard from "~/components/ui/gradient-card";

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]));
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]));

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const rotation = 150; // 150 degrees rotation

    return (
        <section
            ref={ref}
            className="flex min-h-screen flex-col items-center justify-center bg-background-black p-4"
        >
          <motion.div
              ref={cardRef}
              style={{opacity}}
              className="relative w-full max-w-3xl"
          >
            {/* Star Decorations */}
            <motion.div
                style={{
                  y: y1,
                  rotate: 200,
                }}
                className="absolute -left-24 -top-10 -translate-x-full -translate-y-1/2 "
            >
              <Image
                  src="/assets/stars/Asset 27.png"
                  alt="Decorative star"
                  width={150}
                  height={150}
                  className="text-primary-cyan brightness-125"
              />
            </motion.div>
            <motion.div
                style={{
                  y: y2,
                  rotate: 5,
                }}
                className="absolute -left-12 -top-4 -translate-x-full -translate-y-1/2 "
            >
              <Image
                  src="/assets/stars/Asset 31.png"
                  alt="Decorative star"
                  width={80}
                  height={80}
                  className="text-primary-cyan brightness-125"
              />
            </motion.div>

            <motion.div
                style={{
                  y: y2,
                  rotate: 120,
                }}
                className="absolute -right-44 top-24 translate-x-full -translate-y-1/2 z-20"
            >
              <Image
                  src="/assets/zig/Asset 12.png"
                  alt="Decorative star"
                  width={250}
                  height={250}
                  className="text-primary-yellow brightness-125"
              />
            </motion.div>

            {/* Purple Wave Decoration */}
            <motion.div
                style={{
                  y: y2,
                  rotate: rotation,
                }}
                className="absolute -left-24 top-10 z-20"
            >
              <Image
                  src="/assets/stars/Asset 39.png"
                  alt="Decorative star"
                  width={50}
                  height={50}
                  className="text-primary-yellow brightness-125"
              />
            </motion.div>

            <GradientCard
                headerContent={
                  <p className="font-mono text-xl text-primary-green">
                    {"> .Quirk > Members"}
                  </p>
                }
            >
              <div
                  className="mt-[4px] flex w-full flex-wrap items-start justify-start gap-14 bg-background-darkPurple p-[30px]"
                  style={{
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
              >
                <p className="text-lg leading-relaxed text-gray-300 font-bold">
                  ¡Buenas! Somos una agencia de Diseño Multimedial apasionada por
                  lo poco convencional. Vivimos en la búsqueda de caminos que nos
                  lleven a explotar lo mejor de nosotros en cada trabajo. Sabemos
                  que no viniste acá para leer, así que te dejamos seguir viendo
                  :P
                </p>
              </div>
            </GradientCard>
          </motion.div>
        </section>
    );
}