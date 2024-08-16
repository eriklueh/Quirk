import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-urbanist)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          green: "#d6fa02", // VERDE
          magenta: "#e500ee", // MAGENTA
          cyan: "#0af3ff", // CIAN
          darkViolet: "#2f195e", // VIOLET OSCURO
          blackViolet: "#0f1020", // VIOLETA NEGRO
        },
        secondary: {
          brightViolet: "#9600f1", // VIOLETA BRILLANTE
          aqua: "#00edbf", // AQUA
          orange: "#f4a900", // NARANJA
          lilac: "#bcb6ff", // LILA
          blackBrown: "#1c0b19", // NEGRO AMARRONADO
        },
        background: {
          black: "#000000", // Fondo negro
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
