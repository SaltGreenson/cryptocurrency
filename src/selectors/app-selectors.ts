import {AppStateType} from "../redux/redux-store";

export const getInitialized = (state: AppStateType) => state.app.initialized
export const getIsFetching = (state: AppStateType) => state.app.isFetching
export const getLastRank = (state: AppStateType) => state.app.lastRank
export const getOffset = (state: AppStateType) => state.app.offset
export const getLimit = (state: AppStateType) => state.app.limit
export const getCurrentPage = (state: AppStateType) => state.app.currentPage