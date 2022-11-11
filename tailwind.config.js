/** @type {import('tailwindcss').Config} */
// https://coolors.co/634064-1d3461-2e86ab-e5e5e5-f3f3f3
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        background: '#F3F3F3', // PLATINUM
        'panel-background': '#E5E5E5', //CULTURED
        'big-text': "#634064", // ENGLISH VIOLET
        'headings': '#1D3461', // SPACE CADET
        'link': '#2E86AB', // BLUE NCS
      },
    },
    fontFamily: {
      'big-text': "'Cinzel', serif;"
    },
    
  },
  plugins: [require('@tailwindcss/forms')]
};
