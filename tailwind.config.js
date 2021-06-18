const {
  colors: { white, gray },
} = require('tailwindcss/defaultTheme')
const customColors = require('./src/style/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white,
      gray,
      ...customColors,
    },
    extend: {
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
    },
  },
  plugins: [],
}
