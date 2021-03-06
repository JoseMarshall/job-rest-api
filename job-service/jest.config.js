// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
process.env.TZ = 'AO';

module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.built/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/*.(spec|test).ts'],
  clearMocks: true,
  bail: false,
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  preset: '@shelf/jest-mongodb',

};
