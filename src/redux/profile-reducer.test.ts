import profileReducer, {
    actions,
    ActionsTypes,
    addCoinToPortfolio, clearProfile,
    InitialStateType,
    ProfileType, removeCoinFromPortfolio
} from "./profile-reducer";
import {AssetsType} from "../api/types-api";
import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import thunkMiddleWare from "redux-thunk";

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
    let store: any
    let localProfile: ProfileType
    beforeAll(() => {
        action = actions.setProfile(profile)
        newState = profileReducer(state, action)
        store = createStore(profileReducer, applyMiddleware(thunkMiddleWare))
    })

    afterEach(() => {
        store.dispatch(clearProfile())
    })

    test('SetProfile must work correctly', () => {
        expect(newState.profile.portfolio.length).toBe(1)
    })

    test('Coin of the portfolio must be correct', () => {
        expect(newState.profile.portfolio[0].coin).toEqual(coin)
    })

    test('The coin must be added to portfolio', () => {
        store.dispatch(addCoinToPortfolio(coin, 10) as unknown as ActionsTypes)
        localProfile = store.getState().profile
        expect(localProfile.portfolio.length).toBe(1)
    })

    test('The coin must be removed from portfolio', () => {
        store.dispatch(addCoinToPortfolio(coin, 3) as unknown as ActionsTypes)
        store.dispatch(removeCoinFromPortfolio(coin, 4) as unknown as ActionsTypes)
        localProfile = store.getState().profile
        expect(localProfile.portfolio.length).toBe(0)
    })

    test('There must be one coin in the profile', () => {
        store.dispatch(addCoinToPortfolio(coin, 3) as unknown as ActionsTypes)
        store.dispatch(removeCoinFromPortfolio(coin, 2) as unknown as ActionsTypes)
        localProfile = store.getState().profile
        expect(localProfile.portfolio.length).toBe(1)
    })

    afterEach(() => {

    })
})

