"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft, IconX } from "@tabler/icons-react"
import { Dialog, DialogContent, DialogTrigger} from "~/components/ui/dialog";


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
        title: "Killjoy",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/Killjoy-Thumbnails-LaUvTBmIkx2ZWKDYqhRcBKPO1Guv7o.png",
        embedUrl: "https://sketchfab.com/models/ba8e8b8384384d359976a248a9a15a9f/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "2",
        title: "Blade",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/blade-Thumbnails-uMgQUCrqNwLT4pW35nLkRFWZ5xuVDO.png",
        embedUrl: "https://sketchfab.com/models/0f364a4ab69e4c44b34d1358cbe55872/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "3",
        title: "PS4 Controller",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/ps4-Thumbnails-DAQ4dHKr6Cn2rara1AQTiySzZX1698.png",
        embedUrl: "https://sketchfab.com/models/9a6c39df1dbd4fa4bc2600c72de8211a/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "4",
        title: "Pistol",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/Pistol-Thumbnails-ovCwfq6j70flbbdhYfJ2gmfzUvTwQk.png",
        embedUrl: "https://sketchfab.com/models/448f06c9944a44408c18fb2033b61c66/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "5",
        title: "Basement",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/Basement-Thumbnail-64pxAUBVaR0S2YbPacgK03EwebVrsc.png",
        embedUrl: "https://sketchfab.com/models/78989eb831e64b57aadc4ba375e194e4/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "6",
        title: "Drums",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/Drums-Thumbnails-4YQaMLkgZDooK1koSgUm6yckqkIxKA.png",
        embedUrl: "https://sketchfab.com/models/6aa2d55208ac4efd9fd97b3d7e14524f/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "7",
        title: "CD",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/CD-Thumbnails-ol4E1UkwR7pGlBr7xN7YgFQNnJCSAZ.png",
        embedUrl: "https://sketchfab.com/models/8e228d599d2b4dabb6320e992e189a0a/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "8",
        title: "CD Bag",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/CDBag-Thumbnails-iOSvQxjNHdiNwZOKximpa11YPheLmU.png",
        embedUrl: "https://sketchfab.com/models/b9764d009e6a4e26a0db9fa344a6337b/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "9",
        title: "Camera",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/camara-Thumbnails-qlDbhpvCTDs45GVLF9QinNsVoibTv8.png",
        embedUrl: "https://sketchfab.com/models/89bad87b056e495aaa6f11765702295e/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "10",
        title: "Capsule",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/3D/capsule-Thumbnails-Z7RexRYaM9ie25mzT799PIplXSlBZx.png",
        embedUrl: "https://sketchfab.com/models/dbf8d7313b0c42fe9770dba7318771d9/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "11",
        title: "Stylized Cyber PC .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/PC_Antique-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/b6567abcd75c429cb365c92b58ae57f1/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "12",
        title: "Guitarra Les Paul Classic .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/LesPaul-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/36d4748f93d2437992e8bdf63b132f78/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "13",
        title: "Piano Vertical .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Piano-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/3935b47b9d8746b090b92f19e9de5d5d/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "14",
        title: "Stylized Chip Boy .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Chipboy-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/e5442d3bf20e49c79d982eb6c80235fc/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "15",
        title: "Stylized Robo-Bear .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Robobear-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/fe0d8c07a7aa4332bb67512eb7efaa6d/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "16",
        title: "Stylized Neko Computer .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/NekoPC-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/ddba19e6486d456aa31783b6bd9bcbe1/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "17",
        title: "Stylized Telescope .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Telescopio-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/83a869df5f084f399cb9050018222a59/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "18",
        title: "Stylized Robot .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Robot-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/88d903bb272646a1991da50eefbc5282/embed",
        author: "Quirk",
        authorUrl: "https://sketchfab.com/quirkagenciamultimedial",
    },
    {
        id: "19",
        title: "Heian Era Minka .Quirk ˎˊ˗",
        thumbnailUrl: "/assets/portfolio/3D/Thumbnails/Minka-Thumbnail.png",
        embedUrl: "https://sketchfab.com/models/8f6c197c1c7a4e2a83b6eee5fe07cd89/embed",
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
                    >
                        <button
                            onClick={onBack}
                            className="absolute top-2 left-2 text-primary-green hover:text-primary-magenta z-10"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <div className="relative h-full w-full overflow-hidden rounded-lg bg-background-darkPurple" style={{
                            aspectRatio: "16 / 9",
                            minHeight: "500px",
                            maxWidth: "800px",
                            margin: "0 auto",
                        }}>
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

