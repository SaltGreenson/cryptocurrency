import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  verbose: true,
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  moduleNameMapper: {
    '\\.(css|less|gif)$': '<rootDir>/test/jest/__mocks__/styleMock.ts',
  }
};

export default config;