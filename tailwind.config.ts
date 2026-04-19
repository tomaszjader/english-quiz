import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#2cefbc",
        "tertiary-container": "#45fec9",
        "on-background": "#ecedf6",
        "surface-variant": "#22262f",
        "secondary-container": "#006493",
        "tertiary": "#bbffe3",
        "secondary-dim": "#00a7f2",
        "secondary-fixed": "#a7d7ff",
        "inverse-primary": "#6834eb",
        "surface-tint": "#b6a0ff",
        "surface-container": "#161a21",
        "on-secondary-fixed": "#003855",
        "primary-dim": "#7e51ff",
        "on-tertiary-fixed": "#004937",
        "on-error": "#490013",
        "surface": "#0b0e14",
        "on-secondary-container": "#f3f8ff",
        "outline": "#73757d",
        "on-primary": "#340090",
        "tertiary-fixed": "#45fec9",
        "primary-fixed-dim": "#9c7eff",
        "secondary-fixed-dim": "#86cbff",
        "on-error-container": "#ffb2b9",
        "error-container": "#a70138",
        "surface-container-highest": "#22262f",
        "background": "#0b0e14",
        "inverse-on-surface": "#52555c",
        "on-primary-fixed-variant": "#32008a",
        "secondary": "#00affe",
        "on-tertiary": "#00674e",
        "surface-container-high": "#1c2028",
        "on-primary-container": "#280072",
        "surface-container-lowest": "#000000",
        "primary-fixed": "#a98fff",
        "error-dim": "#d73357",
        "on-surface-variant": "#a9abb3",
        "tertiary-dim": "#1ee9b6",
        "primary-container": "#a98fff",
        "inverse-surface": "#f9f9ff",
        "on-tertiary-container": "#005d47",
        "primary": "#b6a0ff",
        "on-tertiary-fixed-variant": "#006850",
        "on-secondary": "#002a42",
        "surface-dim": "#0b0e14",
        "on-primary-fixed": "#000000",
        "on-surface": "#ecedf6",
        "outline-variant": "#45484f",
        "surface-container-low": "#10131a",
        "surface-bright": "#282c36",
        "on-secondary-fixed-variant": "#00567f",
        "error": "#ff6e84"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        serif: ["Lora", "serif"]
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
