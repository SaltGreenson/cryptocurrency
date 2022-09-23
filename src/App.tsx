import React, {useEffect} from 'react';
import {withSuspense} from "./components/hoc/withSuspense";
import {Provider, useDispatch, useSelector} from 'react-redux'
import {initializeApp, setAssetsLimit, setAssetsOffsets} from "./redux/app-reducer";
import {getInitialized} from "./selectors/app-selectors";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import store from "./redux/redux-store";
import {setAssetsTop3} from "./redux/assets-reducer";
import NotFoundPage from "./pages/NotFound/NotFound";
import {getProfile} from "./selectors/profile-selectors";
import styled from "styled-components";
import {Input} from "./components/Input/Input";
import Paragraph from "./components/Paragraph";

const MainLazy = React.lazy(() => import('./pages/Main/Main'))
const DescriptionLazy = React.lazy(() => import('./pages/Description/Description'))
const ProfileLazy = React.lazy(() => import('./pages/Profile/Profile'))
const WithdrawLazy = React.lazy(() => import('./pages/Withdraw/Withdraw'))

const SuspendedMainPage = withSuspense(MainLazy)
const SuspendedDescription = withSuspense(DescriptionLazy)
const SuspendedProfile = withSuspense(ProfileLazy)
const SuspendedWithdraw = withSuspense(WithdrawLazy)


const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.bgColor};
`

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

    // if (!initialized) {
    //     return <Preloader/>
    // }

    return (
        <AppWrapper>
            <Input.Number value={0} increment={() => {}} decrement={() => {}} setValue={(value: number) => {}}/>

            <div>
                {/*<Header profile={profile}/>*/}
                <Routes>
                    <Route path='/' element={<Navigate to='/coins/:page=1'/>}/>
                    <Route path='/coins/:page' element={<SuspendedMainPage/>}/>
                    <Route path='/:id' element={<SuspendedDescription/>}/>
                    <Route path='/profile' element={<SuspendedProfile/>}/>
                    <Route path='/withdraw' element={<SuspendedWithdraw/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </div>
        </AppWrapper>
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
