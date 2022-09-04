/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  experimental: {
    darkModeVariant: true
  },
  darkMode: 'class',
  theme: {
    screens: {
      'sm': {'min': '300px', 'max': '768px'},
      // => @media (min--width: 300px and max-width: 570px) { ... }

      'md': {'min': '768px', 'max': '960px'},
      // => @media (min--width: 570px and max-width: 960px) { ... }

      'lg': {'min': '960px', 'max': '1440px'},
      // => @media (min-width: 960px and max: 1440px) { ... }

      'xl': {'min': '1440px'},
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      borderColor: '#d1d5db',
      darkLight: 'hsl(106, 0%, 97%)',
      green: {
        500: '#10b981'
      },
      red: {
        700: '#b91c1c'
      },
      teal: {
        400: '#2dd4bf'
      },
      cyan: {
        300: '#67e8f9'
      },
      slate: {
        50: '#f8fafc'
      }
    },
    extend: {
      custom: {
        'lg': '20%',
        'sm': '60%'
      },
      backgroundColor: {
        primary: 'rgb(112, 38, 173)'
      }
    },
  },
  variants: {
    extend: {
      // ...
      translate: ['dark'],
    }
  },
  plugins: [],
}
