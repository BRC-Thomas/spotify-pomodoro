/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#191414",
        lightblack: "#242424",
        green: "#1DB954",
      },
      boxShadow: {
        whiteshadow: "0 0 0 2px hsla(0,0%,100%,.2)",
      },
    },
  },
  plugins: [],
};
