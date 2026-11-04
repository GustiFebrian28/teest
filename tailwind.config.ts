import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        krem: "#fdf3e7",
        mawar: "#f7d9d9",
        emas: "#c9a35b",
        tinta: "#3b2a2f",
        malam: "#2a1b2d",
      },
      fontFamily: {
        judul: ['"Playfair Display Variable"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
