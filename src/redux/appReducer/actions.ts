import {AppActionsTypes} from "./actionsTypes";

export const actionsApp = {
    isInitialized: (initialized: boolean) => ({
        type: AppActionsTypes.INITIALIZED_SUCCESS,
        payload: {initialized},
    } as const),
    setFetching: (isFetching: boolean) => ({
        type: AppActionsTypes.SET_FETCHING,
        payload: {isFetching},
    } as const),
    setOffset: (offset: number) => ({
        type: AppActionsTypes.SET_ASSETS_OFFSET,
        payload: {offset},
    } as const),
    setLimit: (limit: number) => ({
        type: AppActionsTypes.SET_ASSETS_LIMIT,
        payload: {limit},
    } as const),
    setLastRank: (lastRank: number) => ({
        type: AppActionsTypes.SET_ASSETS_LAST_RANK,
        payload: {lastRank},
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: AppActionsTypes.SET_APP_CURRENT_PAGE,
        payload: {currentPage},
    } as const),
};

interface IsInitializedActionType {
    type: AppActionsTypes.INITIALIZED_SUCCESS,
    payload: { initialized: boolean }
}

interface SetFetchingActionType {
    type: AppActionsTypes.SET_FETCHING,
    payload: { isFetching: boolean }
}

interface SetOffsetActionType {
    type: AppActionsTypes.SET_ASSETS_OFFSET,
    payload: { offset: number }
}

interface SetLimitActionType {
    type: AppActionsTypes.SET_ASSETS_LIMIT,
    payload: { limit: number }
}

interface SetLastRankActionType {
    type: AppActionsTypes.SET_ASSETS_LAST_RANK,
    payload: { lastRank: number }
}

interface SetCurrentPageActionType {
    type: AppActionsTypes.SET_APP_CURRENT_PAGE,
    payload: { currentPage: number }
}

export type AppActionsType = IsInitializedActionType |
    SetFetchingActionType |
    SetOffsetActionType |
    SetLimitActionType |
    SetLastRankActionType |
    SetCurrentPageActionType