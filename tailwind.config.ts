import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-iran-sans)", "sans-serif"],
        lalezar: ["var(--font-lalezar)", "sans-serif"],
      },
      colors: {
        dojo: {
          bg: "#080F12",
          canvas: "#0B1318",
          card: "rgba(13, 22, 27, 0.75)",
          border: "rgba(255, 255, 255, 0.12)",
          "border-hover": "rgba(255, 255, 255, 0.25)",
        },
        crimson: {
          DEFAULT: "#E53E3E",
          hover: "#C53030",
          light: "#FEB2B2",
          glow: "rgba(229, 62, 62, 0.35)",
        },
        gold: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
          light: "#FDE68A",
          glow: "rgba(245, 158, 11, 0.3)",
        },
        teal: {
          DEFAULT: "#14B8A6",
          hover: "#0D9488",
          light: "#99F6E4",
          glow: "rgba(20, 184, 166, 0.3)",
        },
      },
      boxShadow: {
        glass: "0 16px 40px 0 rgba(0, 0, 0, 0.37)",
        "glow-crimson": "0 0 25px rgba(229, 62, 62, 0.35)",
        "glow-teal": "0 0 25px rgba(20, 184, 166, 0.35)",
        "glow-gold": "0 0 25px rgba(245, 158, 11, 0.35)",
      },
      backdropBlur: {
        glass: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
