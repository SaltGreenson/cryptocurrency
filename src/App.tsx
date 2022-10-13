import React, {FC, useEffect} from 'react';
import './App.module.css';
import {withSuspense} from "./components/utils/helpers/hocs-helper";
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp, setAssetsLimit, setAssetsOffsets} from "./redux/app-reducer";
import {getInitialized} from "./selectors/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import {setAssetsTop3} from "./redux/assets-reducer";
import classes from './App.module.css'
import NotFoundPage from "./pages/NotFound/NotFound";
import {getProfile} from "./selectors/profile-selectors";
import {ProfileType} from "./redux/profile-reducer";

const MainLazy = React.lazy(() => import('./pages/Main/Main'))
const DescriptionLazy = React.lazy(() => import('./pages/Description/Description'))
const ProfileLazy = React.lazy(() => import('./pages/Profile/Profile'))
const WithdrawLazy = React.lazy(() => import('./pages/Withdraw/Withdraw'))

const SuspendedMainPage = withSuspense(MainLazy)
const SuspendedDescription = withSuspense(DescriptionLazy)
const SuspendedProfile = withSuspense(ProfileLazy)
const SuspendedWithdraw = withSuspense(WithdrawLazy)

type PropsType = {
    profile: ProfileType
}

export const App: FC<PropsType> = ({profile}) => {

    return (
        <div className={classes.appContainer}>
            <Header profile={profile}/>
            <Routes>
                <Route path='/' element={<Navigate to='/coins/:page=1'/>}/>
                <Route path='/coins/:page' element={<SuspendedMainPage/>}/>
                <Route path='/:id' element={<SuspendedDescription/>}/>
                <Route path='/profile' element={<SuspendedProfile/>}/>
                <Route path='/withdraw' element={<SuspendedWithdraw/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

const StartApp: React.FC = () => {

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

    return <App profile={profile}/>
}

export default StartApp;
