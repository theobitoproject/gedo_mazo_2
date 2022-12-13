/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // TODO: Current globals configuration throws warning:
  // "Define `ts-jest` config under `globals` is deprecated"
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}
