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
import NotFoundPage from "./pages/NotFound/NotFound";
import {getProfile} from "./selectors/profile-selectors";

const MainLazy = React.lazy(() => import('./pages/Main/Main'))
const DescriptionLazy = React.lazy(() => import('./pages/Description/Description'))
const ProfileLazy = React.lazy(() => import('./pages/Profile/Profile'))


const SuspendedMainPage = withSuspense(MainLazy)
const SuspendedDescription = withSuspense(DescriptionLazy)
const SuspendedProfile = withSuspense(ProfileLazy)

const App: React.FC = (props) => {

    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)
    const profile = useSelector(getProfile)

    useEffect(() => {
        let offset = 0
        let limit = 50
        dispatch(setAssetsTop3())
        dispatch(setAssetsOffsets(offset))
        dispatch(setAssetsLimit(limit))
        dispatch(initializeApp(offset, limit))
    }, [initialized])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={classes.appContainer}>
            <Header profile={profile}/>
            <Routes>
                <Route path='/' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins/:page' element={<SuspendedMainPage/>}/>
                <Route path='/:id' element={<SuspendedDescription/>}/>
                <Route path='/profile' element={<SuspendedProfile/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
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
