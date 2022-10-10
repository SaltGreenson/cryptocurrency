import profileReducer, {
    actions,
    ActionsTypes,
    initializeProfile,
    InitialStateType,
    ProfileType
} from "./profile-reducer";
import {AssetsType} from "../api/types-api";


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

const profile: ProfileType = {
    portfolio: [{
        coin,
        quantity: 1
    }],
    balanceUsd: 0,
    residualBalance: 0,
    initialBalance: 0
}

const state: InitialStateType = {
    profile,
    isInitializedProfile: false
}

describe('Tests actions Profile-reducer', () => {
    let action: ActionsTypes
    let newState: InitialStateType
    let dispatchMock: any
    let getStateMock: any
    beforeAll(() => {
        action = actions.setProfile(profile)
        newState = profileReducer(state, action)
        dispatchMock = jest.fn()
        getStateMock =  jest.fn()
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('SetProfile must work correctly', () => {
        expect(newState.profile.portfolio.length).toBe(1)
    })

    test('Coin of the portfolio must be correct', () => {
        expect(newState.profile.portfolio[0].coin).toEqual(coin)
    })

    test('Must be created new profile', async () => {
        const thunk = initializeProfile()
        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.initializedSuccess())
    })
})

