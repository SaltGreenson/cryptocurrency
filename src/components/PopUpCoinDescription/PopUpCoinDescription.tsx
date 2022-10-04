import React from "react"
import classes from './PopUpCoinDescription.module.css'
import {AssetsType} from "../../api/types-api";
import {formatNumbersToPrettyStyle, formatNumberToPrice} from "../CoinElement/CoinElement";
import classNames from "classnames";
import {CoinInPortfolioType} from "../../redux/profile-reducer";
import Button from "../common/Styled/Button/Button";
import Input from "../common/Styled/Input/Input";
import Block from "../common/Styled/Block/Block";
import {convertQuantity} from "./ContainerPopUpCoinDescription";

type PropsTypes = {
    coin: AssetsType,
    isAlreadyExistCoin: boolean,
    quantityCoin: string,
    totalPrice: string,
    existingCoinFromProfile: CoinInPortfolioType,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    hiddenInputValue: string,
    incrementQuantityCoin: () => void,
    decrementQuantityCoin: () => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    hiddenInputSetValue: (value: string) => void

}

const PopUpCoinDescription: React.FC<PropsTypes> = ({
                                                        coin,
                                                        isAlreadyExistCoin,
                                                        quantityCoin,
                                                        totalPrice,
                                                        existingCoinFromProfile,
                                                        handleSubmit,
                                                        hiddenInputValue,
                                                        incrementQuantityCoin,
                                                        decrementQuantityCoin,
                                                        handleChange,
                                                        hiddenInputSetValue
                                                    }) => {


    const showExistQuantity = () => {
        return existingCoinFromProfile ? `${formatNumbersToPrettyStyle(convertQuantity(existingCoinFromProfile.quantity), 8)} ${existingCoinFromProfile.coin.symbol}` : ''
    }

    return <div className={classes.container}>
        <div className={classes.cardWrap}>
            <div className={classes.titleWrap}>
                <span className={classes.symbol}>
                        {coin.symbol}
                </span>
                <span className={classes.rank}>RANK #{coin.rank}</span>
                <span className={classes.price}>{formatNumberToPrice(coin.priceUsd)}</span>
            </div>

            <Block.Flex justify={'space-between'} margin={'0 0 5px 0'}>
                <p className={classNames(classes.internalTitle, classes.supply)}>24h%:</p>
                <span className={classes.supply}>{formatNumbersToPrettyStyle(coin.changePercent24Hr)}%</span>
            </Block.Flex>

            <Block.Flex justify={'space-between'} margin={'0 0 5px 0'}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Circulating Supply:</p>
                <span className={classes.supply}>{formatNumberToPrice(coin.supply, 12, 0)}</span>
            </Block.Flex>

            <Block.Flex justify={'space-between'} margin={'0 0 5px 0'}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Market cap:</p>
                <span className={classes.supply}>{formatNumberToPrice(coin.marketCapUsd, 12, 0)}</span>
            </Block.Flex>

            <Block.Flex justify={'space-between'} margin={'0 0 5px 0'}>
                <p className={classNames(classes.internalTitle, classes.supply)}>Volume(24h):</p>
                <span className={classes.supply}>{formatNumberToPrice(coin.volumeUsd24Hr, 12, 0)}</span>
            </Block.Flex>

        </div>
        <form onSubmit={handleSubmit}>
            <input type={'hidden'} name="isAppend" value={hiddenInputValue}/>
            <div className={classes.formInternalContainer}>

                <Input.Number name="quantitySigns"
                              value={quantityCoin}
                              increment={incrementQuantityCoin}
                              decrement={decrementQuantityCoin}
                              onChange={handleChange}
                              placeholder={coin.symbol}
                />

                <div className={classes.totalPriceWrap}>
                    <p className={classes.totalPriceTitle}>Total:</p>
                    <p className={classes.totalPrice}>{formatNumberToPrice(+totalPrice, 10, 2)}
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

                    <Button type={'submit'} bgColor={'green'} onClick={hiddenInputSetValue} onClickTransmittedValues={'true'}>
                        {isAlreadyExistCoin ? "BUY" : "ADD TO PORTFOLIO"}
                    </Button>

                </div>
                {isAlreadyExistCoin ?
                    <div className={classNames(isAlreadyExistCoin ? classes.smallBtn : classes.btn)}>

                        <Button type={'submit'} bgColor={'red'} onClick={hiddenInputSetValue} onClickTransmittedValues={'false'}>
                            SELL
                        </Button>


                    </div> :
                    null}
            </div>
        </form>
    </div>
}

export default PopUpCoinDescription