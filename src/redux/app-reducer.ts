import {GenericThunkType, InferActionsTypes} from './redux-store'
import {setAssets} from "./assets-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SET_FETCHING = 'SET_FETCHING'

const initialState = {
    initialized: false,
    isFetching: false
}

export type InitialStateType = typeof initialState
export type ActionsAppTypes = InferActionsTypes<typeof actionsApp>

export const actionsApp = {
    initializedSuccess: () => ({
        type: INITIALIZED_SUCCESS
    } as const),
    setFetching: (isFetching: boolean) => ({
        type: SET_FETCHING,
        payload: {isFetching}
    } as const)
}

const appReducer = (state = initialState, action: ActionsAppTypes): InitialStateType => {
    switch (action.type) {
        case "SET_FETCHING":
        case "INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            break
    }

    return state
}

export const initializeApp = (): GenericThunkType<ActionsAppTypes> => async (dispatch) => {
    dispatch(actionsApp.setFetching(true))
    await dispatch(setAssets())
    dispatch(actionsApp.initializedSuccess())
    dispatch(actionsApp.setFetching(false))
}

export default appReducer