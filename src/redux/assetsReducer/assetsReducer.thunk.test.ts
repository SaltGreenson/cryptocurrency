import {
    AssetsTop3Type,
    GenericStateType
} from './assetsReducer';
import {actions} from './actions'
import {assetsApi, IntervalEnum} from '../../api/assets-api';
import {
    AssetsHistoryType, AssetsMarket, AssetsType, ResponseType,
} from '../../api/types-api';
import {setAssetByID, setAssets, setAssetsHistoryById, setAssetsMarketsById, setAssetsTop3} from "./actionCreators";

jest.mock('../../api/assets-api');

const response = {
    data: [{}] as Array<AssetsType>,
};

const assetsAPIMock = assetsApi as jest.Mocked<typeof assetsApi>;

const assetsTop3Template = {
    data: [{
        data: {},
        history: [{}],
        id: undefined,
    }],
};

describe('Tests for assets-reducer thunks', () => {
    let dispatchMock: any;
    let getStateMock: any;

    beforeAll(() => {
        dispatchMock = jest.fn();
        getStateMock = jest.fn();
    });

    beforeEach(() => {
        assetsAPIMock.assets.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>);
        assetsAPIMock.assetsById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>);
        assetsAPIMock.assetsHistoryById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>);
        assetsAPIMock.assetsMarketsById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Assets must be collected', async () => {
        const thunk = setAssets(1, 30);
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAssets(response as GenericStateType<Array<AssetsType>>));
    });

    test('Top 3 assets must be collected and sets', async () => {
        const thunk = setAssetsTop3();
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsTop3(assetsTop3Template as unknown as AssetsTop3Type));
    });

    test('Asset by id must be collected', async () => {
        const thunk = setAssetByID('1');
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsById({data: [{}]} as unknown as GenericStateType<AssetsType>));
    });

    test('History by id must be collected', async () => {
        const thunk = setAssetsHistoryById('1', IntervalEnum.m5);
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsHistoryById({data: [{}]} as unknown as GenericStateType<Array<AssetsHistoryType>>));
    });

    test('Markets by id must be collected', async () => {
        const thunk = setAssetsMarketsById('1');
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsMarketsById({data: [{}]} as unknown as GenericStateType<Array<AssetsMarket>>));
    });
});
