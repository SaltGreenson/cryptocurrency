import { AppStateType } from '../redux/redux-store';
import { ProfileType } from '../redux/profile-reducer';

// @ts-ignore
export const getInitializedProfile = (state: AppStateType): boolean => state.profile.isInitializedProfile;

// @ts-ignore
export const getProfile = (state: AppStateType): ProfileType => state.profile.profile;
