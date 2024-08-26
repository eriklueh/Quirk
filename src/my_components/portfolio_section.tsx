import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {BackgroundGradient} from "~/components/ui/background-gradient";

const PortfolioSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            void controls.start('visible');
        }
    }, [controls, inView]);

    const textVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1.6, ease: 'easeOut', delay: 0.2 }
        }
    };

    const rectangleVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 2, ease: 'easeOut', delay: 1 }
        }
    };

    return (
        <section ref={ref} className="min-h-screen bg-background-black flex flex-col items-center justify-center p-4">
            <motion.h2
                initial="hidden"
                animate={controls}
                variants={textVariants}
                className="text-6xl font-bold text-white mb-16"
            >
                <span className="text-primary-magenta">{"> NUESTRAS "}</span>
                <span className="text-primary-green">{"CREACIONES <"}</span>
            </motion.h2>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={rectangleVariants}
                className="w-full max-w-2xl"
            >
                <BackgroundGradient>
                        <div className="bg-zinc-900 dark:bg-zinc-900 flex-grow w-full flex p-[10px]" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} >
                            <p className="text-left text-primary-green">BreadCrumb</p>
                        </div>
                        <div className="bg-zinc-900 dark:bg-zinc-900 flex-grow w-full flex justify-center items-center p-[90px] mt-[4px] " style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                            <p className="text-center text-primary-cyan">Portfolio</p>
                        </div>
                </BackgroundGradient>




            </motion.div>
        </section>
    );
};

export default PortfolioSection;
