"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const achievements: Achievement[] = [
  {
    id: "art_lover",
    title: "Me gusta el arte",
    description: "Dibujaste en los costados",
    image: "assets/achievement/ME GUSTA EL ARTE@2x.png",
  },
  {
    id: "form_master",
    title: "Fino señores",
    description: "Enviaste una solicitud",
    image: "assets/achievement/FINO SEÑORES@2x.png",
  },
  {
    id: "attention_deficit",
    title: "Deficit de atención",
    description: "10 minutos en el sitio",
    image: "assets/achievement/DEFICIT DE ATENCION@2x.png",
  },
  {
    id: "quirk_fan",
    title: "Quirk Fan",
    description: "Viste todos los perfiles",
    image: "assets/achievement/QUIRK FAN@2x.png",
  },
  {
    id: "portfolio_explorer",
    title: "La Pala",
    description: "Viste todo el portfolio",
    image: "assets/achievement/LA PALA D-@2x.png",
  },
  {
    id: "social_butterfly",
    title: "Oh Stop it You",
    description: "Tocaste las 4 redes sociales",
    image: "assets/achievement/OH STOP IT YOU!@2x.png",
  },
  {
    id: "dog_finder",
    title: "Dogo",
    description: "Encontraste al perrito",
    image: "assets/achievement/DOGO@2x.png",
  },
  {
    id: "hidden_gamer",
    title: "Gamer encubierto",
    description: "Usaste WASD para navegar",
    image: "assets/achievement/GAMER ENCUBIERTO@2x.png",
  },
  {
    id: "easter_egg",
    title: "KEKW",
    description: "Encontraste la sección ?????",
    image: "assets/achievement/KEKW@2x.png",
  },
  {
    id: "social_butterfly",
    title: "Oh Stop it You",
    description: "Tocaste las 4 redes sociales",
    image: "assets/achievement/OH STOP IT YOU!@2x.png",
  },
];

interface AchievementContextType {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined,
);

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error(
      "useAchievements must be used within an AchievementProvider",
    );
  }
  return context;
};

export const AchievementProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [siteEntryTime] = useState<number>(Date.now());
  const [socialMediaInteractions, setSocialMediaInteractions] = useState<Set<string>>(new Set());
  const [portfolioSectionsViewed, setPortfolioSectionsViewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const attentionInterval = setInterval(() => {
      const timeSpent = (Date.now() - siteEntryTime) / 1000 / 60;
      if (timeSpent >= 10) {
        unlockAchievement("attention_deficit");
        clearInterval(attentionInterval);
      }
    }, 60000);

    return () => clearInterval(attentionInterval);
  }, [siteEntryTime]);

  const unlockAchievement = (id: string) => {
    if (!unlockedAchievements.includes(id)) {
      const achievement = achievements.find((a) => a.id === id);
      if (achievement) {
        setUnlockedAchievements((prev) => [...prev, id]);
        setAchievementQueue((prev) => [...prev, achievement]);
      }
    }
  };


  useEffect(() => {
    const processQueue = async () => {
      if (achievementQueue.length > 0 && !isProcessing) {
        setIsProcessing(true);
        const nextAchievement = achievementQueue[0];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setCurrentAchievement(nextAchievement);
        setAchievementQueue((prev) => prev.slice(1));

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCurrentAchievement(null);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsProcessing(false);
      }
    };

    void processQueue();
  }, [achievementQueue, isProcessing]);

  return (
    <AchievementContext.Provider
      value={{
        unlockedAchievements,
        unlockAchievement,
      }}
    >
      {children}
      <AnimatePresence mode="wait">
        {currentAchievement && (
          <AchievementDisplay
            key={currentAchievement.id}
            achievement={currentAchievement}
          />
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
};

interface AchievementDisplayProps {
  achievement: Achievement;
}

const AchievementDisplay: React.FC<AchievementDisplayProps> = ({
  achievement,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    void controls.start({
      background: [
        "conic-gradient(from 0deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)",
        "conic-gradient(from 360deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: [0.6, -0.28, 0.735, 0.045],
      },
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0%" }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 1,
        duration: 0.5,
      }}
      className="fixed bottom-4 right-4 z-50 w-80 overflow-hidden rounded-2xl p-[3px] shadow-lg"
      style={{
        background: `conic-gradient(from 0deg at 50% 50%, 
                    #d6fa02 0deg, 
                    #e500ee 120deg, 
                    #0af3ff 240deg, 
                    #d6fa02 360deg)`,
      }}
    >
      <motion.div animate={controls} className="absolute inset-0" />
      <div className="relative flex items-center rounded-xl bg-black p-2">
        <div className="flex-grow">
          <h3 className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-primary-cyan">
            {achievement.title}
          </h3>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary-green">
            {achievement.description}
          </p>
        </div>
        <div className="ml-4 h-20 w-20 overflow-hidden rounded-lg">
          <img
            src={achievement.image}
            alt={achievement.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementProvider;
