module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'grey-dark': '#272727',
        'grey-light': '#ADADAD',
        'grey-medium': '#464447',
        purple: '#493AAB',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        AQCT: ['AQCT', 'sans-serif'],
        AOCR: ['AOCR', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit',
}
