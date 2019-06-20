module.exports = {
  extends: 'standard',
  plugins: ['html'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: { es6: true },
  rules: {
    semi: [2, 'never']
  }
}
