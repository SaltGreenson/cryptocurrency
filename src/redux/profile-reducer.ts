import {GenericThunkType, InferActionsTypes} from './redux-store'
import {setAssets, setAssetsTop3} from "./assets-reducer";
import {Dispatch} from "react";
import {assetsApi} from "../api/assets-api";
import {AssetsType, ResponseType} from "../api/types-api";
import {keys} from "../keys";
import {Runtime} from "inspector";

const INITIALIZED_PROFILE_SUCCESS = 'INITIALIZED_PROFILE_SUCCESS'
const SET_PROFILE = 'SET_PROFILE'

export type CoinInPortfolioType = {
    coin: AssetsType,
    quantity: number
}

export type ProfileType = {
    portfolio: Array<CoinInPortfolioType>,
    balanceUsd: number,
    initialBalance: number
}


const initialState = {
    profile: {
        portfolio: [],
        balanceUsd: 0,
        initialBalance: 0,
    } as ProfileType,
    isInitializedProfile: false
}


export const actions = {
    initializedSuccess: () => ({
        type: INITIALIZED_PROFILE_SUCCESS,
        payload: {isInitializedProfile: true}
    } as const),
    setProfile: (profile: any) => ({
        type: SET_PROFILE,
        payload: {profile}
    } as const)
}

export type InitialStateType = typeof initialState
export type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_PROFILE":
        case 'INITIALIZED_PROFILE_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            break
    }

    return state
}


export const initializeProfile = ():GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    let profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
    if (!profile) {
        const templateProfile = {
            portfolio: [],
            balanceUsd: 0,
            initialBalance: 0,
        }
        localStorage.setItem(keys.localStorageName, JSON.stringify(templateProfile))
        dispatch(actions.initializedSuccess())
        return
    }

    if (!profile.portfolio.length) {
        dispatch(actions.setProfile(profile))
        dispatch(actions.initializedSuccess())
        return
    }

    profile.balanceUsd = 0

    for (let i = 0; i < profile.portfolio.length; i++) {
        const response = await assetsApi.assetsById(profile.portfolio[i].coin.id)
        profile.balanceUsd += +(response.data.priceUsd * profile.portfolio[i].quantity)
        profile.portfolio[i].coin = response.data
    }


    localStorage.setItem(keys.localStorageName, JSON.stringify(profile))
    dispatch(actions.setProfile(profile))
    dispatch(actions.initializedSuccess())

}

export const addCoinToPortfolio = (coin: AssetsType, quantity: number) => (dispatch: Dispatch<ActionsTypes>) => {


    const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)

    const totalBalance = +(coin.priceUsd * +quantity)
    const idx = profile.portfolio.findIndex(po => po.coin.id === coin.id)
    const changeable = profile.portfolio[idx]

    if (idx !== -1) {
        changeable.quantity = +changeable.quantity +quantity
    } else {
        profile.portfolio.push({coin, quantity})
    }

    profile.balanceUsd += totalBalance
    profile.initialBalance += totalBalance

    dispatch(actions.setProfile(profile))
    localStorage.setItem(keys.localStorageName, JSON.stringify(profile))
}

export const removeCoinFromPortfolio = (coin: AssetsType, quantity: number) => (dispatch: Dispatch<ActionsTypes>) => {


    const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
    const idx = profile.portfolio.findIndex(po => po.coin.id === coin.id)
    const changeableCoin = profile.portfolio[idx]


    let finalBalance

    if (changeableCoin.quantity > quantity) {

        finalBalance = +(changeableCoin.coin.priceUsd * quantity)
        changeableCoin.quantity -= quantity

    } else {

        finalBalance = +(changeableCoin.coin.priceUsd * changeableCoin.quantity)
        profile.portfolio = profile.portfolio.filter(c => c.coin.id !== coin.id)

    }

    if (profile.balanceUsd >= profile.initialBalance) {

        profile.initialBalance = Math.abs(profile.initialBalance - finalBalance)

    } else {

        profile.initialBalance -= profile.balanceUsd

    }

    profile.balanceUsd -= finalBalance

    dispatch(actions.setProfile(profile))
    localStorage.setItem(keys.localStorageName, JSON.stringify(profile))
}

export default profileReducer