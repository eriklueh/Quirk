import { motion, AnimationControls } from "framer-motion";
import { FC } from "react";
import { BackgroundGradient } from "~/components/ui/background-gradient";

interface FileManagerProps {
    controls: AnimationControls;
}

const FileManager: FC<FileManagerProps> = ({ controls }) => {
    const rectangleVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 2, ease: "easeOut", delay: 1 },
        },
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
                    className="flex w-full flex-grow bg-background-darkPurple p-[10px]"
                    style={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                    }}
                >
                    <p className="text-left text-primary-green">BreadCrumb</p>
                </div>
                <div
                    className="mt-[4px] flex w-full flex-grow items-center justify-center bg-background-darkPurple p-[90px]"
                    style={{
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                    }}
                >
                    <p className="text-center text-primary-cyan">Portfolio</p>
                </div>
            </BackgroundGradient>
        </motion.div>
    );
};

export default FileManager;