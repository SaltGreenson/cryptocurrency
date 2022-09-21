import {AppStateType} from "../redux/redux-store";

export const getInitialized = (state: AppStateType): boolean => state.app.initialized
export const getIsFetching = (state: AppStateType): boolean => state.app.isFetching
export const getLastRank = (state: AppStateType): number => state.app.lastRank
export const getOffset = (state: AppStateType): number => state.app.offset
export const getLimit = (state: AppStateType): number => state.app.limit
export const getCurrentPage = (state: AppStateType): number => state.app.currentPage