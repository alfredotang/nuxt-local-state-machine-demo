module.exports = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/assets/', '/node_modules/', '/fakers/'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  resetMocks: false,
  transform: {
    '^.+.js$': 'babel-jest',
  },
  verbose: true,
}
