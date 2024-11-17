"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"

interface Model3D {
    id: string
    title: string
    thumbnailUrl: string
    embedUrl: string
    author: string
    authorUrl: string
}

const models: Model3D[] = [
    {
        id: "1",
        title: "Killjoy Turret - 3D Model",
        thumbnailUrl: "/placeholder.svg?height=150&width=200",
        embedUrl: "https://sketchfab.com/models/853af3ac67cf4119b2470fd6433aa9b4/embed",
        author: "draw_your_champ",
        authorUrl: "https://sketchfab.com/draw_your_champ",
    },
    // Añade más modelos 3D aquí
]

interface Models3DContentProps {
    onItemClick: (itemName: string) => void
    selectedModel: string | null
    onBack: () => void
}

export default function Models3DContent({ onItemClick, selectedModel, onBack }: Models3DContentProps) {
    const handleModelClick = (model: Model3D) => {
        onItemClick(model.title)
    }

    const currentModel = models.find(model => model.title === selectedModel)

    return (
        <div className="w-full">
            <AnimatePresence>
                {currentModel ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full"
                        style={{
                            aspectRatio: "16 / 9",
                            minHeight: "500px",
                            maxWidth: "800px",
                            minWidth: "500px",
                            margin: "0 auto",
                        }}
                    >
                        <button
                            onClick={onBack}
                            className="absolute top-2 left-2 text-primary-green hover:text-primary-magenta z-10"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-background-darkPurple">
                            <iframe
                                title={currentModel.title}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; fullscreen; xr-spatial-tracking"
                                xr-spatial-tracking
                                execution-while-out-of-viewport
                                execution-while-not-rendered
                                web-share
                                src={currentModel.embedUrl}
                                className="absolute inset-0 h-full w-full border-0"
                            ></iframe>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 gap-4 md:grid-cols-3"
                    >
                        {models.map((model) => (
                            <motion.div
                                key={model.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                                onClick={() => handleModelClick(model)}
                            >
                                <img
                                    src={model.thumbnailUrl}
                                    alt={model.title}
                                    className="h-auto w-full rounded-lg shadow-md"
                                />
                                <p className="mt-2 text-center font-medium text-primary-green">
                                    {model.title}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}