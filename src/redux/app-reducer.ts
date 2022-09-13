import {GenericThunkType, InferActionsTypes} from './redux-store'
import {setAssets} from "./assets-reducer";
import {Dispatch} from "react";
import {assetsApi} from "../api/assets-api";
import {ResponseType} from "../api/types-api";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SET_FETCHING = 'SET_FETCHING'
const SET_ASSETS_OFFSET= 'SET_ASSETS_OFFSET'
const SET_ASSETS_LIMIT= 'SET_ASSETS_LIMIT'
const SET_ASSETS_LAST_RANK = 'SET_ASSETS_LAST_RANK'
const SET_APP_CURRENT_PAGE = 'SET_APP_CURRENT_PAGE'

const initialState = {
    initialized: false,
    isFetching: false,
    offset: 0,
    limit: 0,
    lastRank: 0,
    currentPage: 1
}

export type InitialStateType = typeof initialState
export type ActionsAppTypes = InferActionsTypes<typeof actionsApp>

export const actionsApp = {
    isInitialized: (initialized: any) => ({
        type: INITIALIZED_SUCCESS,
        payload: {initialized}
    } as const),
    setFetching: (isFetching: any) => ({
        type: SET_FETCHING,
        payload: {isFetching}
    } as const),
    setOffset: (offset: number) => ({
        type: SET_ASSETS_OFFSET,
        payload: {offset}
    } as const),
    setLimit: (limit: number) => ({
        type: SET_ASSETS_LIMIT,
        payload: {limit}
    } as const),
    setLastRank: (lastRank: number) => ({
        type: SET_ASSETS_LAST_RANK,
        payload: {lastRank}
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: SET_APP_CURRENT_PAGE,
        payload: {currentPage}
    } as const)
}

const appReducer = (state = initialState, action: ActionsAppTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_ASSETS_OFFSET':
        case 'SET_ASSETS_LIMIT':
        case "SET_FETCHING":
        case "SET_ASSETS_LAST_RANK":
        case "SET_APP_CURRENT_PAGE":
        case "INITIALIZED_SUCCESS": {
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

export const setAppCurrentPage = (currentPage: number) => (dispatch: Dispatch<ActionsAppTypes>) => {
    dispatch(actionsApp.setCurrentPage(currentPage))
}

export const setAssetsLastRank = (): GenericThunkType<ActionsAppTypes> => async (dispatch: Dispatch<ActionsAppTypes>) => {
    dispatch(actionsApp.setLastRank(2295))

    // the api does not give the last rank, it works, but for a long time

    // let offset = 1
    // let response: ResponseType = await assetsApi.assets(offset, 2000)
    // while (response.data.length) {
    //     let rank = response.data[response.data.length - 1]?.rank
    //     offset = rank
    //     dispatch(actionsApp.setLastRank(rank))
    //     response = await assetsApi.assets(offset, 300)
    // }
}

export const setAssetsOffsets = (offset: number): GenericThunkType<ActionsAppTypes> => async (dispatch: Dispatch<ActionsAppTypes >) => {
    dispatch(actionsApp.setOffset(offset))
}

export const setAssetsLimit = (limit: number): GenericThunkType<ActionsAppTypes> => async (dispatch: Dispatch<ActionsAppTypes >) => {
    dispatch(actionsApp.setLimit(limit))
}

export const initializeApp = (offset: number, limit: number): GenericThunkType<ActionsAppTypes> => async (dispatch) => {
    dispatch(actionsApp.setFetching(true))
    await dispatch(setAssets(offset, limit))
    await dispatch(setAssetsLastRank())
    dispatch(actionsApp.isInitialized(true))
    dispatch(actionsApp.setFetching(false))
}

export default appReducer