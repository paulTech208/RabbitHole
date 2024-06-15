/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      white_1: "#4d4d4d38",
      white_2: "#fafafa",
      white_3: "#0000000a",
      white_4: "#00000040",
      white_border: "#d9d9d9",
      black: '#000000',
      green: "#00b96b",
      red: "#ff0000",
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        hedvig: ["Hedvig Regular", "sans-serif"]
      },
      screens: {
        ios : '320px',
        samsungS8: "360px",
        xs: '390px',
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl":'1440px',
        "3xl": "1920px",
      },
    },
    boxShadow: {
    }
  },
  variants: {
    extend: {
      display: ["dark"],
    },
  },
  darkMode: ["class"],
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    // ...
  ],
}
