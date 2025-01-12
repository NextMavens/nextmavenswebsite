/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#2e00ab',
        'light-blue': '#2bc3fd',
      },
      fontFamily: {
        benzin: ['Benzin', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 