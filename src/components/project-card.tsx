"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProjectCard({
                                title,
                                description,
                                image,
                                buttonText,
                                buttonLink,
                                className,
                            }: {
    title: string;
    description: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                // ✨ Added hover & transition styling
                "group flex flex-col md:flex-row w-full mx-auto rounded-xl overflow-hidden border border-[rgba(255,255,255,0.10)] bg-gray-100 dark:bg-[rgba(40,40,40,0.70)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                className
            )}
        >
            {/* Left: image */}
            <div className="relative md:w-[40%] w-full h-48 md:h-56 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-sm text-neutral-700 dark:text-neutral-300">
            Image Placeholder
          </span>
                )}
            </div>

            {/* Right: content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {description}
                    </p>
                </div>

                {buttonText && (
                    <a
                        href={buttonLink ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );
}
