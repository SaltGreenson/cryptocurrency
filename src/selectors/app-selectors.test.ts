import { getCurrentPage, getInitialized, getLastRank } from './app-selectors';
import { AppStateType } from '../redux/redux-store';

describe('app-selector TESTS', () => {
  test('Returned current page must be 1', () => {
    expect(getCurrentPage({} as AppStateType)).toBe(1);
  });

  test('Returned current page must be 10', () => {
    expect(getCurrentPage({
      app: {
        currentPage: 10,
      },
    } as AppStateType)).toBe(10);
  });

  test('Returned initialize app must be in false state', () => {
    expect(getInitialized({} as AppStateType)).toBe(false);
  });

  test('Returned last rank must be 1', () => {
    expect(getLastRank({} as AppStateType)).toBe(1);
  });
});
