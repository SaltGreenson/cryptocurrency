import React, {FormEvent, useEffect, useState} from "react"
import classes from './CoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {Button, InputNumber} from "../common/FormsControls/FormsControls";
import {FavouriteType} from "../Assets/Assets";

type PropsTypes = {
    coin: AssetsType,
    setFavourites: (f: Array<FavouriteType>) => void,
    favourites: Array<FavouriteType>,
    setIsPopUpActive: (b: boolean) => void
}

const CoinDescription: React.FC<PropsTypes> = ({
                                                   coin,
                                                   setFavourites,
                                                   setIsPopUpActive,
                                                   favourites
                                               }) => {

    const [quantityCoin, setQuantityCoin] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<string>('0')

    const changeTotalPrice = (quantity: number) => {
        const tP: number = coin.priceUsd * quantity
        const maxValue = Math.pow(10, 12)
        if (tP > maxValue) {
            setTotalPrice(String(maxValue - 1))
        } else {
            setTotalPrice(String(tP))
        }
    }


    const incrementQuantityCoin = () => {
        const incr = +quantityCoin + 1
        changeTotalPrice(incr)
        setQuantityCoin(incr)
    }

    const decrementQuantityCoin = () => {
        if (+quantityCoin > 0) {
            const decr = +quantityCoin - 1
            changeTotalPrice(decr)
            setQuantityCoin(decr)
        }
    }

    const handleChange = (event: any) => {
        const quantity = event.target.value
        changeTotalPrice(quantity)
        setQuantityCoin(quantity)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (quantityCoin <= 0) {
            return
        }
        const element: FavouriteType = {
            coin,
            quantity: quantityCoin,
            totalPrice: +totalPrice
        }
        setFavourites([...favourites, element])
        setQuantityCoin(0)
        setTotalPrice('0')
        setIsPopUpActive(false)
    }

    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol}>{coin.symbol}</span>
                <span className={classes.rank}>RANK #{coin.rank}</span>
                <span className={classes.price}>{formatPrice(coin.priceUsd)}</span>
            </div>
            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>24h%:</p>
                <span className={classes.supply}>{formatPercents(coin.changePercent24Hr)}%</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Circulating Supply:</p>
                <span className={classes.supply}>{formatPrice(coin.supply, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Market cap:</p>
                <span className={classes.supply}>{formatPrice(coin.marketCapUsd, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Volume(24h):</p>
                <span className={classes.supply}>{formatPrice(coin.volumeUsd24Hr, 0)}</span>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className={classes.formInternalContainer}>
                <InputNumber name="quantitySigns"
                             value={quantityCoin}
                             increment={incrementQuantityCoin}
                             decrement={decrementQuantityCoin}
                             setValue={handleChange}
                             placeholder={coin.symbol}/>
                <div className={classes.totalPriceWrap}>
                    <p className={classes.totalPriceTitle}>Total:</p>
                    <p className={classes.totalPrice}>{formatPrice(+totalPrice, 2)}</p>
                </div>
            </div>
            <Button type={"submit"} text="ADD TO BACKPACK"/>
        </form>

    </div>
}

export default CoinDescription