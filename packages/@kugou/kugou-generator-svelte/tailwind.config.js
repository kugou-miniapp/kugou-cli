const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundOpacity: {
        '15': '0.15'
      },
      colors: {
        gray: colors.trueGray
      },
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