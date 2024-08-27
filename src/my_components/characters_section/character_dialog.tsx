import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlareCard } from "~/components/ui/glare-card";

interface Card {
    dialog: string;
    letter: 'Q' | 'U' | 'I' | 'R' | 'K';
    color: string;
}

interface CharacterGlareCardProps {
    card: Card | null;
    onClose: () => void;
}

const CharacterGlareCard: React.FC<CharacterGlareCardProps> = ({ card, onClose }) => {
    const [isOpen, setIsOpen] = useState(!!card);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("CharacterGlareCard mounted or updated");
        setIsOpen(!!card);
    }, [card]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                onClose();
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const getBorderColor = (letter: 'Q' | 'U' | 'I' | 'R' | 'K'): string => {
        switch (letter) {
            case 'Q': return 'border-neon-magenta';
            case 'U': return 'border-neon-green';
            case 'I': return 'border-neon-cyan';
            case 'R': return 'border-neon-brightViolet';
            case 'K': return 'border-neon-orange';
            default: return 'border-gray-500';
        }
    };

    if (!card) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <motion.div
                        ref={cardRef}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GlareCard width="1000px" height="600px">
                            <div className={`relative w-full h-full rounded-3xl overflow-hidden ${getBorderColor(card.letter)}`}>
                                <img
                                    src={card.dialog}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </GlareCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CharacterGlareCard;