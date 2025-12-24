import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MINDOGUESITO IA | Le Sage de Ouidah",
  description: "Intelligence Artificielle dédiée à la spiritualité Vodun.",
  icons: {
    // 👇 Le chemin "/" pointe directement vers le dossier 'public'
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-ouidah-sable text-ouidah-indigo">
        {children}
      </body>
    </html>
  );
}
