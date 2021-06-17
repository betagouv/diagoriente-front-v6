module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{js,jsx/ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "lena-blue": {
          lightest: "#E1E7F6",
          "alt-light": "#C4D2F8",
          DEFAULT: "#4D6EC5",
          "alt-dark": "#3C59A7", // used for button .outline-secondary :hover
          dark: "#223A7A",
          darkest: "#011A5E",
        },
      }
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
