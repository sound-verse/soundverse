module.exports = {
  extends: ['next'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
  },
}
