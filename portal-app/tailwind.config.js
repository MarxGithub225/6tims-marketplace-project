/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }
      bigTablet: '768px',
      // => @media (min-width: 640px) { ... }

      limitTablet: '850px',
      // => @media (min-width: 640px) { ... }
      miniWith: '453px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      intermWidth: '992px',
      // => @media (min-width: 992px) { ... }

      desktop: '1200px',
      // => @media (min-width: 1280px) { ... }

      largeSize: '1440px'
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

