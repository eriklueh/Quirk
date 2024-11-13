"use client";

import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import GradientCard from "~/components/ui/gradient-card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";

type SocialIcon = {
    name: string;
    normalSrc: string;
    hoverSrc: string;
    link: string;
};

const socialIcons: SocialIcon[] = [
    {
        name: 'ArtStation',
        normalSrc: '/assets/server/art_station.svg',
        hoverSrc: '/assets/server/art_station_hover.svg',
        link: 'https://www.artstation.com/punto_quirk'
    },
    {
        name: 'Instagram',
        normalSrc: '/assets/server/instagram.svg',
        hoverSrc: '/assets/server/instagram_hover.svg',
        link: 'https://www.instagram.com/punto.quirk?igsh=Mjl4bmIyZDR1NnBu'
    },
    {
        name: 'Discord',
        normalSrc: '/assets/server/discord.svg',
        hoverSrc: '/assets/server/discord_hover.svg',
        link: 'https://discord.com/invite/BVtTyKhtzp'
    },
    {
        name: 'TikTok',
        normalSrc: '/assets/server/tik_tok.svg',
        hoverSrc: '/assets/server/tik_tok_hover.svg',
        link: 'https://www.tiktok.com/@punto.quirk?_t=8m1UojDMrsU&_r=1'
    }
];

export default function ServerSection() {
    const ref = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();
    const buttonControls = useAnimation();
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100, 0]));
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 0]));

    const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    useEffect(() => {
        void buttonControls.start({
            background: [
                "conic-gradient(from 0deg at 50% 50%, #e500ee 0deg, #d6fa02 180deg, #e500ee 360deg)",
                "conic-gradient(from 360deg at 50% 50%, #e500ee 0deg, #0af3ff 180deg, #e500ee 360deg)",
            ],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
            },
        });
    }, [buttonControls]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const mailtoLink = `mailto:erilueh@gmail.com?subject=Nuevo mensaje de ${data.name}&body=${data.message}%0D%0A%0D%0ADe: ${data.email}`;
            window.location.href = mailtoLink;

            setIsDialogOpen(false);
            toast({
                title: "¡Gracias por tu mensaje!",
                description: "Te responderemos pronto.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al enviar el mensaje.",
                variant: "destructive",
            });
        }
    };

    return (
        <section
            ref={ref}
            className="flex min-h-screen flex-col items-center justify-center bg-background-black p-4"
        >
            <div className="mb-8 text-center">
                <h2 className="mb-2 text-5xl font-bold">
                    <span className="text-primary-magenta">{"> BIENVENIDO AL "}</span>
                    <span className="text-primary-green">SERVER</span>
                    <span className="text-primary-magenta">{" <"}</span>
                </h2>
                <p className="text-xl text-white">No te olvides de ser buena onda :P</p>
            </div>

            <motion.div
                ref={cardRef}
                style={{ opacity: cardOpacity }}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full max-w-3xl"
            >
                {/* Star Decorations */}
                <motion.div
                    style={{
                        y: y1,
                        rotate: 200,
                        opacity: imageOpacity,
                    }}
                    className="absolute -left-24 -top-10 -translate-x-full -translate-y-1/2"
                >
                    <Image
                        src="/assets/stars/Asset 27.png"
                        alt="Decorative star"
                        width={150}
                        height={150}
                        className="text-primary-cyan brightness-125"
                    />
                </motion.div>
                <motion.div
                    style={{
                        y: y2,
                        rotate: 5,
                        opacity: imageOpacity,
                    }}
                    className="absolute -left-12 -top-4 -translate-x-full -translate-y-1/2"
                >
                    <Image
                        src="/assets/stars/Asset 31.png"
                        alt="Decorative star"
                        width={80}
                        height={80}
                        className="text-primary-cyan brightness-125"
                    />
                </motion.div>

                <motion.div
                    style={{
                        y: y2,
                        rotate: 120,
                        opacity: imageOpacity,
                    }}
                    className="absolute -right-44 top-24 translate-x-full -translate-y-1/2 z-20"
                >
                    <Image
                        src="/assets/zig/Asset 12.png"
                        alt="Decorative star"
                        width={250}
                        height={250}
                        className="text-primary-yellow brightness-125"
                    />
                </motion.div>

                <GradientCard
                    headerContent={
                        <p className="font-mono text-xl text-primary-green">
                            {"> .Quirk > Server"}
                        </p>
                    }
                >
                    <div
                        className="mt-[4px] flex w-full flex-wrap items-center justify-center gap-14 bg-background-darkPurple p-[30px]"
                        style={{
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
                        }}
                    >
                        {socialIcons.map((icon) => (
                            <motion.a
                                key={icon.name}
                                href={icon.link}
                                className="relative w-[70px] h-[70px]"
                                onHoverStart={() => setHoveredIcon(icon.name)}
                                onHoverEnd={() => setHoveredIcon(null)}
                                whileHover={{ scale: 1.3 }}
                            >
                                <Image
                                    src={icon.normalSrc}
                                    alt={icon.name}
                                    layout="fill"
                                    className={`transition-opacity duration-300 ${
                                        hoveredIcon === icon.name ? 'opacity-0' : 'opacity-80'
                                    }`}
                                />
                                <Image
                                    src={icon.hoverSrc}
                                    alt={`${icon.name} Hover`}
                                    layout="fill"
                                    className={`transition-opacity duration-300 ${
                                        hoveredIcon === icon.name ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </motion.a>
                        ))}
                    </div>
                </GradientCard>

                <div className="mt-8 flex justify-center">
                    <motion.div
                        className="p-[2px] rounded-full overflow-hidden"
                        animate={buttonControls}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="rounded-full bg-black px-8 py-3  font-semibold text-primary-green transition-colors hover:text-primary-yellow"
                        >
                            Ahora en serio...
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-background-darkPurple border-primary-magenta">
                    <DialogHeader>
                        <DialogTitle className="font-mono text-primary-green">
                            {"> .Quirk > Server > Formulario"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl text-white">
                                ¿Querés que trabajemos juntos? Completá este formulario.
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Nombre y Apellido*"
                                required
                                className="bg-background-black text-white border-primary-magenta"
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="E-mail*"
                                required
                                className="bg-background-black text-white border-primary-magenta"
                            />
                            <Textarea
                                name="message"
                                placeholder="¡Dejános tu mensaje!"
                                required
                                className="min-h-[150px] bg-background-black text-white border-primary-magenta"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded-lg bg-primary-magenta px-6 py-2 text-white hover:bg-primary-magenta/90 transition-colors"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}