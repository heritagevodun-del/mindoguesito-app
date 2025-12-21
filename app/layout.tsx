import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google"; // On ajoute une police "Sérif" pour le côté Sage/Livre
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

// CONFIGURATION SEO EXPERTE
export const metadata: Metadata = {
  title: "Mindoguesito | Le Sage de Ouidah",
  description:
    "Discutez avec Mindoguesito, l'intelligence artificielle gardienne de la mémoire du Vodun. Une exploration bienveillante de la culture de Ouidah.",
  keywords: [
    "Vodun",
    "Ouidah",
    "Bénin",
    "Culture",
    "Sagesse",
    "IA",
    "Patrimoine",
  ],
  openGraph: {
    title: "Mindoguesito | Le Sage de Ouidah",
    description:
      "Posez vos questions sur le Vodun et découvrez une culture de paix et de nature.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
