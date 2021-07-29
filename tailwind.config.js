const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx/ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      width: {
        '58p': '58.33333%',
        '41p': '41.66667%',
        '45p': '45.9%',
        '69p': '69.33333%',
        '30p': '30.66667%',
        dateInputSm: '149px',
        dateInputMd: '159px',
        dateInput: '192px',
        logoExp:155
      },
      divideColor: {
        blue: '#C4D2F8',
      },
      maxWidth: {
        '58p': '58.33333%',
        '41p': '41.66667%',

        '69p': '69.33333%',
        '30p': '30.66667%',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '28p': '78px'
      },
      height:{
        logoExp:143
      },
      colors: {
        'lena-lightgray': '#F3F2F4',
        'lena-lightgray2': '#C9C9C7',
        'lena-gray': '#6B6B6A',
        'lena-gray-light': '#C4C4C4',
        'lena-gray-light-2': '#ECE8F0',
        'lena-black': '#232323',
        'lena-yellow': {
          light: '#FFEBC6',
          DEFAULT: '#FFBF47',
          dark: '#DB8F00',
        },
        'lena-pink': {
          light: '#FFE1EC',
          DEFAULT: '#FF0060',
          dark: '#D60051',
          darkest: '#AB0F4A',
        },
        'lena-blue': {
          lightest: '#E1E7F6',
          'alt-light': '#C4D2F8',
          light2: '#ECE8F0',
          DEFAULT: '#4D6EC5',
          'alt-dark': '#3C59A7', // used for button
          dark: '#223A7A',
          darkest: '#011A5E',
          inter: '#A3AFD3',
          light: '#E1E7F7',
        },
        'lena-turquoise': {
          light: '#F1FCFF',
          DEFAULT: '#72D9F1',
          dark: '#00B2DB',
        },
        'lena-purple': {
          light: '#ECE8F0',
        },
      },
    },
    fontFamily: {
      sans: ['Atkinson Hyperlegible', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'),
    plugin(function({ addVariant, e }) {
      addVariant('first-letter', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`first-letter${separator}${className}`)}::first-letter`
        })
      })
  })],
};
