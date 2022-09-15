import React, {useEffect} from 'react';
import './App.css';
import {withSuspense} from "./components/hoc/withSuspense";
import {Provider, useDispatch, useSelector} from 'react-redux'
import {initializeApp, setAssetsLimit, setAssetsOffsets} from "./redux/app-reducer";
import {getInitialized} from "./selectors/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import store from "./redux/redux-store";
import Header from "./components/Header/Header";
import {getAssets} from "./selectors/assets-selectors";
import {setAssetsTop3} from "./redux/assets-reducer";

const MainLazy = React.lazy(() => import('./pages/Main/Main'))
const CoinDescrLazy = React.lazy(() => import('./pages/Main/Assets/CoinElement/CoinDescription/CoinDescription'))

const SuspendedMainPage = withSuspense(MainLazy)
const SuspendedCoinDescr = withSuspense(CoinDescrLazy)

const App: React.FC = (props) => {

    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)
    const assets = useSelector(getAssets)

    useEffect(() => {
        let offset = 0
        let limit = 50
        if (!assets.length) {
            dispatch(initializeApp(offset, limit))
        } else {
            dispatch(setAssetsOffsets(offset))
            dispatch(setAssetsLimit(limit))
            dispatch(setAssetsTop3(offset, limit, assets))
        }

    }, [assets])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins/:page' element={<SuspendedMainPage/>}/>
                <Route path='/:id' element={<SuspendedCoinDescr/>}/>
                <Route path='' element={<Navigate to='/coins/:page=1'/>}/>
            </Routes>
        </div>
    );
}

const StartApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
}

export default StartApp;
