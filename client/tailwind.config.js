/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          deep: '#4A2C2C',
          espresso: '#2C1A1A',
          mocha: '#7B4B3A',
          caramel: '#B87C4B',
          latte: '#C4A35A',
        },
        cream: {
          light: '#FDF6E9',
          DEFAULT: '#FAF1E2',
          dark: '#E8DCCC',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}