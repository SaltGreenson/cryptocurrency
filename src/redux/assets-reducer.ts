import {GenericThunkType, InferActionsTypes} from './redux-store'
import {AssetsHistoryType, AssetsMarket, AssetsType, ResponseType} from "../api/types-api";
import {assetsApi, IntervalEnum} from "../api/assets-api";
import {Dispatch} from "react";
import {actionsApp, ActionsAppTypes} from './app-reducer'

const SET_ASSETS = 'SET_ASSETS'
const SET_ASSETS_BY_ID = 'SET_ASSETS_BY_ID'
const SET_ASSETS_HISTORY_BY_ID = 'SET_ASSETS_HISTORY_BY_ID'
const SET_ASSETS_MARKETS_BY_ID = 'SET_ASSETS_MARKETS_BY_ID'

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
    }
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
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const assetsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case 'SET_ASSETS_BY_ID':
        case 'SET_ASSETS_HISTORY_BY_ID':
        case 'SET_ASSETS_MARKETS_BY_ID':
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

/*    NOTE: since the api does not provide the number of elements,
     you can use this code,
     but it will collect all the information,
     which greatly affects the initial loading of the page,
     but in the future there will be an instant receipt of information.  */


    // dispatch(actionsApp.setFetching(true))
    // let offset = 1
    // let response: ResponseType = await assetsApi.assets(offset, 2000)
    // const assets = {
    //     data: [...response.data],
    //     timestamp: response.timestamp
    // }
    // let rank = 1
    // while (response.data.length) {
    //     rank = response.data[response.data.length - 1].rank
    //     offset = rank
    //     dispatch(actionsApp.setLastRank(rank))
    //     response = await assetsApi.assets(offset, 300)
    //     assets.data.push(...response.data)
    //     assets.timestamp = response.timestamp
    // }
    // dispatch(actionsApp.setLastRank(rank))
    // dispatch(actions.setAssets(assets))
    // dispatch(actionsApp.setFetching(false))


    dispatch(actionsApp.setFetching(true))
    const response: ResponseType = await assetsApi.assets(offset, limit)
    dispatch(actions.setAssets(response))
    console.log(offset, limit)
    dispatch(actionsApp.setFetching(false))
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