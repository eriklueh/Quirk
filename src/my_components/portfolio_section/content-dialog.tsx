"use client"

import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconX } from "@tabler/icons-react"
import GradientCard from "~/components/ui/gradient-card"

interface ContentDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export default function ContentDialog({ isOpen, onClose, title, children }: ContentDialogProps) {
    const dialogVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dialogVariants}
            >
                <GradientCard className="w-full max-w-4xl">
                    <div className="bg-background-darkPurple p-4 flex justify-between items-center rounded-t-[20px]">
                        <p className="font-mono text-xl text-primary-green">
                            {`> ./Quirk / ${title}`}
                        </p>
                        <button
                            onClick={onClose}
                            className="text-primary-green hover:text-primary-magenta transition-colors"
                        >
                            <IconX size={24} />
                        </button>
                    </div>
                    <div
                        className="bg-background-darkPurple p-[30px] overflow-y-auto max-h-[calc(90vh-80px)]"
                        style={{
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                        }}
                    >
                        {children}
                    </div>
                </GradientCard>
            </motion.div>
        </AnimatePresence>
    )
}