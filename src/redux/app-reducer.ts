import {GenericThunkType, InferActionsTypes} from './redux-store'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({
        type: INITIALIZED_SUCCESS
    } as const)
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
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

export const initializeApp = () => (dispatch: any) => {
    dispatch(actions.initializedSuccess())
}

export default appReducer