import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // VOTRE PALETTE "TERRE & ESPRIT"
        ouidah: {
          terre: '#A0522D',   // Terre de Barre (Dominante)
          indigo: '#1C2541',  // Esprit (Secondaire)
          or: '#D4AF37',      // Lumière (Accent)
          sable: '#F5F5DC',   // Support (Fond beige)
          kaolin: '#FAF0E6',  // Variante plus claire pour les bulles
        }
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        hand: ['var(--font-herr)', 'cursive'], // La signature
      },
    },
  },
  plugins: [],
} satisfies Config;