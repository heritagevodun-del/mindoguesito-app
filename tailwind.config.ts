import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        ouidah: {
          terre: "#A0522D", // Sienne (Terre rouge)
          indigo: "#1C2541", // Nuit profonde
          or: "#D4AF37", // Or Métallique
          sable: "#Fdfbf7", // Fond Papier
          kaolin: "#FAF0E6", // Blanc Cassé
          gris: "#8D99AE", // Gris Pierre
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"], // La police Luxe
      },
      animation: {
        "message-appear":
          "message-appear 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
      keyframes: {
        "message-appear": {
          "0%": { opacity: "0", transform: "translateY(15px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
