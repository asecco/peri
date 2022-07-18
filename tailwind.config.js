/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "2000px",
        "3xl": "2800px",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}