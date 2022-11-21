import {
  Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore,
} from 'redux';
import thunkMiddleWare, { ThunkDispatch } from 'redux-thunk';
import {appReducer} from './appReducer/appReducer';
import {marketsReducer} from './marketsReducer/marketsReducer';
import {assetsReducer} from './assetsReducer/assetsReducer';
import {profileReducer} from './profileReducer/profileReducer';

const rootReducer = combineReducers({
  app: appReducer,
  markets: marketsReducer,
  assets: assetsReducer,
  profile: profileReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type InferActionsTypes<T> = T extends { [keys: string]
  // eslint-disable-next-line no-unused-vars
      : (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export type ThunkAction<
    R,
    S,
    E,
    A extends Action
    > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type GenericThunkType
    <AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

export type RootState = ReturnType<typeof store.getState>

export default store;
