module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx/ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Atkinson Hyperlegible', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
