import {
    actions,
    AssetsTop3Type,
    GenericStateType,
    setAssetByID,
    setAssets,
    setAssetsHistoryById, setAssetsMarketsById,
    setAssetsTop3
} from "./assets-reducer";
import {assetsApi, IntervalEnum} from "../api/assets-api";
import {AssetsHistoryType, AssetsMarket, AssetsType, ResponseType} from "../api/types-api";

jest.mock("../api/assets-api")


const coin: AssetsType = {
    id: "bitcoin",
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    supply: 19167968,
    maxSupply: 21000000,
    marketCapUsd: 372374910879.1380576,
    volumeUsd24Hr: 11374487618.036757,
    priceUsd: 19426.937215,
    changePercent24Hr: 1.525387,
    vwap24Hr: 19212.522455
}

const response = {
    data: [{}] as Array<AssetsType>
}



const assetsAPIMock = assetsApi as jest.Mocked<typeof assetsApi>

const assetsTop3Template = {
    data: [{
        data: {},
        history: [{}],
        id: undefined
    }]
}

describe('Tests for assets-reducer thunks', () => {

    let dispatchMock: any
    let getStateMock: any

    beforeAll(() => {
        dispatchMock = jest.fn()
        getStateMock = jest.fn()
    })

    beforeEach(() => {
        assetsAPIMock.assets.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>)
        assetsAPIMock.assetsById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>)
        assetsAPIMock.assetsHistoryById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>)
        assetsAPIMock.assetsMarketsById.mockReturnValue(Promise.resolve(response) as Promise<ResponseType>)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Assets must be collected', async () => {

        const thunk = setAssets(1, 30)
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAssets(response as GenericStateType<Array<AssetsType>>))

    })

    test('Top 3 assets must be collected and sets', async () => {
        const thunk = setAssetsTop3()
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsTop3Action(assetsTop3Template as unknown as AssetsTop3Type))
    })

    test('Asset by id must be collected', async () => {
        const thunk = setAssetByID('1')
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsById([{}] as unknown as GenericStateType<AssetsType>))
    })

    test('History by id must be collected', async () => {
        const thunk = setAssetsHistoryById('1', IntervalEnum.m5)
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsHistoryById({ data: [{}] } as unknown as GenericStateType<Array<AssetsHistoryType>>))
    })

    test('Markets by id must be collected', async () => {
        const thunk = setAssetsMarketsById('1')
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setAssetsMarketsById({ data: [{}] } as unknown as GenericStateType<Array<AssetsMarket>>))
    })
})