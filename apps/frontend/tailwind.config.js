module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'grey-dark': '#272727',
        'grey-light': '#ADADAD',
        'grey-medium': '#464447',
        purple: '#7A64FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
