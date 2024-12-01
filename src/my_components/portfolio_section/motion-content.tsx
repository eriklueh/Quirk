"use client"

import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"
import { assetUrls } from "~/lib/asset-url";

interface MotionVideo {
    id: string
    title: string
    videoUrl: string
    thumbnailUrl: string
}

const videos: MotionVideo[] = [
    {
        id: "1",
        title: "Arcane .Quirk ˎˊ˗",
        videoUrl: assetUrls.motion.arcane,
        thumbnailUrl: "/assets/portfolio/Motion/Thumbnail/Arcane_Quirk_Thumbnail.png"
    },
    {
        id: "2",
        title: "DominATE Tour .Quirk ˎˊ˗",
        videoUrl: assetUrls.motion.dominate,
        thumbnailUrl: "/assets/portfolio/Motion/Thumbnail/MASTER_DominATE-TourV3_Thumbnail.png"
    },
    {
        id: "3",
        title: "SKZOO .Quirk ˎˊ˗",
        videoUrl: assetUrls.motion.skzoo,
        thumbnailUrl: "/assets/portfolio/Motion/Thumbnail/SKZOO_Quirk_Thumbnail.png"
    },
    {
        id: "4",
        title: "Twenty One Pilots .Quirk ˎˊ˗",
        videoUrl: assetUrls.motion.twentyOnePilots,
        thumbnailUrl: "/assets/portfolio/Motion/Thumbnail/TwentyOnePilots_Thumbnail.png"
    },
];

interface MotionContentProps {
    onItemClick: (itemName: string) => void
    selectedVideo: string | null
    onBack: () => void
}

export default function MotionContent({ onItemClick, selectedVideo, onBack }: MotionContentProps) {
    const handleVideoClick = (video: MotionVideo) => {
        onItemClick(video.title)
    }

    const currentVideo = videos.find(video => video.title === selectedVideo)

    return (
        <div className="w-full">
            <AnimatePresence>
                {currentVideo ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full"
                        style={{
                            aspectRatio: "16 / 9",
                            maxWidth: "800px",
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
                            <video
                                controls
                                className="h-full w-full"
                                src={currentVideo.videoUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {videos.map((video) => (
                            <motion.div
                                key={video.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                                onClick={() => handleVideoClick(video)}
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                </div>
                                <p className="mt-2 text-center font-medium text-primary-green">
                                    {video.title}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

