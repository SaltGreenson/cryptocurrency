import React, {FormEvent, useEffect, useRef, useState} from "react"
import classes from './PopUpCoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {Button, InputNumber} from "../common/FormsControls/FormsControls";
import {FavouriteType} from "../Assets/Assets";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {addCoinToPortfolio, CoinInPortfolioType, removeCoinFromPortfolio} from "../../redux/profile-reducer";
import {Link} from "react-router-dom";
import PopUpYesNo from "../common/PopUp/PopUpYesNo";

type PropsTypes = {
    coin: AssetsType,
    setIsPopUpActive: (b: boolean) => void
    isAlreadyExistCoin: boolean,
    needRedirect?: boolean
}

const PopUpCoinDescription: React.FC<PropsTypes> = ({
                                                        coin,
                                                        setIsPopUpActive,
                                                        isAlreadyExistCoin,
                                                        needRedirect
                                                    }) => {

    const [quantityCoin, setQuantityCoin] = useState<string>('0')
    const [totalPrice, setTotalPrice] = useState<string>('0')
    const [isAppend, setIsAppend] = useState<boolean>(true)
    const portfolio = useSelector(getProfile).portfolio
    const idx = portfolio.findIndex(existing => existing.coin.id === coin.id)
    const [popUpYesNoActive, setPopUpYesNoAction] = useState<boolean>(false)

    const dispatch = useDispatch()

    const changeTotalPrice = (quantity: number) => {
        const tP: number = coin.priceUsd * +quantity
        const maxValue = Math.pow(10, 12)
        if (tP > maxValue) {
            setTotalPrice(String(maxValue - 1))
        } else {
            setTotalPrice(String(tP))
        }
    }



    const popUpAnswer = (answer: boolean) => {

        if (!answer) {
            setIsPopUpActive(true)
            return
        }

        if (isAppend) {
            dispatch(addCoinToPortfolio(coin, +quantityCoin))
        } else {
            dispatch(removeCoinFromPortfolio(coin, +quantityCoin))
        }
        setQuantityCoin('0')
        setTotalPrice('0')
    }



    const convertQuantity = (quantity: number) => {
        const max = Math.pow(10, 9)
        return quantity > max ? max - 1 : quantity
    }


    const incrementQuantityCoin = () => {
        const incr = +quantityCoin + 1
        changeTotalPrice(incr)
        setQuantityCoin(String(incr))
    }


    const decrementQuantityCoin = () => {
        if (+quantityCoin > 0) {
            const decr = +quantityCoin - 1
            changeTotalPrice(decr)
            setQuantityCoin(String(decr))
        }
    }


    const showExistQuantity = () => {
        return portfolio[idx] ? `${formatPercents(convertQuantity(portfolio[idx].quantity), 8)} ${portfolio[idx].coin.symbol}` : ''
    }

    const showQuantity = () => {
        return `${formatPercents(convertQuantity(+quantityCoin), 8)} ${coin.symbol}`
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value
        setQuantityCoin(quantity)
        changeTotalPrice(+quantity)
    }

    const onClick = (isAdd: boolean) => {
        if (+quantityCoin <= 0) {
            return
        }
        setIsPopUpActive(false)
        setIsAppend(isAdd)
        setPopUpYesNoAction(true)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onClick(true)
    }


    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol}>
                    {needRedirect
                        ?
                        <Link to={`/${coin.id}`}>{coin.symbol}</Link>
                        :
                        coin.symbol
                    }

                </span>
                <span className={classes.rank}>RANK #{coin.rank}</span>
                <span className={classes.price}>{formatPrice(coin.priceUsd)}</span>
            </div>
            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>24h%:</p>
                <span className={classes.supply}>{formatPercents(coin.changePercent24Hr)}%</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Circulating Supply:</p>
                <span className={classes.supply}>{formatPrice(coin.supply, 12, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Market cap:</p>
                <span className={classes.supply}>{formatPrice(coin.marketCapUsd, 12, 0)}</span>
            </div>

            <div className={classes.flexWrap}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Volume(24h):</p>
                <span className={classes.supply}>{formatPrice(coin.volumeUsd24Hr, 12, 0)}</span>
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
                    <p className={classes.totalPrice}>{formatPrice(+totalPrice, 10, 2)}
                    </p>
                </div>


            </div>
            {isAlreadyExistCoin ?
                <div className={classes.totalPriceWrap}>
                    <p className={classes.totalPriceTitle}>Own:</p>
                    <p className={classes.totalPrice}>
                        {showExistQuantity()}
                    </p>
                </div>
                : null
            }
            <div className={classNames(classes.btnWrap, isAlreadyExistCoin ? classes.twoBtnsWrap : null)}>
                <div className={classNames(isAlreadyExistCoin ? classes.smallBtn : classes.btn)}>

                    <Button type={"submit"} redColor={false} onClick={() => onClick(true)}
                            text={isAlreadyExistCoin ? "BUY" : "ADD TO PORTFOLIO"}/>

                </div>
                {isAlreadyExistCoin ?
                    <div className={classNames(isAlreadyExistCoin ? classes.smallBtn : classes.btn)}>

                        <Button type={"button"} text={"SELL"} onClick={() => onClick(false)} redColor={true}/>

                    </div> :
                    null}
            </div>
        </form>

        <PopUpYesNo active={popUpYesNoActive}
                    setActive={setPopUpYesNoAction}
                    text={
            `Are you sure you want to ${isAppend ? 'buy' : 'sell'} ${showQuantity()} (${formatPrice(+totalPrice, 10, 2)}) ${coin.name}?`
                    }
                    setAnswer={popUpAnswer}
        />

    </div>
}

export default PopUpCoinDescription