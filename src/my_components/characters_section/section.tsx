import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import AnimatedText from "~/my_components/portfolio_section/animated_text";

const cardsData = [
  {
    color: "hover:shadow-neon-magenta hover:border-neon-magenta",
    background: "assets/quirk/Q/Q_fondo.jpg",
    image: "assets/quirk/Q/Q.png",
  },
  {
    color: "hover:shadow-neon-green hover:border-neon-green",
    background: "assets/quirk/U/U_fondo.jpg",
    image: "assets/quirk/U/U.png",
  },
  {
    color: "hover:shadow-neon-cyan hover:border-neon-cyan",
    background: "assets/quirk/I/I_fondo.jpg",
    image: "assets/quirk/I/I.png",
  },
  {
    color: "hover:shadow-neon-brightViolet hover:border-neon-brightViolet",
    background: "assets/quirk/R/R_fondo.jpg",
    image: "assets/quirk/R/R.png",
  },
  {
    color: "hover:shadow-neon-orange hover:border-neon-orange",
    background: "assets/quirk/K/K_fondo.jpg",
    image: "assets/quirk/K/K.png",
  },
];

const CharactersSection = () => {
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
            primaryText="> CHOOSE YOUR"
            secondaryText=" MEMBER <"
            primaryTextClassName="text-primary-magenta"
            secondaryTextClassName="text-primary-green"
        />
        <div className="mt-8 flex flex-row gap-10">
          {cardsData.map((card, index) => (
              <div
                  key={index}
                  className={`relative rounded-lg border-2 border-transparent transition-all duration-300 ${card.color}`}
                  style={{
                    width: "150px",
                    height: "384px",
                    backgroundImage: `url(${card.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundClip: "padding-box",
                  }}
              >
                <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300 filter grayscale hover:grayscale-0"
                    style={{ borderRadius: "6px" }}
                />
              </div>
          ))}
        </div>
      </section>
  );
};

export default CharactersSection;
