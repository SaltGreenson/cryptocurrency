import { addCoinToPortfolio, initializeProfile } from './actionCreators';
import { AssetsType } from '../../api/types-api';
import { assetsApi } from '../../api/assets-api';
import {actions} from './actions'

jest.mock('../../api/assets-api');
const assetsAPIMock = assetsApi as jest.Mocked<typeof assetsApi>;

const coin: AssetsType = {
  id: 'bitcoin',
  rank: 1,
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: 19167968,
  maxSupply: 21000000,
  marketCapUsd: 372374910879.1380576,
  volumeUsd24Hr: 11374487618.036757,
  priceUsd: 19426.937215,
  changePercent24Hr: 1.525387,
  vwap24Hr: 19212.522455,
};

const response = {
  data: {
    ...coin,
  } as AssetsType,
};

describe('Tests for profile-reducer thunks', () => {
  let dispatchMock: any;
  let getStateMock: any;
  beforeAll(() => {
    dispatchMock = jest.fn();
    getStateMock = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Must be created new profile', async () => {
    assetsAPIMock.assetsById.mockReturnValue(Promise.resolve(response) as any);
    const thunk = initializeProfile();
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setProfile({
      portfolio: [],
      balanceUsd: 0,
      initialBalance: 0,
      residualBalance: 0,
    }));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.initializedSuccess());
  });

  test('The coin must be added to the portfolio', async () => {
    const thunk = addCoinToPortfolio(coin, 3);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(1);
  });
});
