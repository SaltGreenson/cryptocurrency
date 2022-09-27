import {GenericThunkType, InferActionsTypes} from './redux-store'
import {Dispatch} from "react";
import {assetsApi} from "../api/assets-api";
import {AssetsType} from "../api/types-api";
import {keys} from "../keys";

const INITIALIZED_PROFILE_SUCCESS = 'INITIALIZED_PROFILE_SUCCESS'
const SET_PROFILE = 'SET_PROFILE'

export type CoinInPortfolioType = {
    coin: AssetsType,
    quantity: number
}

export type ProfileType = {
    portfolio: Array<CoinInPortfolioType>,
    balanceUsd: number,
    initialBalance: number,
    residualBalance: number
}


const initialState = {
    profile: {
        portfolio: [],
        balanceUsd: 0,
        initialBalance: 0,
        residualBalance: 0
    } as ProfileType,
    isInitializedProfile: false
}


export const actions = {
    initializedSuccess: () => ({
        type: INITIALIZED_PROFILE_SUCCESS,
        payload: {isInitializedProfile: true}
    } as const),
    setProfile: (profile: ProfileType) => ({
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


export const initializeProfile = (): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    let profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
    if (!profile) {
        const templateProfile: ProfileType = {
            portfolio: [],
            balanceUsd: 0,
            initialBalance: 0,
            residualBalance: 0
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

    for (let i: number = 0; i < profile.portfolio.length; i++) {
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
    const idx: number = profile.portfolio.findIndex(po => po.coin.id === coin.id)
    const changeable: CoinInPortfolioType = profile.portfolio[idx]

    if (idx !== -1) {
        changeable.quantity = +changeable.quantity + quantity
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
    const idx: number = profile.portfolio.findIndex(po => po.coin.id === coin.id)
    const changeableCoin: CoinInPortfolioType = profile.portfolio[idx]


    let finalBalance

    if (changeableCoin.quantity > quantity) {

        finalBalance = +(changeableCoin.coin.priceUsd * quantity)
        changeableCoin.quantity -= quantity

    } else {

        finalBalance = +(changeableCoin.coin.priceUsd * changeableCoin.quantity)
        profile.portfolio = profile.portfolio.filter(c => c.coin.id !== coin.id)

    }

    if (profile.balanceUsd >= profile.initialBalance) {
        profile.residualBalance = Math.abs(profile.initialBalance - finalBalance)

    } else {
        profile.residualBalance -= Math.abs(profile.balanceUsd - profile.initialBalance)

    }

    profile.balanceUsd -= finalBalance
    profile.initialBalance = profile.balanceUsd

    dispatch(actions.setProfile(profile))
    localStorage.setItem(keys.localStorageName, JSON.stringify(profile))
}

export const withdraw = (amount: number) => (dispatch: Dispatch<ActionsTypes>) => {

    if (amount <= 0) {
        return
    }

    const profile: ProfileType = JSON.parse(localStorage.getItem(keys.localStorageName) as string)

    const balance: number = profile.residualBalance - amount

    if (balance >= 0) {
        profile.residualBalance = balance
        dispatch(actions.setProfile(profile))
        localStorage.setItem(keys.localStorageName, JSON.stringify(profile))
    }
}

export default profileReducer