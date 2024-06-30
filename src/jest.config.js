module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'coverage',
    testMatch: ['**/tests/**/*.test.js'], // Ajusta el patrón de coincidencia según la estructura de tus pruebas
    collectCoverage: true, // Para recopilar información de cobertura de código
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    moduleFileExtensions: ['js', 'json'],
    transform: {},
    setupFilesAfterEnv: ['./jest.setup.js'], // Archivo opcional para configuración adicional de Jest
  };
  