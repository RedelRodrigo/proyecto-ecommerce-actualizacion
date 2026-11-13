import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite imágenes de cualquier dominio externo (ideal para MockAPI y placeholders)
      },
    ],
  },
};

export default nextConfig;
