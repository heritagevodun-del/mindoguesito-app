import type { Config } from "tailwindcss";
// 👇 CORRECTION : On importe le plugin proprement au lieu d'utiliser 'require'
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
          terre: "#A0522D",
          indigo: "#1C2541",
          or: "#D4AF37",
          sable: "#Fdfbf7",
          kaolin: "#FAF0E6",
          gris: "#8D99AE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-merriweather)", "serif"],
      },
      animation: {
        "message-appear":
          "message-appear 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
      keyframes: {
        "message-appear": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    // 👇 On utilise la variable importée ici
    typography,
  ],
} satisfies Config;
