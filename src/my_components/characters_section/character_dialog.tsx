import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

interface Card {
    dialog: string;
    letter: 'Q' | 'U' | 'I' | 'R' | 'K';
    color: string;
}

interface CharacterDialogProps {
    card: Card | null;
    onClose: () => void;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ card, onClose }) => {
    const [isOpen, setIsOpen] = useState(!!card);

    useEffect(() => {
        console.log("CharacterDialog mounted or updated");
        setIsOpen(!!card);
    }, [card]);

    const getBorderAndShadow = (letter: 'Q' | 'U' | 'I' | 'R' | 'K'): string => {
        switch (letter) {
            case 'Q':
                return 'border-neon-magenta shadow-neon-magenta';
            case 'U':
                return 'border-neon-green shadow-neon-green';
            case 'I':
                return 'border-neon-cyan shadow-neon-cyan';
            case 'R':
                return 'border-neon-brightViolet shadow-neon-brightViolet';
            case 'K':
                return 'border-neon-orange shadow-neon-orange';
            default:
                return 'border-gray-500 shadow-gray-500';
        }
    };

    const borderAndShadow = card ? getBorderAndShadow(card.letter) : '';

    // Check if the borderAndShadow value is correct
    console.log('borderAndShadow', borderAndShadow);

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => {
                        console.log("Dialog Closed");
                        onClose();
                        setIsOpen(false);
                    }}
                    className="fixed inset-0 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        style={{ width: "1000px", height: "600px", borderRadius: "20px" }}
                        className={`relative transition-all duration-300 ${borderAndShadow}`}
                    >
                        <img
                            src={card?.dialog}
                            alt=""
                            className={`w-full h-full object-cover rounded-3xl border-2 ${borderAndShadow}`}
                            style={{
                                borderRadius: "20px",
                            }}
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-white hover:text-gray-300"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </motion.div>
                    <div className="fixed inset-0" onClick={() => {
                        onClose();
                        setIsOpen(false);
                    }} />
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default CharacterDialog;