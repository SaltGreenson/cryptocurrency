import {AppStateType} from "../redux/redux-store";

export const getInitialized = (state: AppStateType) => state.app.initialized
export const getIsFetching = (state: AppStateType) => state.app.isFetching