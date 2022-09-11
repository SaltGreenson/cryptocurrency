import {GenericThunkType, InferActionsTypes} from './redux-store'
import {CryptoResponseDataType, mainApi, MarketCryptoType} from "../api/main-api";

const GET_CRYPTOCURRENCY = 'GET_CRYPTOCURRENCY'

const initialState  = {
    data: [] as Array<MarketCryptoType>,
    timestamp: null as Date | null
}

const actions = {
    setCryptocurrency: (cryptocurrency: CryptoResponseDataType) => ({
        type: GET_CRYPTOCURRENCY,
        payload: {cryptocurrency}
    } as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const cryptoReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type){
        case "GET_CRYPTOCURRENCY": {
            return {
                ...state,
                ...actions.payload
            }
        }
    }
    return state
}

export const collectCryptocurrencies = (): GenericThunkType<ActionsType> => async (dispatch) => {
    const response: CryptoResponseDataType = await mainApi.market()
    dispatch(actions.setCryptocurrency(response))
}

export default cryptoReducer