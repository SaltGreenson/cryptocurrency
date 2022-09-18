import React, {FormEvent, useEffect, useState} from "react"
import classes from './PopUpCoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {Button, InputNumber} from "../common/FormsControls/FormsControls";
import {FavouriteType} from "../Assets/Assets";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {addCoinToPortfolio, CoinInPortfolioType, removeCoinFromPortfolio} from "../../redux/profile-reducer";

type PropsTypes = {
    coin: AssetsType,
    setIsPopUpActive: (b: boolean) => void
    isAlreadyExistCoin: boolean
}

const PopUpCoinDescription: React.FC<PropsTypes> = ({
                                                        coin,
                                                        setIsPopUpActive,
                                                        isAlreadyExistCoin
                                                    }) => {

    const [quantityCoin, setQuantityCoin] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<string>('0')
    const portfolio = useSelector(getProfile).portfolio
    const [existCoin, setExistCoin] = useState<CoinInPortfolioType>(portfolio[0])

    useEffect(() => {
        if (isAlreadyExistCoin) {
            const idx = portfolio.findIndex(existing => existing.coin.id === coin.id)
            setExistCoin(portfolio[idx])
        }

    })

    const dispatch = useDispatch()

    const changeTotalPrice = (quantity: number) => {
        const tP: number = coin.priceUsd * quantity
        const maxValue = Math.pow(10, 12)
        if (tP > maxValue) {
            setTotalPrice(String(maxValue - 1))
        } else {
            setTotalPrice(String(tP))
        }
    }

    const deleteCoinFromPortfolio = () => {
        if (quantityCoin <= 0) {
            return
        }
        dispatch(removeCoinFromPortfolio(coin, quantityCoin))
        setQuantityCoin(0)
        setTotalPrice('0')
        setIsPopUpActive(false)
    }

    const appendPortfolio = () => {
        if (quantityCoin <= 0) {
            return
        }
        dispatch(addCoinToPortfolio(coin, quantityCoin))
        setQuantityCoin(0)
        setTotalPrice('0')
        setIsPopUpActive(false)
    }

    const convertQuantity = (quantity: number) => {
        const max = Math.pow(10, 9)
        return quantity > max ? max - 1 : quantity
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

    const showQuantity = () => {
        return existCoin ? `${formatPercents(convertQuantity(existCoin.quantity), 8)} ${existCoin.coin.symbol}` : ''
    }

    const showLittlePrice = (price: number) => {
        const max = Math.pow(10, 5)
        return max <= price ? max - 1 : price
    }

    const handleChange = (event: any) => {
        const quantity = event.target.value
        changeTotalPrice(quantity)
        setQuantityCoin(quantity)
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

        <div className={classes.formInternalContainer}>
            <InputNumber name="quantitySigns"
                         value={quantityCoin}
                         increment={incrementQuantityCoin}
                         decrement={decrementQuantityCoin}
                         setValue={handleChange}
                         placeholder={coin.symbol}/>
            <div className={classes.totalPriceWrap}>
                <p className={classes.totalPriceTitle}>Total:</p>

                <p className={classes.totalPrice}>{isAlreadyExistCoin ?
                    `${formatPrice(showLittlePrice(existCoin.quantity * existCoin.coin.priceUsd), 2)} (${showQuantity()})`  :
                    formatPrice(+totalPrice, 2)}
                </p>

            </div>
        </div>

        <div className={classNames(classes.btnWrap, isAlreadyExistCoin ? classes.twoBtnsWrap : null)}>
            <div className={classNames(isAlreadyExistCoin ? classes.smallBtn : classes.btn)}>
                <Button type={"button"} redColor={false} onClick={appendPortfolio}
                        text={isAlreadyExistCoin ? "BUY" : "ADD TO PORTFOLIO"}/>
            </div>
            {isAlreadyExistCoin ?
                <div className={classNames(isAlreadyExistCoin ? classes.smallBtn : classes.btn)}>
                    <Button type={"button"} text={"SELL"} onClick={deleteCoinFromPortfolio} redColor={true}/>
                </div> :
                null}
        </div>

    </div>
}

export default PopUpCoinDescription