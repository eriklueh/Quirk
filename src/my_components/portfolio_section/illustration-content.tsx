"use client"

import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"

interface IllustrationItem {
    id: string
    title: string
    imageUrl: string
}

const illustrationItems: IllustrationItem[] = [
    {
        id: "1",
        title: "Así se ve un Quirk ˎˊ˗",
        imageUrl: "/assets/portfolio/Ilustración/speedpaint.jpg",
    },
]

interface IllustrationContentProps {
    onItemClick: (itemName: string) => void
    selectedIllustration: string | null
    onBack: () => void
}

export default function IllustrationContent({ onItemClick, selectedIllustration, onBack }: IllustrationContentProps) {
    const selectedItem = illustrationItems.find(item => item.title === selectedIllustration)

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
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {illustrationItems.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                                onClick={() => onItemClick(item.title)}
                            >
                                <div className="relative aspect-square overflow-hidden rounded-lg bg-background-darkPurple">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="mt-2 text-center font-medium text-primary-green">
                                    {item.title}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

