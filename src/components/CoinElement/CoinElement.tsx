import React, {useEffect} from "react";
import {AssetsType} from "../../api/types-api";
import classes from './CoinElement.module.css'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAssetByID} from "../../redux/assets-reducer";
import classNames from "classnames";
import Description from "../../pages/Description/Description";


const setMaxValue = (value: number, decimal: number): { value: number, isBigger: boolean } => {
    const max = Math.pow(10, decimal)
    let isBigger = false

    if (Math.abs(value) > max) {
        value = max - 1
        isBigger = true
    }

    return {
        value,
        isBigger
    }
}

export const formatPrice = (value: number, decimal: number = 13, fraction: number = 2) => {
    const maxValue = setMaxValue(value, decimal)
    value = maxValue.value

    if (value < 0.1 && value > 0) {
        fraction = 5
    }
    const formattedValue: string = new Intl.NumberFormat('USD', {
        currency: 'usd',
        style: 'currency',
        maximumFractionDigits: fraction,
    }).format(+value)

    return maxValue.isBigger ? `+${formattedValue}` : formattedValue
}

export const formatPercents = (value: number, fraction: number = 2, decimal: number = 5): string => {
    const maxValue = setMaxValue(value, decimal)
    value = maxValue.value

    const formattedValue: string = new Intl.NumberFormat('USD', {
        maximumFractionDigits: fraction,
        style: 'decimal'
    }).format(value)

    return maxValue.isBigger ? `+${formattedValue}` : formattedValue
}

type PropsTypes = {
    coin: AssetsType,
    alreadyInFavourite: (id: string) => boolean
    setIsPopUpActive: (active: boolean) => void,
    setSelectedCoin: (coin: AssetsType) => void,
    setIsAlreadyExistCoin: (isExist: boolean) => void
}

export const CoinElement: React.FC<PropsTypes> = ({
                                                      coin,
                                                      alreadyInFavourite,
                                                      setIsPopUpActive,
                                                      setSelectedCoin,
                                                      setIsAlreadyExistCoin
                                                  }) => {

    const onClick = (coin: AssetsType) => {
        setSelectedCoin(coin)
        setIsAlreadyExistCoin(alreadyInFavourite(coin.id))
        setIsPopUpActive(true)
    }

    return <tr>
        <td>
            <p className={classes.number}>{coin.rank}</p>
        </td>
        <td>
            <div className={classes.titleWrap}>
                <button
                    type="button"
                    className={alreadyInFavourite(coin.id) ? classes.alreadyFavourite : classes.favourite}
                    onClick={() => onClick(coin)}>
                        &#9733;
                </button>
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
            <p className={classNames(classes.number, classes.marketCap)}>{formatPercents(+coin.supply, 2, 15)} {coin.symbol}</p>
        </td>
        <td>
            <p className={classNames(classes.number, classes.marketCap)}>{formatPrice(+coin.marketCapUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatPrice(+coin.volumeUsd24Hr)}</p>
        </td>
    </tr>
}