module.exports = {
  displayName: 'doji-backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/doji-backend',
  coveragePathIgnorePatterns: ['/node_modules/', '/apps/doji-backend/src/entities/'],
  collectCoverage: true,
  coverageReporters: ['text'],
}
