"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft } from "@tabler/icons-react"

interface Game {
    id: string
    title: string
    thumbnailUrl: string
    gameUrl: string
}

const games: Game[] = [
    {
        id: "1",
        title: " Tori-Torii ",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/videojuegos/tori-SscFpwiNIRweTsn7xg0ps1SDJvN1Wl.png",
        gameUrl: "https://itch.io/embed-upload/12065538?color=2a2a2a"
    },
    {
        id: "2",
        title: " Vuelve A Casa ",
        thumbnailUrl: "https://gyjvl8bfkxptvsdy.public.blob.vercel-storage.com/videojuegos/Kumi2-ERV5A3a6Kimk9t2PuAW04B8iyMQnMP.png",
        gameUrl: "https://itch.io/embed-upload/12067609?color=333333"
    }

]

interface GamesContentProps {
    onItemClick: (itemName: string) => void
    selectedGame: string | null
    onBack: () => void
}

export default function GamesContent({ onItemClick, selectedGame, onBack }: GamesContentProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    const handleGameClick = (game: Game) => {
        onItemClick(game.title)
        setIsLoading(true)
        setLoadingProgress(0)
    }

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval)
                        setIsLoading(false)
                        return 100
                    }
                    return prevProgress + 10
                })
            }, 100)
            return () => clearInterval(interval)
        }
    }, [isLoading])

    const currentGame = games.find(game => game.title === selectedGame)

    return (
        <div className="w-full">
            <AnimatePresence>
                {currentGame ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full"
                        style={{ aspectRatio: "16 / 9", minHeight: "500px", maxWidth: "800px", minWidth: "500px", margin: "0 auto" }}
                    >
                        <button
                            onClick={onBack}
                            className="absolute top-2 left-2 text-primary-green hover:text-primary-magenta z-10"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full relative overflow-hidden rounded-lg"
                        >
                            <img
                                src={currentGame.thumbnailUrl}
                                alt={currentGame.title}
                                className="w-full h-full object-cover"
                            />
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center"
                                >
                                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary-green"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${loadingProgress}%` }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                    <p className="text-primary-green mt-4">Cargando juego...</p>
                                </motion.div>
                            )}
                            {!isLoading && (
                                <motion.iframe
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={currentGame.gameUrl}
                                    title={currentGame.title}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="fullscreen; autoplay; encrypted-media"
                                    allowFullScreen
                                    sandbox="allow-same-origin allow-forms allow-scripts allow-pointer-lock allow-orientation-lock allow-popups"
                                ></motion.iframe>
                            )}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                        {games.map((game) => (
                            <motion.div
                                key={game.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer"
                                onClick={() => handleGameClick(game)}
                            >
                                <img
                                    src={game.thumbnailUrl}
                                    alt={game.title}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                                <p className="mt-2 text-center text-primary-green font-medium">{game.title}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}