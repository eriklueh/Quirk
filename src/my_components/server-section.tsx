"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";
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
import { useAchievements } from "~/my_components/achievement/achievement";
import { Loader2 } from 'lucide-react';

type SocialIcon = {
  name: string;
  normalSrc: string;
  hoverSrc: string;
  link: string;
};

const CONTACT_EMAIL = "quirkagenciamultimedial@gmail.com";

export default function ServerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const buttonControls = useAnimation();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonControls = useAnimation();
  const [visitedNetworks, setVisitedNetworks] = useState<Set<string>>(new Set());
  const [achievementReady, setAchievementReady] = useState(false);
  const { unlockAchievement } = useAchievements();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100, 0]));
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 0]));

  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const socialIcons: SocialIcon[] = [
    {
      name: "ArtStation",
      normalSrc: "/assets/server/art_station.svg",
      hoverSrc: "/assets/server/art_station_hover.svg",
      link: "https://www.artstation.com/punto_quirk",
    },
    {
      name: "Instagram",
      normalSrc: "/assets/server/instagram.svg",
      hoverSrc: "/assets/server/instagram_hover.svg",
      link: "https://www.instagram.com/punto.quirk?igsh=Mjl4bmIyZDR1NnBu",
    },
    {
      name: "Discord",
      normalSrc: "/assets/server/discord.svg",
      hoverSrc: "/assets/server/discord_hover.svg",
      link: "https://discord.com/invite/BVtTyKhtzp",
    },
    {
      name: "TikTok",
      normalSrc: "/assets/server/tik_tok.svg",
      hoverSrc: "/assets/server/tik_tok_hover.svg",
      link: "https://www.tiktok.com/@punto.quirk?_t=8m1UojDMrsU&_r=1",
    },
  ];

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

  useEffect(() => {
    if (formValid && !isLoading) {
      void submitButtonControls.start({
        background: [
          "conic-gradient(from 0deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)",
          "conic-gradient(from 360deg at 50% 50%, #d6fa02 0deg, #e500ee 120deg, #0af3ff 240deg, #d6fa02 360deg)",
        ],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: [0.6, -0.28, 0.735, 0.045],
        },
      });
    } else {
      void submitButtonControls.stop();
    }
  }, [formValid, isLoading, submitButtonControls]);

  useEffect(() => {
    if (visitedNetworks.size === 4 && !achievementReady) {
      setAchievementReady(true);
    }
  }, [visitedNetworks, achievementReady]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && achievementReady) {
        unlockAchievement("social_butterfly");
        setAchievementReady(false);
        setVisitedNetworks(new Set());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [achievementReady, unlockAchievement]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        toast({
          title: "¡Gracias por tu mensaje!",
          description: "Te responderemos pronto.",
        });
        unlockAchievement("form_master");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const form = e.target.form;
    if (form) {
      setFormValid(form.checkValidity());
    }
  };

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    setFormValid(form.checkValidity());
  };

  const handleSocialIconClick = (iconName: string) => {
    const newVisitedNetworks = new Set(visitedNetworks);
    newVisitedNetworks.add(iconName);
    setVisitedNetworks(newVisitedNetworks);
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
          <motion.div
              style={{
                y: y1,
                rotate: 100,
              }}
              className="2 absolute -left-36 -top-10 z-20 -translate-x-full -translate-y-1/2"
          >
            <Image
                src="/assets/zig/Asset 10.png"
                alt="Decorative star"
                width={200}
                height={200}
            />
          </motion.div>
          <motion.div
              style={{
                y: y2,
                rotate: 5,
              }}
              className="absolute -left-16 -top-48 -translate-x-full -translate-y-1/2"
          >
            <Image
                src="/assets/stars/Asset 27.png"
                alt="Decorative star"
                width={150}
                height={150}
            />
          </motion.div>

          <motion.div
              style={{
                y: y2,
                rotate: 120,
              }}
              className="absolute -right-4 top-10 -translate-x-full -translate-y-1/2"
          >
            <Image
                src="/assets/stars/Asset 25.png"
                alt="Decorative star"
                width={40}
                height={40}
            />
          </motion.div>

          <motion.div
              style={{
                y: y2,
                rotate: 120,
              }}
              className="absolute -right-24 top-28 -translate-y-1/2 translate-x-full"
          >
            <Image
                src="/assets/circles/Asset 13.png"
                alt="Decorative star"
                width={250}
                height={250}
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-[70px] w-[70px]"
                      onHoverStart={() => setHoveredIcon(icon.name)}
                      onHoverEnd={() => setHoveredIcon(null)}
                      whileHover={{ scale: 1.3 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSocialIconClick(icon.name);
                        window.open(icon.link, "_blank");
                      }}
                  >
                    <Image
                        src={icon.normalSrc}
                        alt={icon.name}
                        layout="fill"
                        className={`transition-opacity duration-300 ${
                            hoveredIcon === icon.name ? "opacity-0" : "opacity-80"
                        }`}
                    />
                    <Image
                        src={icon.hoverSrc}
                        alt={`${icon.name} Hover`}
                        layout="fill"
                        className={`transition-opacity duration-300 ${
                            hoveredIcon === icon.name ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  </motion.a>
              ))}
            </div>
          </GradientCard>

          <div className="mt-8 flex justify-center">
            <motion.div
                className="overflow-hidden rounded-full p-[2px]"
                animate={buttonControls}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <button
                  onClick={() => setIsDialogOpen(true)}
                  className="hover:text-primary-yellow rounded-full bg-black px-8 py-3 font-semibold text-primary-green transition-colors"
              >
                Ahora en serio...
              </button>
            </motion.div>
          </div>
        </motion.div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="border-gray-700 bg-gray-100 p-8 shadow-lg">
            <DialogHeader>
              <DialogTitle className="mb-6 text-3xl font-bold text-gray-800">
                Contáctanos
              </DialogTitle>
            </DialogHeader>
            <form
                onSubmit={handleSubmit}
                onChange={handleFormChange}
                className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Trabajemos juntos
                </h2>
                <p className="text-gray-600">
                  Rellene este formulario y nos pondremos en contacto con usted en
                  breve.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                      htmlFor="to-email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    To:
                  </label>
                  <input
                      type="text"
                      id="to-email"
                      value={CONTACT_EMAIL}
                      readOnly
                      className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  />
                </div>
                <Input
                    name="name"
                    placeholder="Nombre Completo*"
                    required
                    className="border-gray-300 bg-white text-gray-800"
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Correo Electrónico*"
                    required
                    className="border-gray-300 bg-white text-gray-800"
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <Textarea
                    name="message"
                    placeholder="Tu Mensaje*"
                    required
                    className="min-h-[150px] border-gray-300 bg-white text-gray-800"
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
              </div>
              <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={!formValid || isLoading}
                    className="flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                  ) : (
                      "Enviar Mensaje"
                  )}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </section>
  );
}

