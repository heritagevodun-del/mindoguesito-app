import type { Metadata } from "next";
// Nous importons les 3 polices depuis Google Fonts via Next.js
import { Playfair_Display, Lato, Herr_Von_Muellerhoff } from "next/font/google";
import "./globals.css";

// 1. La Voix du Sage (Titres, Citations) - Style Classique
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 2. L'Explorateur (Navigation, Input, Texte Moderne) - Style Lisible
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 3. La Signature (Authenticité) - Style Manuscrit
const herr = Herr_Von_Muellerhoff({
  variable: "--font-herr",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mindoguesito - Le Gardien du Seuil",
  description: "Guide spirituel et culturel de Ouidah. Histoire, Vodun et Sagesse.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* On injecte les variables de polices dans le body pour qu'elles soient dispo partout */}
      <body
        className={`${playfair.variable} ${lato.variable} ${herr.variable} antialiased bg-[#F5F5DC] text-[#1C2541]`}
      >
        {children}
      </body>
    </html>
  );
}