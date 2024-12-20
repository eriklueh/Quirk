"use client";

import { AnimationControls, motion } from "framer-motion";
import { FC, useState, useEffect } from "react";
import {
  IconLayoutGrid,
  IconListDetails,
  IconArrowLeft,
} from "@tabler/icons-react";
import GridView from "~/my_components/portfolio_section/grid_view";
import ListView from "~/my_components/portfolio_section/list_view";
import GradientCard from "~/components/ui/gradient-card";
import ContentDialog from "~/my_components/portfolio_section/content-dialog";
import GamesContent from "~/my_components/portfolio_section/games/game-content";
import Models3DContent from "~/my_components/portfolio_section/3d-models-content";
import MotionContent from "~/my_components/portfolio_section/motion-content";
import TreatmentContent from "~/my_components/portfolio_section/treatment-content";
import IllustrationContent from "~/my_components/portfolio_section/illustration-content";
import VFXContent from "~/my_components/portfolio_section/vfx-content";
import QuirkContent from "~/my_components/portfolio_section/quirk-content";
import MarcasContent from "~/my_components/portfolio_section/marcas-content";
import { useAchievements } from "~/my_components/achievement/achievement";

interface FileManagerProps {
  controls: AnimationControls;
}

const FileManager: FC<FileManagerProps> = ({ controls }) => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());

  const { unlockAchievement } = useAchievements();

  const rectangleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 2, ease: "easeOut", delay: 1 },
    },
  };

  const folderImages = [
    "/assets/folders/Recurso 1.svg",
    "/assets/folders/Recurso 2.svg",
    "/assets/folders/Recurso 3.svg",
    "/assets/folders/Recurso 4.svg",
    "/assets/folders/Recurso 5.svg",
    "/assets/folders/Recurso 6.svg",
    "/assets/folders/Recurso 7.svg",
    "/assets/folders/Recurso 2.svg",
  ];

  const folderNames = [
    "3D",
    "Motion",
    "Ilustración",
    "VFX",
    "Tratamiento",
    "Videojuegos",
    ".Quirk",
    "Marcas",
  ];

  const itemCounts = [10, 8, 15, 6, 12, 7, 5, 9];
  const itemDates = [
    "2022-01-01",
    "2021-12-15",
    "2022-02-20",
    "2021-11-10",
    "2022-03-05",
    "2022-04-15",
    "2022-05-20",
    "2022-06-10",
  ];

  const handleFolderClick = (index: number) => {
    setSelectedFolder(index);
    setSelectedItem(null);
    setIsContentDialogOpen(true);
    const sectionName = folderNames[index];
    if (sectionName && !viewedSections.has(sectionName)) {
      setViewedSections((prev) => {
        const newSet = new Set(prev);
        newSet.add(sectionName);
        return newSet;
      });
    }
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (viewedSections.size === folderNames.length) {
      unlockAchievement("portfolio_explorer");
    }
  }, [viewedSections, folderNames.length, unlockAchievement]);

  const headerContent = (
      <>
        <p className="text-left text-2xl font-bold text-primary-green">
          ./Quirk
          {selectedFolder !== null && `/${folderNames[selectedFolder]}`}
          {selectedItem && `/${selectedItem}`}
        </p>
        <div className="flex space-x-4">
          <IconLayoutGrid
              className={`cursor-pointer ${isGridView ? "text-primary-green" : "text-gray-500"}`}
              onClick={() => setIsGridView(true)}
          />
          <IconListDetails
              className={`cursor-pointer ${!isGridView ? "text-primary-green" : "text-gray-500"}`}
              onClick={() => setIsGridView(false)}
          />
        </div>
      </>
  );

  const renderDialogContent = () => {
    if (selectedFolder === null) return null;

    const folderName = folderNames[selectedFolder];

    switch (folderName) {
      case "Videojuegos":
        return (
            <GamesContent
                onItemClick={handleItemClick}
                selectedGame={selectedItem}
                onBack={handleBack}
            />
        );
      case "3D":
        return (
            <Models3DContent
                onItemClick={handleItemClick}
                selectedModel={selectedItem}
                onBack={handleBack}
            />
        );
      case "Motion":
        return (
            <MotionContent
                onItemClick={handleItemClick}
                selectedVideo={selectedItem}
                onBack={handleBack}
            />
        );
      case "Ilustración":
        return (
            <IllustrationContent
                onItemClick={handleItemClick}
                selectedIllustration={selectedItem}
                onBack={handleBack}
            />
        );
      case "VFX":
        return (
            <VFXContent
                onItemClick={handleItemClick}
                selectedVFX={selectedItem}
                onBack={handleBack}
            />
        );
      case "Tratamiento":
        return (
            <TreatmentContent
                onItemClick={handleItemClick}
                selectedTreatment={selectedItem}
                onBack={handleBack}
            />
        );
      case ".Quirk":
        return (
            <QuirkContent
                onItemClick={handleItemClick}
                selectedQuirk={selectedItem}
                onBack={handleBack}
            />
        );
      case "Marcas":
        return (
            <MarcasContent
                onItemClick={handleItemClick}
                selectedMarca={selectedItem}
                onBack={handleBack}
            />
        );
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
      <>
        <motion.div
            initial="hidden"
            animate={controls}
            variants={rectangleVariants}
            className="w-full max-w-2xl"
        >
          <GradientCard className="max-h-[480px]" headerContent={headerContent}>
            {isGridView ? (
                <GridView
                    folderImages={folderImages}
                    folderNames={folderNames}
                    handleFolderClick={handleFolderClick}
                />
            ) : (
                <ListView
                    folderImages={folderImages}
                    folderNames={folderNames}
                    itemCounts={itemCounts}
                    itemDates={itemDates}
                    handleFolderClick={handleFolderClick}
                />
            )}
          </GradientCard>
        </motion.div>
        {selectedFolder !== null && (
            <ContentDialog
                isOpen={isContentDialogOpen}
                onClose={() => setIsContentDialogOpen(false)}
                title={`${folderNames[selectedFolder]}${selectedItem ? ` / ${selectedItem}` : ""}`}
            >
              {renderDialogContent()}
            </ContentDialog>
        )}
      </>
  );
};

export default FileManager;

