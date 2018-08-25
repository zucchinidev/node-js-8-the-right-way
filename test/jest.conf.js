const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: [
    'js',
    'json'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/lib/$1'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/data'
    // add here external dependencies
  ],
  setupFiles: ['<rootDir>/test/setup'],
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    'lib/**/*.{js}',
    '!**/node_modules/**'
  ]
}
