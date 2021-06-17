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
      colors: {
        'lena-lightgray': '#F3F2F4',
        'lena-lightgray2': '#C9C9C7',
        'lena-gray': '#6B6B6A',
        'lena-gray-light': '#C4C4C4',
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
          DEFAULT: '#4D6EC5',
          "alt-dark": "#3C59A7", // used for button
          dark: '#223A7A',
          darkest: '#011A5E',
        },
        'lena-turquoise': {
          light: '#F1FCFF',
          DEFAULT: '#72D9F1',
          dark: '#00B2DB',
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
