"use client"

import { motion } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"
import { assetUrls } from "~/lib/asset-url";

interface VFXItem {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

interface VFXContentProps {
    onItemClick: (itemName: string) => void
    selectedVFX: string | null
    onBack: () => void
}

export default function VFXContent({ onItemClick, selectedVFX, onBack }: VFXContentProps) {
    const vfxItems: VFXItem[] = [
        {
            id: "1",
            title: "Coco Palm VFX .Quirk ˎˊ˗",
            videoUrl: assetUrls.vfx.cocoPalm,
            thumbnailUrl: "/assets/portfolio/VFX/coco_thumb.png",
        },
        {
            id: "2",
            title: "Lost Ocean VFX .Quirk ˎˊ˗",
            videoUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/VFX/VFX_LostOcean_Compressed-UDtqzsojKatsPcB2ZPklW0UQKSfOtD.mp4",
            thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/VFX/Thumbnail_VFX_LostOcean-DAStvaRqWiDsu4bHh5rHrpys3XqVIx.png",
        },
        {
            id: "3",
            title: "Underwater VFX .Quirk ˎˊ˗",
            videoUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/VFX/VFX_Underwater_Compressed-ktY7ATnpzwBoYp7AXUmfttGmjbyl22.mp4",
            thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/VFX/Thumbnail_VFX_Underwater-OfyTlbQAzOcTIEE3qpOcYd4poOJfJj.png",
        },
    ];

    const selectedItem = vfxItems.find(item => item.title === selectedVFX);

    if (selectedItem) {
        return (
            <div className="w-full">
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
                        <div className="aspect-video">
                            <video
                                src={selectedItem.videoUrl}
                                className="w-full h-full object-cover"
                                controls
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-primary-green mb-2">
                                {selectedItem.title}
                            </h3>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                {vfxItems.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer relative overflow-hidden rounded-lg bg-background-darkPurple"
                        onClick={() => onItemClick(item.title)}
                    >
                        <div className="aspect-video">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-primary-green mb-2">
                                {item.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

