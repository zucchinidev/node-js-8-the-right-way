module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  // add your custom rules here
  plugins: [
    'import',
    'jest'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
