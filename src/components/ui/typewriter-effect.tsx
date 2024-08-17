"use client";

import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { cn } from "~/lib/utils";

export const TypewriterEffect = ({
                                     words,
                                     className,
                                     cursorClassName,
                                 }: {
    words: {
        text: { text: string; color?: string }[];
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
        if (isInView) {
           void animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                },
                {
                    duration: 0.3,
                    delay: stagger(0.1),
                    ease: "easeInOut",
                }
            );
        }
    }, [isInView, animate]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="inline">
                {words.map((word, wordIdx) => (
                    <div key={`word-${wordIdx}`} className="inline-block">
                        {word.text.map((char, charIdx) => (
                            <motion.span
                                initial={{}}
                                key={`char-${wordIdx}-${charIdx}`}
                                className={cn(
                                    "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold",
                                    "opacity-0 hidden",
                                    char.color
                                )}
                            >
                                {char.text}
                            </motion.span>
                        ))}
                        &nbsp;
                    </div>
                ))}
            </motion.div>
        );
    };

    return (
        <div
            className={cn(
                "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};