/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: '424px',
      xs: '480px',
      sm: '672px',
      md: '976px',
      lg: '1440px'
    },
    extend: {
      colors: {
        darkGray: 'hsl(160, 0, 4)',
        mediumGray: 'hsl(0, 0, 8)',
        lightGray: 'hsl(0, 0, 12)',
        veryLightGray: 'hsl(0, 0, 17)',
        textGray: 'hsl(0, 0, 60)',
        modalGray: 'hsl(0, 0, 9)',
        accent: 'hsl(283, 49, 31)',
        accentLight: 'hsl(283, 49, 40)'
      }
    },
  },
  plugins: [],
}

