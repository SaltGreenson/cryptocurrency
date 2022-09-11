import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {collectCryptocurrencies} from "../../redux/crypto-reducer";

const MainPage: React.FC = (props) => {
    return <div>
        <Main/>
    </div>
}

const Main: React.FC = (props) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(collectCryptocurrencies())
    }, [])
    return <div>
        Main
    </div>
}

export default MainPage