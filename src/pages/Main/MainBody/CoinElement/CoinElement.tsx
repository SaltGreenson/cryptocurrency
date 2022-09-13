import React from "react";
import {AssetsType} from "../../../../api/types-api";
import classes from './CoinElement.module.css'

export const CoinElement: React.FC<{ coin: AssetsType }> = ({coin}) => {

    const formatNumber = (value: number) => {
        let fraction = 2
        if (value < 0.1){
            fraction = 5
        }
        return new Intl.NumberFormat('USD', {
            currency: 'usd',
            style: 'currency',
            maximumFractionDigits: fraction,
        }).format(+value)
    }

    return <tr>
        <td>
            {coin.rank}
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
}