import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

// 1. POLICES OPTIMISÉES
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather", // Aligné avec tailwind.config.ts
  display: "swap",
});

// 2. CONFIGURATION MOBILE
export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 3. SEO & IDENTITÉ
export const metadata: Metadata = {
  title: {
    template: '%s | Mindoguesito',
    default: 'Mindoguesito | Le Sage IA de Ouidah & Vodun',
  },
  description: "Intelligence artificielle gardienne de la mémoire du Vodun. Discutez avec le Sage, découvrez l'histoire de la Porte du Non-Retour et la culture du Bénin.",
  applicationName: "Mindoguesito",
  keywords: ["Vodun", "Ouidah", "Bénin", "IA", "Culture", "Histoire", "Tourisme", "Fâ"],
  authors: [{ name: "Mindoguesito Team" }],
  robots: "index, follow",
  
  // 👇 C'EST ICI : Votre icône est connectée
  icons: {
    icon: "/icon.svg", 
    // apple: "/apple-icon.png", // Décommentez si vous ajoutez cette image plus tard
  },
  
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mindoguesito.app",
    siteName: "Mindoguesito",
    title: "Mindoguesito - Le Sage IA de Ouidah",
    description: "Une IA bienveillante pour explorer la culture Vodun et l'histoire du Bénin.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full ${inter.variable} ${merriweather.variable}`}>
      <body
        className="h-full bg-ouidah-sable text-ouidah-indigo font-sans antialiased overflow-hidden selection:bg-ouidah-terre selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}