import React, {useEffect, useState} from "react";
import {AssetsType} from "../../api/types-api";
import classes from './CoinElement.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAssetsByID} from "../../redux/assets-reducer";
import classNames from "classnames";
import {FavouriteType} from "../CoinDescription/CoinDescription";

export const formatPrice = (value: number, fraction: number = 2) => {
    if (value < 0.1 && value > 0) {
        fraction = 5
    }
    return new Intl.NumberFormat('USD', {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: fraction,
    }).format(+value)
}

export const formatPercents = (value: number) => {
    return new Intl.NumberFormat('USD', {
        maximumFractionDigits: 2,
        style: 'decimal'
    }).format(value)
}

type PropsTypes = {
    setPopUpActive: (coin: AssetsType) => void,
    coin: AssetsType,
    alreadyInFavourite: (id: string) => boolean,
    currentFavouriteClass: string,
    setCurrentFavouriteClass: (curClass:string) => void
}

export const CoinElement: React.FC<PropsTypes> = ({
                                                      coin,
                                                      currentFavouriteClass,
                                                      alreadyInFavourite,
                                                      setPopUpActive,
                                                      setCurrentFavouriteClass
                                                  }) => {

    const dispatch = useDispatch()


    const onClick = (id: string) => {
        dispatch(setAssetsByID(id))
    }


    useEffect(() => {
        if (alreadyInFavourite(coin.id)) {
            setCurrentFavouriteClass(classes.alreadyFavourite)
        }
    }, [])



    return <tr>
        <td>
            <p className={classes.number}>{coin.rank}</p>
        </td>
        <td>
            <p className={currentFavouriteClass} onClick={() => setPopUpActive(coin)}>&#10017;</p>
        </td>
        <td>
            <div className={classes.titleWrap} onClick={(e) => {
                onClick(coin.id)
            }}>
                <Link to={`/:id=${coin.id}`} className={classes.title}>{coin.name}</Link>
                <Link to={`/:id=${coin.id}`} className={classes.symbol}>{coin.symbol}</Link>
            </div>
        </td>
        <td>
            <p className={classes.number}>{formatPrice(+coin.priceUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatPercents(+coin.changePercent24Hr)}</p>
        </td>
        <td>
            <p className={classNames(classes.number, classes.marketCap)}>{formatPrice(+coin.marketCapUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatPrice(+coin.volumeUsd24Hr)}</p>
        </td>
    </tr>
}