import { AppStateType } from '../redux/redux-store';
import { getAssets, getIsFetchingAssetsPage } from './assets-selectors';
import { AssetsType } from '../api/types-api';

const initialCoin: AssetsType = {
  id: 'bitcoin',
  rank: 1,
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: 19167968,
  maxSupply: 21000000,
  marketCapUsd: 372374910.1380576,
  volumeUsd24Hr: 11374487618.036757,
  priceUsd: 19426.937215,
  changePercent24Hr: 1.525387,
  vwap24Hr: 19212.522455,
};

describe('assets-selector TESTS', () => {
  test('IsFetching must be in false state if it doesn\'t exist', () => {
    expect(getIsFetchingAssetsPage({} as AppStateType)).toBe(false);
  });

  test('IsFetching must be in false state', () => {
    expect(getIsFetchingAssetsPage({
      assets: {
        isFetchingAssetPage: false,
      },
    } as AppStateType)).toBe(false);
  });

  test('Assets must be displayed correctly', () => {
    expect(getAssets({
      assets: {
        assets: {
          data: [initialCoin],
          timestamp: null,
        },
      },
    } as AppStateType)).toEqual([initialCoin]);
  });
});
