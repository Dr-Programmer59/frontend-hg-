import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'rotatePause 10s ease-in-out infinite',
        
      },
      colors: {
        background: "#1F2226",
        foreground: "#1A1D22",
        primary: "#FCAD06",
        hoverPrimary: "#FFD74D",
        secondary: '#28A745',
        secondaryHover: '#218838'
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"], // Ensure fallback to sans-serif
        roboto: ["Roboto", "sans-serif"], // Ensure fallback to sans-serif
      },
      screens: {
        xs: "480px", // Extra small devices (mobile phones)
        sm: "640px", // Small devices (landscape phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // Extra extra large devices
        "3xl": "1920px", // Ultra large devices
      },
      animations: {
        "loop-scroll": "loop-scroll 5s linear infinite",
      },
      keyframes: {
        rotatePause: {
          '0%': { transform: 'rotate(0deg)' },            // Start at 0 degrees
          '25%': { transform: 'rotate(360deg)' },          // Rotate 360 degrees (complete one rotation)
          '100%': { transform: 'rotate(360deg)' },         // Stay at 360 degrees for 10 seconds (the pause)
        },
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        }
      },
    },
  },
  plugins: [],
};

export default config;
