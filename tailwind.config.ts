import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"; // <-- IMPORT INI

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { // <-- TAMBAHKAN BAGIAN INI
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        background: "#0F0F0F",
        surface: "#1A1A1A",
        primary: "#E50914",
        secondary: "#564d4d",
        text: "#FFFFFF",
        muted: "#B3B3B3"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to top, #0F0F0F 10%, transparent 90%)',
      },
    },
  },
  plugins: [],
};
export default config;
