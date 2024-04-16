/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '672px',
      md: '976px',
      lg: '1440px'
    },
    extend: {
      colors: {
        darkGray: 'hsl(160, 0, 0)',
        mediumGray: 'hsl(0, 0, 8)',
        lightGray: 'hsl(0, 0, 12)',
        veryLightGray: 'hsl(0, 0, 17)',
        textGray: 'hsl(0, 0, 60)'
      }
    },
  },
  plugins: [],
}

