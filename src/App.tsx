import React, {useEffect} from 'react';
import './App.css';
import {withSuspense} from "./components/hoc/withSuspense";
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from "./redux/app-reducer";
import {getInitialized} from "./selectors/app-selectors";
import Preloader from "./components/common/Preloader/Preloader";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";

const MainLazy = React.lazy(() => import('./pages/Main/Main'))

const SuspendedMainPage = withSuspense(MainLazy)

const App: React.FC = (props) => {
    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<SuspendedMainPage/>}/>
            </Routes>
        </div>
    );
}

const StartApp: React.FC = () => {
    return <HashRouter>
        <Provider store = {store}>
            <App/>
        </Provider>
    </HashRouter>
}

export default StartApp;
