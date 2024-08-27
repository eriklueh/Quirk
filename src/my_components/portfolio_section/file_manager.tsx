import { AnimationControls, motion } from "framer-motion";
import { FC, useState } from "react";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";

interface FileManagerProps {
  controls: AnimationControls;
}

const FileManager: FC<FileManagerProps> = ({ controls }) => {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

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
      (_, i) => `/assets/folders/Recurso ${i + 1}.svg`,
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

  const handleFolderClick = (index: number) => {
    setSelectedFolder(index);
  };

  return (
      <motion.div
          initial="hidden"
          animate={controls}
          variants={rectangleVariants}
          className="w-full max-w-2xl"
      >
        <BackgroundGradient>
          <div
              className="bg-background-darkPurple flex w-full flex-grow p-[15px]"
              style={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
          >
            <p className="text-left text-2xl font-bold text-primary-green">
              ./Quirk {selectedFolder !== null ? `/ ${folderNames[selectedFolder]}` : ""}
            </p>

          </div>
          <div
              className="bg-background-darkPurple mt-[4px] flex w-full flex-wrap items-start justify-start gap-14 p-[30px]"
              style={{
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
          >
            {folderImages.map((src, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center w-1/5"
                    style={{ flexBasis: "calc(20% - 1rem)" }}
                >
                  <img
                      src={src}
                      alt={`Folder ${index + 1}`}
                      className="max-w-none cursor-pointer"
                      onClick={() => handleFolderClick(index)}
                  />
                  <p className="text-center text-primary green mt-2 font-bold">{folderNames[index]}</p>
                </div>
            ))}
          </div>
        </BackgroundGradient>
      </motion.div>
  );
};

export default FileManager;