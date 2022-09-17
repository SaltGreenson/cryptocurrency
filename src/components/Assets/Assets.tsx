import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAssets, getTop3Assets} from "../../selectors/assets-selectors";
import {CoinElement} from "../CoinElement/CoinElement";
import classes from './Assets.module.css'
import Paginator from "../Paginator/Paginator";
import {getCurrentPage, getLastRank, getLimit} from "../../selectors/app-selectors";
import {setAssets} from "../../redux/assets-reducer";
import {Params, useNavigate, useParams} from "react-router-dom";
import {setAppCurrentPage} from "../../redux/app-reducer";
import Card from "../Card/Card";
import {AssetsType} from "../../api/types-api";
import PopUp from "../common/PopUp/PopUp";
import CoinDescription from "../CoinDescription/CoinDescription";
import {keys} from "../../keys";
import PopUpYesNo from "../common/PopUp/PopUpYesNo";

export const getValueFromParams = (params: string) => {
    return params.split('=')[1]
}

export type FavouriteType = {
    coin: AssetsType,
    quantity: number,
    totalPrice: number
}

export const Assets: React.FC = () => {


    const assets = useSelector(getAssets)
    const limit = useSelector(getLimit)
    const currentPage = useSelector(getCurrentPage)
    const dispatch = useDispatch()

    const params: Readonly<Params<string>> = useParams()
    const page: number = +getValueFromParams(params.page as string)

    const state = JSON.parse(localStorage.getItem(keys.localStorageName) as string)
    const [favourites, setFavourites] = useState<Array<FavouriteType>>(state ? state : [])

    const [isPopUpActive, setIsPopUpActive] = useState(false)
    const [selectedCoin, setSelectedCoin] = useState<AssetsType>({} as AssetsType)

    const [pageFromParams, setPageFromParams] = useState<number>(page ? page : 1)


    const alreadyInFavourite = (coinId: string) => {
        return favourites ? favourites.some(f => f.coin.id === coinId) : false
    }

    const addToFavourite = (coin: AssetsType): boolean => {
        let was = false
        if (alreadyInFavourite(coin.id)) {
            setFavourites(favourites.filter(j => j.coin.id !== coin.id))
            was = true
        } else {
            setPopUpActive(coin)
        }
        return was
    }

    useEffect(() => {
        localStorage.setItem(keys.localStorageName, JSON.stringify(favourites))
    }, [favourites])

    useEffect(() => {
        if (pageFromParams && pageFromParams === +pageFromParams) {
            if (pageFromParams !== currentPage) {
                dispatch(setAppCurrentPage(pageFromParams))
                dispatch(setAssets(pageFromParams * limit - limit, limit))
            }
        }
    }, [pageFromParams])

    const setPopUpActive = (coin: AssetsType) => {
        setIsPopUpActive(true)
        setSelectedCoin(coin)
    }

    return <div className={classes.container}>
        <div className={classes.tableWrap}>
            <table>
                <thead className={classes.theadStyle}>
                <tr className={classes.headerTable}>

                    <th>#</th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h%</th>
                    <th>Market cap</th>
                    <th>Volume(24h)</th>
                </tr>
                </thead>
                <tbody>
                {assets.map((coin) => <CoinElement key={coin.id}
                                                   addToFavourite={addToFavourite}
                                                   coin={coin}
                                                   alreadyInFavourite={alreadyInFavourite}/>)}
                </tbody>
            </table>
        </div>
        <PopUpYesNo text="Do you want to create your portfolio?"
                    active={isPopUpActive}
                    setActive={setIsPopUpActive}
                    setAnswer={(b: boolean) => {}}/>

        {/*<PopUp active={isPopUpActive} setActive={setIsPopUpActive}>*/}
        {/*    <CoinDescription coin={selectedCoin}*/}
        {/*                     setFavourites={setFavourites}*/}
        {/*                     favourites={favourites}*/}
        {/*                     setIsPopUpActive={setIsPopUpActive}*/}
        {/*    />*/}
        {/*</PopUp>*/}
    </div>
}