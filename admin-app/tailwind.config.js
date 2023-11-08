/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }
      miniWidth: '371px',
      // => @media (min-width: 640px) { ... }
      bigTablet: '769px',
      // => @media (min-width: 640px) { ... }
      miniWith: '453px',
      // => @media (min-width: 640px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      intermWidth: '992px',
      // => @media (min-width: 992px) { ... }

      itemWidth: '885px',
      // => @media (min-width: 992px) { ... }

      otherWidth: '1120px',
      // => @media (min-width: 992px) { ... }

      desktop: '1200px',
      // => @media (min-width: 1280px) { ... }

      largeSize: '1440px',
      // => @media (min-width: 1280px) { ... }
      size1400: '1400px'
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: "#0D0A19",
      gray: "#9A9EA7",
      primary: '#F4A607',
      white: "#FFF"
    },
    extend: {
      colors: {
        gray: "#9A9EA7",
        black: "#0D0A19",
        white: "#FFF",
        primary: {
          DEFAULT: '#F4A607'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

