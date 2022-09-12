import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import appReducer from './app-reducer'
import marketsReducer from "./markets-reducer";
import assetsReducer from "./assets-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    markets: marketsReducer,
    assets: assetsReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
export type GenericThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

export default store
