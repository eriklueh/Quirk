import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ConstructionTape } from './ConstructionTape';

const glitchAnimation = keyframes`
    0% {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14% {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15% {
        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    49% {
        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75),
        0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    99% {
        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75),
        0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
        text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
        -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
`;

const GlitchText = styled.div`
    font-size: 4rem;
    font-weight: bold;
    color: white;
    animation: ${glitchAnimation} 0.5s linear infinite;
    position: relative;

    &::before,
    &::after {
        content: '.Quirk';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &::before {
        left: 2px;
        text-shadow: -2px 0 #ff00c1;
        clip: rect(24px, 550px, 90px, 0);
        animation: glitch-anim 2s infinite linear alternate-reverse;
    }

    &::after {
        left: -2px;
        text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
        animation: glitch-anim2 1s infinite linear alternate-reverse;
    }

    @keyframes glitch-anim {
        0% {
            clip: rect(54px, 9999px, 66px, 0);
        }
        100% {
            clip: rect(86px, 9999px, 97px, 0);
        }
    }

    @keyframes glitch-anim2 {
        0% {
            clip: rect(65px, 9999px, 99px, 0);
        }
        100% {
            clip: rect(67px, 9999px, 34px, 0);
        }
    }
`;

const MobileView: React.FC = () => {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
            <div className="w-full rotate-[-5deg] mb-8">
                <ConstructionTape
                    text="Vista mobile"
                    direction="right"
                />
            </div>
            <GlitchText>.Quirk</GlitchText>
            <div className="w-full rotate-[5deg] mt-8">
                <ConstructionTape
                    text="En desarrollo"
                    direction="left"
                />
            </div>
        </div>
    );
};

export default MobileView;

