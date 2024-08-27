import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import AnimatedText from "~/my_components/portfolio_section/animated_text";
import Card from "~/my_components/characters_section/card";
import CharacterDialog from "~/my_components/characters_section/character_dialog";

interface CardData {
  color: string;
  background: string;
  image: string;
  dialog: string;
  letter: 'Q' | 'U' | 'I' | 'R' | 'K';
}

const cardsData: CardData[] = [
  {
    color: "hover:shadow-neon-magenta hover:border-neon-magenta",
    background: "assets/quirk/Q/Q_fondo.jpg",
    image: "assets/quirk/Q/Q.png",
    dialog: "assets/quirk/Q/q_dialog.jpg",
    letter: "Q",
  },
  {
    color: "hover:shadow-neon-green hover:border-neon-green",
    background: "assets/quirk/U/U_fondo.jpg",
    image: "assets/quirk/U/U.png",
    dialog: "assets/quirk/U/u_dialog.jpg",
    letter: "U",
  },
  {
    color: "hover:shadow-neon-cyan hover:border-neon-cyan",
    background: "assets/quirk/I/I_fondo.jpg",
    image: "assets/quirk/I/I.png",
    dialog: "assets/quirk/I/i_dialog.jpg",
    letter: "I",
  },
  {
    color: "hover:shadow-neon-brightViolet hover:border-neon-brightViolet",
    background: "assets/quirk/R/R_fondo.jpg",
    image: "assets/quirk/R/R.png",
    dialog: "assets/quirk/R/r_dialog.jpg",
    letter: "R",
  },
  {
    color: "hover:shadow-neon-orange hover:border-neon-orange",
    background: "assets/quirk/K/K_fondo.jpg",
    image: "assets/quirk/K/K.png",
    dialog: "assets/quirk/K/k_dialog.jpg",
    letter: "K",
  },
];

const CharactersSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

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
              <Card
                  key={index}
                  card={card}
                  onClick={() => setSelectedCard(card)}
              />
          ))}
        </div>
        {selectedCard && (
            <CharacterDialog
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
            />
        )}
      </section>
  );
};

export default CharactersSection;