import {AppStateType} from "../redux/redux-store"

export const getIsFetching = (state: AppStateType) => state.crypto.isFetching
// export const getAssets = (state: AppStateType) => state.crypto.assets