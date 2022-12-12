/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}
