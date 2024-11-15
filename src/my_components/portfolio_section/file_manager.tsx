import { AnimationControls, motion } from "framer-motion";
import { FC, useState } from "react";
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import GridView from "~/my_components/portfolio_section/grid_view";
import ListView from "~/my_components/portfolio_section/list_view";
import GradientCard from "~/components/ui/gradient-card";

interface FileManagerProps {
  controls: AnimationControls;
}

const FileManager: FC<FileManagerProps> = ({ controls }) => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  const rectangleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 2, ease: "easeOut", delay: 1 },
    },
  };

  const folderImages = Array.from(
      { length: 7 },
      (_, i) => `/assets/folders/Recurso ${i + 1}.svg`
  );

  const folderNames = [
    "3D",
    "Motion",
    "Ilustración",
    "VFX",
    "Tratamiento",
    "Animación",
    "Videojuegos",
  ];

  const itemCounts = [10, 8, 15, 6, 12, 3, 7];
  const itemDates = [
    "2022-01-01",
    "2021-12-15",
    "2022-02-20",
    "2021-11-10",
    "2022-03-05",
    "2021-10-30",
    "2022-04-15",
  ];

  const handleFolderClick = (index: number) => {
    setSelectedFolder(index);
  };

  const headerContent = (
      <>
        <p className="text-left text-2xl font-bold text-primary-green">
          ./Quirk {selectedFolder !== null ? `/ ${folderNames[selectedFolder]}` : ""}
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

  return (
      <motion.div
          initial="hidden"
          animate={controls}
          variants={rectangleVariants}
          className="w-full max-w-2xl"
      >
        <GradientCard
            className="max-h-[480px]"
            headerContent={headerContent}
        >
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
  );
};

export default FileManager;