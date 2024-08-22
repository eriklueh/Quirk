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
        url: "https://quirk-one.vercel.app/",
        type: "website",
        images: [
            {
                url: "/quirk_icon.ico",
                width: 1200,
                height: 630,
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
        <html lang="en" className={`${urbanist.variable}`}>
        <body>{children}</body>
        </html>
    );
}
