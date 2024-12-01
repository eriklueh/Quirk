"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"
import { Heart } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip"

interface IllustrationItem {
    id: string
    title: string
    imageUrl: string
}

const illustrationItems: IllustrationItem[] = [
    {
        id: "1",
        title: "NPC-Q .Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/NPC-Q.gif",
    },
    {
        id: "2",
        title: "NPC-U .Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/NPC-U.gif",
    },
    {
        id: "3",
        title: "NPC-I .Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/NPC-I.gif",
    },
    {
        id: "4",
        title: "NPC-R .Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/NPC-R.gif",
    },
    {
        id: "5",
        title: "NPC-K .Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/NPC-K.gif",
    },
    {
        id: "6",
        title: "Así se ve un Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/speedpaint.jpg",
    },
];

interface IllustrationContentProps {
    onItemClick: (itemName: string) => void
    selectedIllustration: string | null
    onBack: () => void
}

export default function IllustrationContent({ onItemClick, selectedIllustration, onBack }: IllustrationContentProps) {
    const selectedItem = illustrationItems.find(item => item.title === selectedIllustration)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const easterEggTimerRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = (itemId: string) => {
        if (itemId === "5") { // NPC-K.gif
            easterEggTimerRef.current = setTimeout(() => {
                setShowEasterEgg(true)
            }, 24000) // 24 seconds
        }
    }

    const handleMouseLeave = () => {
        if (easterEggTimerRef.current) {
            clearTimeout(easterEggTimerRef.current)
            easterEggTimerRef.current = null
        }
        setShowEasterEgg(false)
    }

    useEffect(() => {
        return () => {
            if (easterEggTimerRef.current) {
                clearTimeout(easterEggTimerRef.current)
            }
        }
    }, [])

    return (
        <div className="w-full">
            <AnimatePresence>
                {selectedItem ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full"
                    >
                        <button
                            onClick={onBack}
                            className="absolute top-2 left-2 text-primary-green hover:text-primary-magenta z-10"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <div className="relative overflow-hidden rounded-lg bg-background-darkPurple">
                            <img
                                src={selectedItem.imageUrl}
                                alt={selectedItem.title}
                                className="w-full h-auto"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-primary-green mb-2">
                                    {selectedItem.title}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                    >
                        {illustrationItems.map((item) => (
                            <TooltipProvider key={item.id}>
                                <Tooltip open={item.id === "5" && showEasterEgg}>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="cursor-pointer relative"
                                            onClick={() => onItemClick(item.title)}
                                            onMouseEnter={() => handleMouseEnter(item.id)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="relative aspect-square overflow-hidden rounded-lg bg-background-darkPurple w-full max-w-[150px] mx-auto">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="mt-2 text-center text-sm font-medium text-primary-green">
                                                {item.title}
                                            </p>
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" align="center" className="bg-red-500 text-white border-none p-2">
                                        <Heart className="w-6 h-6 text-white" />
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

