const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        full: '100%'
      },
      fontFamily: {
        yahei: ['Microsoft YaHei']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}