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

// 👇 CONFIGURATION SEO COMPLETE (OPEN GRAPH)
export const metadata: Metadata = {
  // Remplacez par votre VRAI domaine final (ex: https://www.mindoguesito.com)
  // C'est important pour que les images s'affichent sur Facebook/Twitter
  metadataBase: new URL("https://mindoguesito.com"),

  title: {
    default: "MINDOGUESITO | L'Intelligence Artificielle Vodun",
    template: "%s | MINDOGUESITO",
  },
  description:
    "Découvrez la sagesse ancestrale de Ouidah à travers une IA unique. Posez vos questions sur l'histoire, les rites et la culture Vodun.",

  // Configuration pour le partage social (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "MINDOGUESITO | Le Sage Numérique de Ouidah",
    description:
      "Une conversation unique avec l'esprit du Vodun. Cliquez pour entrer dans le temple numérique.",
    url: "https://mindoguesito.com",
    siteName: "Mindoguesito AI",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // L'image que vous devez mettre dans le dossier public
        width: 1200,
        height: 630,
        alt: "Interface de Mindoguesito IA",
      },
    ],
  },

  // Configuration pour Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "MINDOGUESITO | IA & Culture Vodun",
    description:
      "La rencontre entre la technologie et la tradition. Essayez le Sage maintenant.",
    images: ["/og-image.png"], // La même image
  },

  // Configuration des icônes (Favicon)
  icons: {
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
