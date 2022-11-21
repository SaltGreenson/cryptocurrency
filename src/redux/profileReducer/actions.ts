import {ProfileActionsTypes} from "./actionsTypes";
import {ProfileType} from "./profileReducer";

export const actions = {
    initializedSuccess: () => ({
        type: ProfileActionsTypes.INITIALIZED_PROFILE_SUCCESS,
        payload: {isInitializedProfile: true},
    } as const),
    setProfile: (profile: ProfileType) => ({
        type: ProfileActionsTypes.SET_PROFILE,
        payload: {profile},
    } as const),
};

interface InitializedSuccessActionTypes {
    type: ProfileActionsTypes.INITIALIZED_PROFILE_SUCCESS,
    payload: { isInitializedProfile: true }
}

interface SetProfileActionTypes {
    type: ProfileActionsTypes.SET_PROFILE,
    payload: { profile: ProfileType }
}

export type ActionsTypes = InitializedSuccessActionTypes |
    SetProfileActionTypes