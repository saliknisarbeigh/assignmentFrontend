/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bakery: {
          dark: "#2D2D32",
          darker: "#212529",
          darkest: "#282929",
          gray: "#495057",
          lightgray: "#CED4DA",
          mint: "#EBF6F4",
          mintAccent: "#B2DDD3",
          yellow: "#F6D790",
          gold: "#A98129",
          tan: "#BEA064",
          peach: "#F4BCB4",
          pink: "#FBECEA",
          peachAccent: "#F9BDB6",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
