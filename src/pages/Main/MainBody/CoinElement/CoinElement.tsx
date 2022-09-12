import React from "react";
import {AssetsType} from "../../../../api/types-api";
import classes from './CoinElement.module.css'

export const CoinElement: React.FC<{ coin: AssetsType, count: number }> = ({coin, count}) => {

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('USD', {
            currency: 'usd',
            style: 'currency',
            maximumFractionDigits: 2,
        }).format(+value)
    }

    return <tbody>
    <tr>
        <td>
            {count}
        </td>
        <td>
            <div className={classes.titleWrap}>
                <p className={classes.title}>{coin.name}</p>
                <p className={classes.symbol}>{coin.symbol}</p>
            </div>
        </td>
        <td>
            <p className={classes.number}>{formatNumber(+coin.priceUsd)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatNumber(+coin.changePercent24Hr)}</p>
        </td>
        <td>
            <p className={classes.number}>{formatNumber(+coin.marketCapUsd)}</p>

        </td>
        <td>
            <p className={classes.number}>{formatNumber(+coin.volumeUsd24Hr)}</p>

        </td>
    </tr>
    </tbody>
}