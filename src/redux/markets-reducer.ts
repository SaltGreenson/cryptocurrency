import {GenericThunkType, InferActionsTypes} from './redux-store'
import {marketsApi} from "../api/markets-api";
import {MarketsType, ResponseDataType} from "../api/types-api";

const SET_MARKETS = 'SET_MARKETS'
const SET_FETCHING = 'SET_FETCHING'

const initialState  = {
    data: [] as Array<MarketsType>,
    isFetching: false
}

const actions = {
    setMarkets: (markets: ResponseDataType) => ({
        type: SET_MARKETS,
        payload: {markets}
    } as const),
    setFetching: (fetching: boolean) => ({
        type: SET_FETCHING,
        payload: {fetching}
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const marketsReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type){
        case "SET_FETCHING":
        case "SET_MARKETS": {
            return {
                ...state,
                ...actions.payload
            }
        }
        default:
            break
    }
    return state
}

export const collectMarkets = (): GenericThunkType<ActionsTypes> => async (dispatch) => {
    dispatch(actions.setFetching(true))
    const response: ResponseDataType = await marketsApi.markets()
    dispatch(actions.setMarkets(response))
    dispatch(actions.setFetching(false))
}

export default marketsReducer