import {AppStateType} from "../redux/redux-store";
import {ProfileType} from "../redux/profile-reducer";

export const getInitializedProfile = (state: AppStateType): boolean => state.profile.isInitializedProfile
export const getProfile = (state: AppStateType): ProfileType => state.profile.profile