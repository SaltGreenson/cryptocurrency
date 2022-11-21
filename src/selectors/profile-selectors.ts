import { AppStateType } from '../redux/redux-store';
import { ProfileType } from '../redux/profileReducer/profileReducer';
export const getInitializedProfile = (state: AppStateType): boolean => state.profile.isInitializedProfile;

export const getProfile = (state: AppStateType): ProfileType => state.profile.profile;
