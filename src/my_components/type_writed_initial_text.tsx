import React from "react";
import { TypewriterEffect } from "~/components/ui/typewriter-effect";

const TypeWriterInitialText = () => {
  const words = [
    {
      text: [
        { text: "E", color: "text-primary-magenta" },
        { text: "S", color: "text-primary-magenta" },
        { text: "T", color: "text-primary-magenta" },
        { text: "E", color: "text-primary-magenta" },
      ],
    },
    {
      text: [
        { text: "E", color: "text-primary-magenta" },
        { text: "S", color: "text-primary-magenta" },
      ],
    },
    {
      text: [
        { text: "N", color: "text-primary-green" },
        { text: "U", color: "text-primary-green" },
        { text: "E", color: "text-primary-green" },
        { text: "S", color: "text-primary-green" },
        { text: "T", color: "text-primary-green" },
        { text: "R", color: "text-primary-green" },
        { text: "O", color: "text-primary-green" },
      ],
    },
    {
      text: [
        { text: "E", color: "text-primary-magenta" },
        { text: "S", color: "text-primary-magenta" },
        { text: "P", color: "text-primary-magenta" },
        { text: "A", color: "text-primary-magenta" },
        { text: "C", color: "text-primary-magenta" },
        { text: "I", color: "text-primary-magenta" },
        { text: "O", color: "text-primary-magenta" },
      ],
    },
    {
      text: [{ text: ".", color: "text-primary-green" }],
    },
  ];

  return (
    <div className="container relative flex flex-col items-center justify-center gap-12 px-4 py-16">
      <TypewriterEffect
        words={words}
        textSize="text-4xl sm:text-4xl md:text-6xl lg:text-5xl xl:text-7xl"
      />
    </div>
  );
};

export default TypeWriterInitialText;
