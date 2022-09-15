import React, {useEffect} from 'react';
import './App.module.css';
import {withSuspense} from "./components/hoc/withSuspense";
import {Provider, useDispatch, useSelector} from 'react-redux'
import {initializeApp, setAssetsLimit, setAssetsOffsets} from "./redux/app-reducer";
import {getInitialized} from "./selectors/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import store from "./redux/redux-store";
import Header from "./components/Header/Header";
import {setAssetsTop3} from "./redux/assets-reducer";
import classes from './App.module.css'

const MainLazy = React.lazy(() => import('./pages/Main/Main'))
const SuspendedDescriptionLazy = React.lazy(() => import('./pages/Description/Description'))

const SuspendedMainPage = withSuspense(MainLazy)
const SuspendedDescription = withSuspense(SuspendedDescriptionLazy)

const App: React.FC = (props) => {

    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)

    useEffect(() => {
        let offset = 0
        let limit = 50
        dispatch(setAssetsOffsets(offset))
        dispatch(setAssetsLimit(limit))
        dispatch(initializeApp(offset, limit))
        dispatch(setAssetsTop3())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={classes.appContainer}>
            <Header/>
            <Routes>
                <Route path='/' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins/:page' element={<SuspendedMainPage/>}/>
                <Route path='/:id' element={<SuspendedDescription/>}/>
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
