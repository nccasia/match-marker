/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleNameMapper,
  rootDir: './',
  testRegex: 'spec.ts$',
  testRunner: 'jest-jasmine2',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: {
        ...tsconfig.compilerOptions,
        allowJs: true,
        checkJs: false,
        downlevelIteration: true,
        declaration: false,
      },
    },
  },
  bail: true,
  // setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  coveragePathIgnorePatterns: ['/migrations/', 'orm.ts', 'main.ts', '.config.ts', '/test/', 'jest.'],
}
