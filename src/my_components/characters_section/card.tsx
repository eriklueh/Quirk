import React from 'react';

// Reusar el tipo CardData definido anteriormente
interface CardData {
    color: string;
    background: string;
    image: string;
    dialog: string;
    letter: 'Q' | 'U' | 'I' | 'R' | 'K';
}

interface CardProps {
    card: CardData;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
        <div
            className={`relative rounded-lg border-2 border-transparent transition-all duration-300 ${card.color}`}
            style={{
                width: "150px",
                height: "384px",
                backgroundImage: `url(${card.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundClip: "padding-box",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <img
                src={card.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300 filter grayscale hover:grayscale-0"
                style={{ borderRadius: "6px" }}
            />
        </div>
    );
};

export default Card;