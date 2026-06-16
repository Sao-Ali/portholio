// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist_Mono, Inria_Sans, Patrick_Hand_SC } from "next/font/google";
import Footer from "@/components/footer";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inriaSans = Inria_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-inria-sans",
});
const patrickHand = Patrick_Hand_SC({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-patrick-hand-sc",
});

export const metadata: Metadata = {
    title: "Ali Sao | Portfolio",
    description:
        "Portfolio and blog for Ali Sao, a UCI Computer Engineering student building across software and hardware.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${geistMono.variable} ${inriaSans.variable} ${patrickHand.variable}`}>
        <head>
            <meta name="color-scheme" content="light" />
            <meta name="theme-color" content="#fffdfa" />
        </head>
        <body className="bg-white text-neutral-800 antialiased">
            {children}
            <div className="mx-auto max-w-xl px-6 md:px-0">
                <Footer />
            </div>
        </body>
        </html>
    );
}
