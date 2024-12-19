"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"

interface MarcaItem {
    id: string
    title: string
    videoUrl: string
}

const marcaItems: MarcaItem[] = [
    {
        id: "1",
        title: "Pieza Hero 1",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/Pieza%20Hero%201_Compressed-l0AvRNgTujAOE650DHnLxjXNmIh3Lq.mp4"
    },
    {
        id: "2",
        title: "Pieza Hero 2",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/Pieza%20Hero%202_compressed-qlxHsIKoRaDGuPOOdV8kIH5tu7PXkc.mp4"
    },
    {
        id: "3",
        title: "Pieza Hero 3",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/Pieza%20Hero%203_compressed-jq11S6PgIRed5Huq93yuiWa0OYIfjl.mp4"
    },
    {
        id: "4",
        title: "Pieza Complementaria 1",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/Pieza_complementaria_1_compressed-Gl1DYBlkLNHkhLjRThwyEdWConJ5oa.mp4"
    },
    {
        id: "5",
        title: "Pieza Complementaria 2",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/Pieza_complementaria_2_compressed-xMkitTyTM0pKCTFzvIaUOr6z93FGog.mp4"
    },
    {
        id: "6",
        title: "Videocaso AVON",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/VIDEOCASO_AVON-09MXb95yQjPhf3EMS1nTp6fful3koh.mp4"
    },
    {
        id: "7",
        title: "Template Maquillate Conmigo",
        videoUrl: "https://aixae0jz6tmivoib.public.blob.vercel-storage.com/Marcas/template_maquillateconmig_Compressed-i0dD1uS9NuIE0KisbKImgta7GuX8Sb.mp4"
    }
]

interface MarcasContentProps {
    onItemClick: (itemName: string) => void
    selectedMarca: string | null
    onBack: () => void
}

export default function MarcasContent({ onItemClick, selectedMarca, onBack }: MarcasContentProps) {
    const handleMarcaClick = (marca: MarcaItem) => {
        onItemClick(marca.title)
    }

    const currentMarca = marcaItems.find(marca => marca.title === selectedMarca)

    return (
        <div className="w-full">
            <AnimatePresence>
                {currentMarca ? (
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
                                src={currentMarca.videoUrl}
                                controls
                                className="w-full max-h-[60vh] object-contain"
                            >
                                Your browser does not support the video tag.
                            </video>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-primary-green mb-2">
                                    {currentMarca.title}
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
                        {marcaItems.map((marca) => (
                            <Dialog key={marca.id}>
                                <DialogTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="cursor-pointer"
                                        onClick={() => handleMarcaClick(marca)}
                                    >
                                        <div className="aspect-video bg-background-darkPurple rounded-lg shadow-md overflow-hidden">
                                            <video
                                                src={marca.videoUrl}
                                                className="w-full h-full object-cover"
                                                muted
                                                playsInline
                                                loop
                                                autoPlay
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <p className="mt-2 text-center font-medium text-primary-green">
                                            {marca.title}
                                        </p>
                                    </motion.div>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[80vh] p-4">
                                    <div className="relative w-full h-full flex flex-col items-center">
                                        <video
                                            src={marca.videoUrl}
                                            controls
                                            className="w-full max-h-[60vh] object-contain"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                        <button
                                            onClick={() => {
                                                const video = document.querySelector('video');
                                                if (video) void video.requestFullscreen();
                                            }}
                                            className="mt-4 px-4 py-2 bg-primary-green text-white rounded hover:bg-primary-magenta transition-colors"
                                        >
                                            Ver en pantalla completa
                                        </button>
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

