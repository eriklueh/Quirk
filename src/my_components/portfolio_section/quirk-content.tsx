"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"

interface QuirkItem {
    id: string
    title: string
    thumbnailUrl: string
    videoUrl: string
}

const quirkItems: QuirkItem[] = [
    {
        id: "1",
        title: "Quirk Brandboard Animado",
        thumbnailUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Brandboard_Animado_Thumbnail-Gd8Gf3YL62mPFkwkxAU5Cn8CNPNsDe.png",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Brandboard_Animado_Compressed-oKT1w62rBPXagp7DYuRYwZ1o3AsboZ.mp4"
    },
    {
        id: "2",
        title: "Quirk Manifiesto",
        thumbnailUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Manifiesto_Thumbnail-p740ALQyt7Je0oJ8NKCoCWX136dntz.png",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Manifiesto_15-12-24_compressed-5wK1ft98TV1pmiiiymE2ny9sKWUJKb.mp4"
    },
    {
        id: "3",
        title: "Quirk REEL",
        thumbnailUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_REEL_Thumbnail-gqfaM5UZwyfFBIrnsJnzwN02zlUvNl.png",
        videoUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/Quirk/Quirk_REEL_13-12-24_compressed-k8RNgmOG4XHm73BdNO83d40K7eLq9p.mp4"
    },
    {
        id: "4",
        title: "Quirk Videocaso",
        thumbnailUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Videocaso_Thumbnail-mzlGJzEr2t6ZYgXQvXPkb64oz9w1v0.png",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/.Quirk/Quirk_Videocaso_MASTER-compressedx2(1)(1)-swAYDY9R6Oc7HfOFhsI2biAiGNCH0z.mp4"
    }
]

interface QuirkContentProps {
    onItemClick: (itemName: string) => void
    selectedQuirk: string | null
    onBack: () => void
}

export default function QuirkContent({ onItemClick, selectedQuirk, onBack }: QuirkContentProps) {
    const handleQuirkClick = (quirk: QuirkItem) => {
        onItemClick(quirk.title)
    }

    const currentQuirk = quirkItems.find(quirk => quirk.title === selectedQuirk)

    return (
        <div className="w-full">
            <AnimatePresence>
                {currentQuirk ? (
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
                            <video
                                src={currentQuirk.videoUrl}
                                controls
                                className="w-full h-auto"
                                poster={currentQuirk.thumbnailUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-primary-green mb-2">
                                    {currentQuirk.title}
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
                        {quirkItems.map((quirk) => (
                            <Dialog key={quirk.id}>
                                <DialogTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="cursor-pointer"
                                        onClick={() => handleQuirkClick(quirk)}
                                    >
                                        <img
                                            src={quirk.thumbnailUrl}
                                            alt={quirk.title}
                                            className="w-full h-auto rounded-lg shadow-md"
                                        />
                                        <p className="mt-2 text-center font-medium text-primary-green">
                                            {quirk.title}
                                        </p>
                                    </motion.div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
                                    <div className="relative w-full h-full">
                                        <video
                                            src={quirk.videoUrl}
                                            controls
                                            className="w-full h-full object-contain"
                                            poster={quirk.thumbnailUrl}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

