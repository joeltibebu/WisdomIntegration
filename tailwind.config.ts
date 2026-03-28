import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        "wisdom-blue": "#1E4B9B",
        "wisdom-green": "#3DAE49",
        "wisdom-yellow": "#F8E32C",
        "wisdom-orange": "#F2AA2C",
        "wisdom-bg": "var(--wisdom-bg)",
        "wisdom-surface": "var(--wisdom-surface)",
        "wisdom-text": "var(--wisdom-text)",
        "wisdom-muted": "var(--wisdom-muted)",
        "wisdom-border": "var(--wisdom-border)",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        amharic: ["var(--font-amharic)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        cardLg: "24px",
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
