import React from "react";
import {AssetsType} from "../../api/types-api";
import classes from './CoinElement.module.css'
import {Link} from "react-router-dom";
import classNames from "classnames";
import Button from "../common/Styled/Button/Button";
import {formatNumbersToPrettyStyle, formatNumberToPrice} from "../utils/helpers/helpers";
import Block from "../common/Styled/Block/Block";


type PropsTypes = {
    coin: AssetsType,
    alreadyInFavourite: boolean
    onClickHandler: (coin: AssetsType) => void
}

export const CoinElement: React.FC<PropsTypes> = ({
                                                      coin,
                                                      alreadyInFavourite,
                                                      onClickHandler
                                                  }) => {


    return <tr>
        <td>
            <p className={classes.number}>{coin.rank}</p>
        </td>
        <td>
            <Block.Flex align={'center'}>

                    <Button.Transparent type={'button'}
                                        color={ alreadyInFavourite ? 'yellow' : 'blue'}
                                        onClick={onClickHandler}
                                        onClickTransmittedValues={coin}
                    >
                        &#9733;
                    </Button.Transparent>
                    <Link to={`/:id=${coin.id}`} className={classes.title}>{coin.name}</Link>
                    <Link to={`/:id=${coin.id}`} className={classes.symbol}>{coin.symbol}</Link>
            </Block.Flex>
        </td>
        <td>
            <p className={classes.number}>
                {formatNumberToPrice(+coin.priceUsd)}
            </p>
        </td>
        <td>
            <p className={classes.number}>
                {formatNumbersToPrettyStyle(+coin.changePercent24Hr)}
            </p>
        </td>
        <td>
            <p className={classNames(classes.number, classes.marketCap)}>
                {formatNumbersToPrettyStyle(+coin.supply, 2, 15)} {coin.symbol}
            </p>
        </td>
        <td>
            <p className={classNames(classes.number, classes.marketCap)}>
                {formatNumberToPrice(+coin.marketCapUsd)}
            </p>
        </td>
        <td>
            <p className={classes.number}>
                {formatNumberToPrice(+coin.volumeUsd24Hr)}
            </p>
        </td>
    </tr>
}