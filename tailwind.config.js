/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-navy-blue': '#2e294e',
        'theme-pale-blue': '#7180ac',
        'theme-dark-red': '#8d0801',
        'theme-cream-white': '#ffe6cf',
        'theme-light-orange': '#f3a712'
      },
      fontFamily: {
        'eb-garamond': ['"EB Garamond"', 'sans-serif']
      },
    },
  },
  plugins: [],
}