/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        "black-lighter": "#1c4b91",
        "black-light": "#173d77",
        pink: "#da2f68",
        orange: "#f89e00",
      },
      backgroundColor: {
        black: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        "black-lighter": "#1c4b91",
        "black-light": "#173d77",
        pink: "#da2f68",
        orange: "#f89e00",
      },
      backgroundImage: {
        gradient: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
      },
      keyframes: {
        mobileMenu: {
          "0%": { transform: "translateY(-130%)" },
          "100%": { transform: "translateY(0)" },
        },
        zoomInShade: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
      animation: {
        mobileMenu: "mobileMenu 0.3s ease forwards ",
        zoomInShade: "zoominShade 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        zoomAnimation: " ping 18s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      boxShadow: {
        shad: "0 0 0.625em #da2f68",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.88, -0.35, 0.565, 1.35)",
      },
    },
  },
  plugins: [],
};
