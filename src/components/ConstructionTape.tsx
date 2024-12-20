"use client";

import React from 'react';
import { cn } from "~/lib/utils";

interface ConstructionTapeProps {
    text: string;
    direction?: "left" | "right";
    className?: string;
}

export const ConstructionTape: React.FC<ConstructionTapeProps> = ({
                                                                      text,
                                                                      direction = "left",
                                                                      className
                                                                  }) => {
    return (
        <div
            className={cn(
                "w-full overflow-hidden",
                className
            )}
        >
            <div className={cn(
                "construction-tape relative w-[200%] h-16 flex items-center",
                direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
            )}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="construction-label text-2xl md:text-4xl font-bold uppercase whitespace-nowrap mx-8"
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
};

