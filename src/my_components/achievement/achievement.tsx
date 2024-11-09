'use client'

import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
    Brush,
    Send,
    Clock,
    Users,
    Briefcase,
    Share2,
    Dog,
    Gamepad,
    Download,
    Palette
} from 'lucide-react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    image: string;
}

export const achievements: Achievement[] = [
    {
        id: 'art_lover',
        title: 'Me gusta el arte',
        description: 'Dibujaste en los costados',
        icon: Palette,
        image: '/achievements/art_lover.png'
    },
    {
        id: 'form_master',
        title: 'Fino señores',
        description: 'Enviaste una solicitud',
        icon: Send,
        image: '/achievements/form_master.png'
    },
    {
        id: 'attention_deficit',
        title: 'Deficit de atención',
        description: '10 minutos en el sitio',
        icon: Clock,
        image: '/achievements/attention_deficit.png'
    },
    {
        id: 'quirk_fan',
        title: 'Quirk Fan',
        description: 'Viste todos los perfiles',
        icon: Users,
        image: '/achievements/quirk_fan.png'
    },
    {
        id: 'portfolio_explorer',
        title: 'La Pala',
        description: 'Viste todo el portfolio',
        icon: Briefcase,
        image: '/achievements/portfolio_explorer.png'
    },
    {
        id: 'social_butterfly',
        title: 'Oh Stop it You',
        description: 'Tocaste las 4 redes sociales',
        icon: Share2,
        image: '/achievements/social_butterfly.png'
    },
    {
        id: 'dog_finder',
        title: 'Dogo',
        description: 'Encontraste al perrito',
        icon: Dog,
        image: '/achievements/dog_finder.png'
    },
    {
        id: 'hidden_gamer',
        title: 'Gamer encubierto',
        description: 'Usaste WASD para navegar',
        icon: Gamepad,
        image: '/achievements/hidden_gamer.png'
    },
    {
        id: 'easter_egg',
        title: 'KEKW',
        description: 'Encontraste la sección ?????',
        icon: Download,
        image: '/achievements/easter_egg.png'
    }
];

interface AchievementContextType {
    unlockedAchievements: string[];
    unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};

export const AchievementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
    const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [siteEntryTime] = useState<number>(Date.now());

    useEffect(() => {
        const attentionInterval = setInterval(() => {
            const timeSpent = (Date.now() - siteEntryTime) / 1000 / 60;
            if (timeSpent >= 10) {
                unlockAchievement('attention_deficit');
                clearInterval(attentionInterval);
            }
        }, 60000);

        return () => clearInterval(attentionInterval);
    }, [siteEntryTime]);

    const unlockAchievement = (id: string) => {
        if (!unlockedAchievements.includes(id)) {
            const achievement = achievements.find(a => a.id === id);
            if (achievement) {
                setUnlockedAchievements(prev => [...prev, id]);
                setAchievementQueue(prev => [...prev, achievement]);
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
                setAchievementQueue(prev => prev.slice(1));

                await new Promise(resolve => setTimeout(resolve, 2000));
                setCurrentAchievement(null);
                await new Promise(resolve => setTimeout(resolve, 500));
                setIsProcessing(false);
            }
        };

        // Fix for ESLint no-floating-promises
        void processQueue();
    }, [achievementQueue, isProcessing]);

    return (
        <AchievementContext.Provider value={{ unlockedAchievements, unlockAchievement }}>
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

const AchievementDisplay: React.FC<AchievementDisplayProps> = ({ achievement }) => {
    const controls = useAnimation();

    useEffect(() => {
        // Fix for ESLint no-floating-promises
        void controls.start({
            background: [
                'conic-gradient(from 0deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)',
                'conic-gradient(from 360deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)',
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
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
                duration: 0.5
            }}
            className="fixed bottom-4 right-4 z-50 p-[3px] rounded-2xl shadow-lg overflow-hidden w-64"
            style={{
                background: `conic-gradient(from 0deg at 50% 50%, 
                    #d6fa02 0deg, 
                    #e500ee 120deg, 
                    #0af3ff 240deg, 
                    #d6fa02 360deg)`,
            }}
        >
            <motion.div
                animate={controls}
                className="absolute inset-0"
            />
            <div className="relative bg-black p-4 rounded-xl flex items-center">
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-primary-cyan mb-1">{achievement.title}</h3>
                    <p className="text-primary-green text-xs">{achievement.description}</p>
                </div>
                <div className="ml-4 w-12 h-12 bg-primary-darkViolet rounded-full flex items-center justify-center overflow-hidden">
                    {achievement.image ? (
                        <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover" />
                    ) : (
                        achievement.icon && <achievement.icon className="w-6 h-6 text-primary-green" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AchievementProvider;