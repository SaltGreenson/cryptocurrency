import React from "react";
import { useNavigate } from "react-router-dom";
import { AssetsHistoryType, AssetsType } from "../../api/types-api";
import classes from "./Card.module.css";
import ChartComponent from "../ChartComponent/ChartComponent";
import {
  formatNumbersToPrettyStyle,
  formatNumberToPrice,
} from "../utils/helpers/helpers";
import Block from "../common/Styled/Block/Block";
import { useActions } from "../utils/helpers/hooks";

const Card: React.FC<{
  coinData: AssetsType;
  coinHistory: Array<AssetsHistoryType>;
}> = React.memo(({ coinData, coinHistory }) => {
  const navigate = useNavigate();
  const { setAssetByID } = useActions();

  const onClick = (id: string) => {
    setAssetByID(id);
    navigate(`/:id=${id}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardWrap}>
        <Block.Flex align="center" fontSize="20px">
          <span
            className={classes.symbol}
            onClick={() => onClick(coinData.id)}
            data-cy="cardCoinRank"
          >
            {coinData.symbol}
          </span>
          <span className={classes.rank}>RANK #{coinData.rank}</span>
        </Block.Flex>

        <Block.Flex justify="space-between">
          <Block.Flex justify="space-between">
            <p className={classes.internalTitle}>PRICE:</p>
            <span className={classes.price}>
              {formatNumberToPrice(coinData.priceUsd)}
            </span>
          </Block.Flex>

          <Block.Flex justify="space-between">
            <p className={classes.internalTitle}>24h%:</p>
            <span className={classes.changePercent}>
              {formatNumbersToPrettyStyle(coinData.changePercent24Hr)}%
            </span>
          </Block.Flex>
        </Block.Flex>

        <div className={classes.chartWrap}>
          <ChartComponent
            key={coinData.id}
            assetHistory={coinHistory}
            id={coinData.id}
            isDisplayX={false}
            isDisplayY={false}
          />
        </div>
      </div>
    </div>
  );
});

export default Card;
