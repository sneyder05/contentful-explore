module.exports = {
  rootDir: '.',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/main.ts'],
  coverageDirectory: 'coverage/summary',
  coverageReporters: ['text-summary', 'json'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testRegex: '.*\\.spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  maxWorkers: 3,
};
