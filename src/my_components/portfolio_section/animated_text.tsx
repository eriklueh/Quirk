import { motion, AnimationControls } from "framer-motion";
import { FC } from "react";

interface AnimatedTextProps {
    controls: AnimationControls;
}

const AnimatedText: FC<AnimatedTextProps> = ({ controls }) => {
    const textVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.6, ease: "easeOut", delay: 0.2 },
        },
    };

    return (
        <motion.h2
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="mb-16 text-6xl font-bold text-white"
        >
            <span className="text-primary-magenta">{"> NUESTRAS "}</span>
            <span className="text-primary-green">{"CREACIONES <"}</span>
        </motion.h2>
    );
};

export default AnimatedText;