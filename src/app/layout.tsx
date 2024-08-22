import "~/styles/globals.css";
import { Urbanist } from "next/font/google";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Quirk",
    description: "An experience by Quirks for Quirks",
    icons: [{ rel: "icon", url: "/quirk_icon.ico" }],
    openGraph: {
        title: "Quirk",
        description: "An experience by Quirks for Quirks",
        images: [
            {
                url: "/assets/large_logo.png",
                width: 800,
                height: 600,
                alt: "Quirk Preview Image",
            },
        ],
    },
};

const urbanist = Urbanist({
    subsets: ["latin"],
    variable: "--font-urbanist",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${urbanist.variable} cursor-fancy`}>
        <body>{children}</body>
        </html>
    );
}
