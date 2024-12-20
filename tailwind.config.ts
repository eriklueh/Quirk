import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-urbanist)", ...fontFamily.sans],
      },
      cursor: {
        fancy: "url(/cursor.cur), pointer",
        pointer: "url(/cursor.cur), pointer",
      },
      colors: {
        primary: {
          green: "#d6fa02", // VERDE
          magenta: "#e500ee", // MAGENTA
          cyan: "#0af3ff", // CIAN
          darkViolet: "#2f195e", // VIOLET OSCURO
          blackViolet: "#0f1020",
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
          darkPurple: "#10101f",
        },
      },
      boxShadow: {
        "neon-magenta": "0 4px 50px rgba(229, 0, 238, 0.5)",
        "neon-green": "0 4px 50px rgba(214, 250, 2, 0.5)",
        "neon-cyan": "0 4px 50px rgba(10, 243, 255, 0.5)",
        "neon-brightViolet": "0 4px 50px rgba(150, 0, 241, 0.5)",
        "neon-orange": "0 4px 50px rgba(244, 169, 0, 0.5)",
      },
      borderColor: {
        "neon-magenta": "#e500ee",
        "neon-green": "#d6fa02",
        "neon-cyan": "#0af3ff",
        "neon-brightViolet": "#9600f1",
        "neon-orange": "#f4a900",
      },
      animation: {
        'scroll-left': 'scroll-left 20s linear infinite',
        'scroll-right': 'scroll-right 20s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
