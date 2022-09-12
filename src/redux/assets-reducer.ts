import {GenericThunkType, InferActionsTypes} from './redux-store'
import {AssetsHistoryType, AssetsMarket, AssetsType} from "../api/types-api";
import {assetsApi, IntervalEnum} from "../api/assets-api";
import {Dispatch} from "react";

const SET_ASSETS = 'SET_ASSETS'
const SET_FETCHING = 'SET_FETCHING'
const SET_ASSETS_BY_ID = 'SET_ASSETS_BY_ID'
const SET_ASSETS_HISTORY_BY_ID = 'SET_ASSETS_HISTORY_BY_ID'
const SET_ASSETS_MARKETS_BY_ID = 'SET_ASSETS_MARKETS_BY_ID'

const initialState = {
    assets: [] as Array<AssetsType>,
    isFetching: false,
    assetsById: {} as AssetsType,
    assetsHistoryById: [] as Array<AssetsHistoryType>,
    assetsMarketsById: [] as Array<AssetsMarket>
}

const actions = {
    setFetching: (isFetching: boolean) => ({
        type: SET_FETCHING,
        payload: {isFetching}
    } as const),
    setAssets: (assets: Array<AssetsType>) => ({
        type: SET_ASSETS,
        payload: {assets}
    } as const),
    setAssetsById: (assetsById: AssetsType) => ({
        type: SET_ASSETS_BY_ID,
        payload: {assetsById}
    } as const),
    setAssetsHistoryById: (assetsHistoryById: Array<AssetsHistoryType>) => ({
        type: SET_ASSETS_HISTORY_BY_ID,
        payload: {assetsHistoryById}
    } as const),
    setAssetsMarketsById: (assetsMarketsById: Array<AssetsMarket>) => ({
        type: SET_ASSETS_MARKETS_BY_ID,
        payload: {assetsMarketsById}
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const assetsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case "SET_FETCHING":
        case "SET_ASSETS_BY_ID":
        case "SET_ASSETS_HISTORY_BY_ID":
        case "SET_ASSETS_MARKETS_BY_ID":
        case "SET_ASSETS": {
            return {
                ...state,
                ...actions.payload
            }
        }
        default:
            break
    }
    return state
}

export const setAssets = (): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setFetching(true))
    const response: Array<AssetsType> = await assetsApi.assets()
    dispatch(actions.setAssets(response))
    dispatch(actions.setFetching(false))
}

export const setAssetsByID = (id: string): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setFetching(true))
    const response: AssetsType = await assetsApi.assetsById(id)
    dispatch(actions.setAssetsById(response))
    dispatch(actions.setFetching(false))
}

export const setAssetsHistoryById = (id: string, interval: IntervalEnum): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setFetching(true))
    const response: Array<AssetsHistoryType> = await assetsApi.assetsHistoryById(id, interval)
    dispatch(actions.setAssetsHistoryById(response))
    dispatch(actions.setFetching(false))
}

export const setAssetsMarketsById = (id: string, limit: number = 10): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(actions.setFetching(true))
    const response: Array<AssetsMarket> = await assetsApi.assetsMarketsById(id, limit)
    dispatch(actions.setAssetsMarketsById(response))
    dispatch(actions.setFetching(false))
}

export default assetsReducer