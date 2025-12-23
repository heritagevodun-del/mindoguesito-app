import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. SÉCURITÉ : On cache la technologie utilisée aux pirates
  // (Empêche de voir "X-Powered-By: Next.js" dans l'en-tête)
  poweredByHeader: false,

  // 2. STABILITÉ : Mode strict pour repérer les erreurs potentielles de React
  reactStrictMode: true,

  // 3. OPTIMISATION IMAGES : Indispensable pour charger des images externes
  // (Autorise tous les sites HTTPS pour l'instant, on pourra restreindre plus tard)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // 4. FORTERESSE : En-têtes de Sécurité HTTP (Indispensable pour le SEO et la confiance)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Force le HTTPS (Standard obligatoire en 2025)
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Empêche le vol de contenu via iFrame (Clickjacking)
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Empêche l'exécution de fichiers malveillants déguisés
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Protège la vie privée des utilisateurs lors des clics sortants
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
