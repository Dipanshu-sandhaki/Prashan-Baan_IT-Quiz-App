/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1A70",
        secondary: "#2D3748",
        tertiary: "#000000",
        button1: "#0B1A70",
        footer: "#1A8FCF",
        color_green: "#09A006"
      },
      gradientColorStops: {
        start: '#0B1A70',
        middle: '#2D3748',
        end: '#000000',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },  
      dropShadow: {
        'all-sides': '3px 3px 40px rgb(0 0 0 / 96%)'
      }
    },
  },
  plugins: [],
}
