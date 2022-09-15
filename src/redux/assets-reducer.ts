import {GenericThunkType, InferActionsTypes} from './redux-store'
import {AssetsHistoryType, AssetsMarket, AssetsType, ResponseType} from "../api/types-api";
import {assetsApi, IntervalEnum} from "../api/assets-api";
import {Dispatch} from "react";
import {actionsApp, ActionsAppTypes} from './app-reducer'

const SET_ASSETS = 'SET_ASSETS'
const SET_ASSETS_BY_ID = 'SET_ASSETS_BY_ID'
const SET_ASSETS_HISTORY_BY_ID = 'SET_ASSETS_HISTORY_BY_ID'
const SET_ASSETS_MARKETS_BY_ID = 'SET_ASSETS_MARKETS_BY_ID'
const SET_ASSETS_TOP_3 = 'SET_ASSETS_TOP_3'

export type AssetsTop3Type = {
    data: [{
        id: string,
        history: Array<AssetsHistoryType>,
        data: AssetsType
    }]
}
const initialState = {
    assets: {
        data: [] as Array<AssetsType>,
        timestamp: null as Date | null
    },
    assetsById: {
        data: {} as AssetsType,
        timestamp: null as Date | null
    },
    assetsHistoryById: {
        data: [] as Array<AssetsHistoryType>,
        timestamp: null as Date | null
    },
    assetsMarketsById: {
        data: [] as Array<AssetsMarket>,
        timestamp: null as Date | null
    },
    assetsTop3: {} as AssetsTop3Type | null
}

const actions = {
    setAssets: (assets: any) => ({
        type: SET_ASSETS,
        payload: {assets}
    } as const),
    setAssetsById: (assetsById: any) => ({
        type: SET_ASSETS_BY_ID,
        payload: {assetsById}
    } as const),
    setAssetsHistoryById: (assetsHistoryById: any) => ({
        type: SET_ASSETS_HISTORY_BY_ID,
        payload: {assetsHistoryById}
    } as const),
    setAssetsMarketsById: (assetsMarketsById: any) => ({
        type: SET_ASSETS_MARKETS_BY_ID,
        payload: {assetsMarketsById}
    } as const),
    setAssetsTop3Action: (assetsTop3: AssetsTop3Type) => ({
        type: SET_ASSETS_TOP_3,
        payload: {assetsTop3}
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>


const assetsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case 'SET_ASSETS_BY_ID':
        case 'SET_ASSETS_HISTORY_BY_ID':
        case 'SET_ASSETS_MARKETS_BY_ID':
        case "SET_ASSETS_TOP_3":
        case 'SET_ASSETS': {
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

export const setAssets = (offset: number, limit: number): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {

    if (!offset) {
        offset = 0
    }

    const response: ResponseType = await assetsApi.assets(offset, limit)
    dispatch(actions.setAssets(response))
}

export const setAssetsTop3 = (offset: number, limit: number, assets: Array<AssetsType>): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {

    if (!assets.length) {
        return
    }

    const assetsTop3 =  assets
            .sort((a, b) => a.rank - b.rank)
            .slice(0, 3)

    const promise = assetsTop3.map((e) => assetsApi.assetsHistoryById(e.id, IntervalEnum.m5))
    const histories: Array<ResponseType> = await Promise.all([...promise])

    const obj: AssetsTop3Type = {
        data: [{
            id: assetsTop3[0].id,
            history: [...histories[0].data],
            data: assetsTop3[0]
        }]
    }

    for (let i = 1; i < histories.length; i++) {
        obj.data.push({
            id: assetsTop3[i].id,
            history: [...histories[i].data],
            data: assetsTop3[i]
        })
    }

    dispatch(actions.setAssetsTop3Action(obj))
}

export const setAssetsByID = (id: string): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    dispatch(actionsApp.setFetching(true))
    const response: ResponseType = await assetsApi.assetsById(id)
    dispatch(actions.setAssetsById(response))
    dispatch(actionsApp.setFetching(false))
}

export const setAssetsHistoryById = (id: string, interval: IntervalEnum): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    dispatch(actionsApp.setFetching(true))
    let response: ResponseType = await assetsApi.assetsHistoryById(id, interval)
    dispatch(actions.setAssetsHistoryById(response))
    dispatch(actionsApp.setFetching(false))
}

export const setAssetsMarketsById = (id: string, limit: number = 10): GenericThunkType<ActionsTypes> => async (dispatch: Dispatch<ActionsTypes | ActionsAppTypes>) => {
    dispatch(actionsApp.setFetching(true))
    const response: ResponseType = await assetsApi.assetsMarketsById(id, limit)
    dispatch(actions.setAssetsMarketsById(response))
    dispatch(actionsApp.setFetching(false))
}

export default assetsReducer