module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'coverage',
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    moduleFileExtensions: ['js', 'json'],
    transform: {},
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  