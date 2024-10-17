import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#19b1a0",
        "primary-darker": "#138679",
        "primary-lighter": "#19b3a1",
      },
    },
    fontFamily: {
      header: "var(--font-popins)",
      body: "var(--font-dm-sans)",
    },
    screens: {
      xs: "360px", // Extra small devices (small phones)
      sm: "480px", // Small devices (phones)
      md: "768px", // Medium devices (tablets)
      lg: "1024px", // Large devices (desktops)
      xl: "1280px", // Extra large devices (large desktops)
      "2xl": "1440px", // 2x Extra large (larger screens)
      "3xl": "1600px", // 3x Extra large (ultrawide screens)
    },
  },
  plugins: [],
};
export default config;
