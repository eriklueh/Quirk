import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AnimatedText from "~/my_components/portfolio_section/animated_text";
import FileManager from "~/my_components/portfolio_section/file_manager";

const PortfolioSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }
  }, [controls, inView]);

  return (
      <section
          ref={ref}
          className="flex min-h-screen flex-col items-center justify-center bg-background-black p-4"
      >
        <AnimatedText
            controls={controls}
            primaryText="> NUESTRAS "
            secondaryText="CREACIONES <"
            primaryTextClassName="text-primary-magenta"
            secondaryTextClassName="text-primary-green"
        />
        <FileManager controls={controls} />
      </section>
  );
};

export default PortfolioSection;