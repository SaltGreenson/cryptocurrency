import React from "react";
import {AssetsType} from "../../../../api/types-api";
import classes from './CoinElement.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAssetsByID} from "../../../../redux/assets-reducer";
import classNames from "classnames";

export const formatPrice = (value: number) => {
    let fraction = 2
    if (value < 0.1 && value > 0){
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

export const CoinElement: React.FC<{ coin: AssetsType }> = ({coin}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const onClick = (id: string) => {
        dispatch(setAssetsByID(id))
        navigate(`/:id=${id}`)
    }
    return <tr onClick={(e) => {onClick(coin.id)}}>
        <td>
            <p className={classes.number}>{coin.rank}</p>
            <span className={classes.hidden}>{coin.id}</span>
        </td>
        <td>
            <div className={classes.titleWrap}>
                <p className={classes.title}>{coin.name}</p>
                <p className={classes.symbol}>{coin.symbol}</p>
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