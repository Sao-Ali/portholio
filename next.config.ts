import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        // allow external images if you need them
        domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
    },
};

export default nextConfig;
