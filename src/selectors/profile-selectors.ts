import {AppStateType} from "../redux/redux-store";

export const getInitializedProfile = (state: AppStateType) => state.profile.isInitializedProfile
export const getProfile = (state: AppStateType) => state.profile.profile