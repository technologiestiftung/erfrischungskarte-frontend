module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'layer-green': {
          '100': '#CAEAC3',
          '200': '#7BC87C',
          '300': '#2A924A',
          '400': '#00441B',
        },
        'layer-blue': {
          '100': '#C8DDF0',
          '200': '#73B3D8',
          '300': '#2879B9',
          '400': '#08306B',
        },
        'layer-turquoise': {
          '100': '#ECF5F1',
          '200': '#BADECF',
          '300': '#76B3A6',
          '400': '#416D68',
        },
      },
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
    extend: {},
  },
  plugins: [],
}
