import React, { ReactNode } from 'react';
import { BackgroundGradient } from "~/components/ui/background-gradient";

interface GradientCardProps {
    className?: string;
    headerContent?: ReactNode;
    headerClassName?: string;
    children: ReactNode;
}

const GradientCard: React.FC<GradientCardProps> = ({
                                                       className = "",
                                                       headerContent,
                                                       headerClassName = "",
                                                       children
                                                   }) => {
    return (
        <BackgroundGradient className={`overflow-hidden ${className}`}>
            {headerContent && (
                <div
                    className={`bg-background-darkPurple flex w-full items-center justify-between p-[14px] rounded-t-[20px] ${headerClassName}`}
                >
                    {headerContent}
                </div>
            )}
            {children}
        </BackgroundGradient>
    );
};

export default GradientCard;