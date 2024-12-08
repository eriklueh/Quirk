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
        title: "Heian Era Minka .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Minka-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/8f6c197c1c7a4e2a83b6eee5fe07cd89/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "2",
        title: "Stylized Robot .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Robot-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/88d903bb272646a1991da50eefbc5282/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "3",
        title: "Stylized Telescope .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Telescopio-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/83a869df5f084f399cb9050018222a59/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "4",
        title: "Stylized Neko Computer .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/NekoPC-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/ddba19e6486d456aa31783b6bd9bcbe1/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "5",
        title: "Stylized Robo-Bear .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Robobear-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/fe0d8c07a7aa4332bb67512eb7efaa6d/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "6",
        title: "Stylized Chip Boy .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Chipboy-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/e5442d3bf20e49c79d982eb6c80235fc/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "7",
        title: "Piano Vertical .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Piano-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/3935b47b9d8746b090b92f19e9de5d5d/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "8",
        title: "Guitarra Les Paul Classic .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/LesPaul-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/36d4748f93d2437992e8bdf63b132f78/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "9",
        title: "Stylized Cyber PC .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/PC_Antique-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/b6567abcd75c429cb365c92b58ae57f1/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
];

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
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
