// src/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "My Portfolio",
    description: "Personal portfolio site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta name="color-scheme" content="dark" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-50`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
            <div className="mx-auto max-w-[720px] px-5 sm:px-8 py-12 md:py-16 lg:py-20">
                <Navbar />
                {children}
                <Footer />
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
