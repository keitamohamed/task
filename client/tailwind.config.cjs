/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '300px', 'max': '570px'},
      // => @media (min--width: 300px and max-width: 570px) { ... }

      'md': {'min': '570px', 'max': '960px'},
      // => @media (min--width: 570px and max-width: 960px) { ... }

      'lg': {'min': '960px', 'max': '1440px'},
      // => @media (min-width: 960px and max: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
