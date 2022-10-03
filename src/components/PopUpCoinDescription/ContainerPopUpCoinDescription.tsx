import React, {useState} from "react"
import classes from './PopUpCoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatPercents, formatPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../selectors/profile-selectors";
import {addCoinToPortfolio, removeCoinFromPortfolio} from "../../redux/profile-reducer";
import {Link} from "react-router-dom";
import PopUpYesNo from "../common/PopUp/PopUpYesNo";
import Button from "../common/Styled/Button/Button";
import Input from "../common/Styled/Input/Input";
import Block from "../common/Styled/Block/Block";
import PopUpCoinDescription from "./PopUpCoinDescription";

type PropsTypes = {
    coin: AssetsType,
    setIsPopUpActive: (b: boolean) => void
    isAlreadyExistCoin: boolean,
}

export const convertQuantity = (quantity: number) => {
    const max = Math.pow(10, 9)
    return quantity > max ? max - 1 : quantity
}

const ContainerPopUpCoinDescription: React.FC<PropsTypes> = ({setIsPopUpActive, coin,...rest}) => {

    const [quantityCoin, setQuantityCoin] = useState<string>('0')
    const [totalPrice, setTotalPrice] = useState<string>('0')
    const [isAppend, setIsAppend] = useState<boolean>(true)
    const profile = useSelector(getProfile)
    const [hiddenInputValue, setHiddenInputValue] = useState<string>('false')
    const [popUpYesNoActive, setPopUpYesNoAction] = useState<boolean>(false)

    const portfolio = profile.portfolio
    const idx = portfolio.findIndex(existing => existing.coin.id === coin.id)

    const dispatch = useDispatch()


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

    const showQuantity = () => {
        return `${formatPercents(convertQuantity(+quantityCoin), 8)} ${coin.symbol}`
    }

    const onClickHandler = (isAdd: boolean) => {
        if (+quantityCoin <= 0) {
            return
        }
        setIsPopUpActive(false)
        setIsAppend(isAdd)
        setPopUpYesNoAction(true)
    }



    const changeTotalPrice = (quantity: number) => {
        const tP: number = coin.priceUsd * +quantity
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
        setQuantityCoin(String(incr))
    }


    const decrementQuantityCoin = () => {
        if (+quantityCoin > 0) {
            const decr = +quantityCoin - 1
            changeTotalPrice(decr)
            setQuantityCoin(String(decr))
        }
    }

    const hiddenInputSetValue= (text: string) => {
        setHiddenInputValue(text)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value
        setQuantityCoin(quantity)
        changeTotalPrice(+quantity)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onClickHandler(hiddenInputValue !== 'false')
    }


    return <> <PopUpCoinDescription coin={coin}
                                    quantityCoin={quantityCoin}
                                    totalPrice={totalPrice}
                                    decrementQuantityCoin={decrementQuantityCoin}
                                    incrementQuantityCoin={incrementQuantityCoin}
                                    hiddenInputValue={hiddenInputValue}
                                    existingCoinFromProfile={portfolio[idx]}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    hiddenInputSetValue={hiddenInputSetValue}
                                    {...rest}
    />

        <PopUpYesNo active={popUpYesNoActive}
                    setActive={setPopUpYesNoAction}
                    text={
                        `Are you sure you want to ${isAppend ? 'buy' : 'sell'} ${showQuantity()} (${formatPrice(+totalPrice, 10, 2)}) ${coin.name}?`
                    }
                    setAnswer={popUpAnswer}
        />
    </>
}

export default ContainerPopUpCoinDescription