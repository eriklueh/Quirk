"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";

interface TreatmentItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const treatments: TreatmentItem[] = [
  {
    id: "1",
    title: "Arcane - Netflix .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/Arcane - Netflix_Quirk.png",
    description: "Visual treatment for Netflix's Arcane series",
  },
  {
    id: "2",
    title: "COMFLEX - Spotify .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/COMFLEX - Spotify_Quirk.png",
    description: "Treatment design for Spotify platform",
  },
  {
    id: "3",
    title: "Heian era - Theatre .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/Heian era - Theatre_Quirk.png",
    description: "Theatre project visual treatment",
  },
  {
    id: "4",
    title: "Oasis .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/Oasis_Quirk.png",
    description: "Visual treatment for Oasis project",
  },
  {
    id: "5",
    title: "Pink Panther .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/PinkPanther_Quirk.jpg",
    description: "Treatment design for Pink Panther",
  },
  {
    id: "6",
    title: "Spider-Man: ITSV .Quirk ˎˊ˗",
    imageUrl: "/assets/portfolio/Tratamiento/Spiderman - ITSV_Quirk.png",
    description: "Visual treatment for Spider-Man: Into the Spider-Verse",
  },
];

interface TreatmentContentProps {
  onItemClick: (itemName: string) => void;
  selectedTreatment: string | null;
  onBack: () => void;
}

export default function TreatmentContent({
  onItemClick,
  selectedTreatment,
  onBack,
}: TreatmentContentProps) {
  const handleTreatmentClick = (treatment: TreatmentItem) => {
    onItemClick(treatment.title);
  };

  const currentTreatment = treatments.find(
    (treatment) => treatment.title === selectedTreatment,
  );

  return (
    <div className="w-full">
      <AnimatePresence>
        {currentTreatment ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full"
          >
            <button
              onClick={onBack}
              className="absolute left-2 top-2 z-10 text-primary-green hover:text-primary-magenta"
            >
              <IconArrowLeft size={24} />
            </button>
            <div className="relative overflow-hidden rounded-lg bg-background-darkPurple">
              <img
                src={currentTreatment.imageUrl}
                alt={currentTreatment.title}
                className="h-auto w-full"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-primary-green">
                  {currentTreatment.title}
                </h3>
                <p className="text-primary-green/80">
                  {currentTreatment.description}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {treatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => handleTreatmentClick(treatment)}
              >
                <div className="relative aspect-video">
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.title}
                    className="h-full w-full rounded-lg object-cover shadow-md"
                  />
                </div>
                <p className="mt-2 text-center font-medium text-primary-green">
                  {treatment.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}