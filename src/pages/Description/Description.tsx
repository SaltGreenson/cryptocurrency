import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { AssetsType } from "../../api/types-api";
import { getValueFromParams } from "../../components/Assets/Assets";
import {
  getAsset,
  getAssetsHistory,
  getIsFetchingAssetsPage,
} from "../../selectors/assets-selectors";
import Preloader from "../../components/common/Preloader/Preloader";
import { IntervalEnum } from "../../api/assets-api";
import classes from "./Discription.module.css";
import ChartComponent from "../../components/ChartComponent/ChartComponent";
import LittlePreloader from "../../components/common/LittlePreloader/LittlePreloader";
import classesPercents from "../../components/Header/Header.module.css";
import PopUp from "../../components/common/PopUp/PopUp";
import { getProfile } from "../../selectors/profile-selectors";
import classesForFavourite from "../../components/CoinElement/CoinElement.module.css";
import ContainerPopUpCoinDescription from "../../components/PopUpCoinDescription/ContainerPopUpCoinDescription";
import {
  formatNumbersToPrettyStyle,
  formatNumberToPrice,
} from "../../components/utils/helpers/helpers";
import { useActions } from "../../components/utils/helpers/hooks";

const Description: React.FC = (props) => {
  const { setAssetByID, setAssetsHistoryById } = useActions();
  const params: Readonly<Params<string>> = useParams();
  const isFetching = useSelector(getIsFetchingAssetsPage);
  const asset: AssetsType = useSelector(getAsset);
  const assetHistory = useSelector(getAssetsHistory);

  const [popIsUpActive, setIsPopUpActive] = useState(false);
  const id: string = getValueFromParams(params.id as string);
  const [idFromParams, setIdFromParams] = useState<string>(id || "bitcoin");
  const profileCoins = useSelector(getProfile).portfolio;
  const alreadyInFavourite = profileCoins.some((c) => c.coin.id === asset.id);

  useEffect(() => {
    setAssetByID(idFromParams);
    setAssetsHistoryById(idFromParams, IntervalEnum.m5);
  }, []);

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.titleWrap}>
          <div className={classes.rankWrap}>
            <p className={classes.rank}>RANK #{asset.rank}</p>
          </div>
          <p className={classes.name} data-cy="descriptionCoinName">
            {asset.name}
          </p>

          <span className={classes.symbolWrap}>
            <p className={classes.symbol}>{asset.symbol}</p>
          </span>

          <p
            className={
              alreadyInFavourite
                ? classesForFavourite.alreadyFavourite
                : classesForFavourite.favourite
            }
            onClick={() => {
              setIsPopUpActive(true);
            }}
            data-cy="inFavouritesDescriptionPage"
          >
            &#9733;
          </p>
        </div>

        <div className={classes.priceDescriptionContainer}>
          <div className={classes.priceDescriptionWrap}>
            <p className={classes.priceDescription}>
              {asset.name} Price
              <span className={classes.symbolDescription}>
                ({asset.symbol})
              </span>
            </p>
          </div>
          <div className={classes.titlePriceWrap}>
            <p className={classes.price}>
              {formatNumberToPrice(+asset.priceUsd, 8, 2)}
            </p>
            <div className={classes.flexCenter}>
              <div
                className={
                  +asset.changePercent24Hr > 0
                    ? classesPercents.increasedPercentsWrap
                    : classesPercents.reducedPercentsWrap
                }
              >
                <p
                  className={
                    +asset.changePercent24Hr > 0
                      ? classesPercents.increasedPercents
                      : classesPercents.reducedPercents
                  }
                >
                  {formatNumbersToPrettyStyle(+asset.changePercent24Hr)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        {!assetHistory ? (
          <LittlePreloader />
        ) : (
          <div className={classes.chartWrap}>
            <ChartComponent
              assetHistory={assetHistory}
              id={id}
              isDisplayX={false}
              isDisplayY={false}
            />
          </div>
        )}
      </div>
      <div className={classes.descriptionContainer}>
        <div className={classes.descriptionWrap}>
          <div className={classes.descriptionElement}>
            <div className={classes.descriptionTitleWrap}>Market Cap</div>
            <p className={classes.descriptionPrice}>
              {formatNumberToPrice(+asset.marketCapUsd)}
            </p>
          </div>
        </div>
        <div className={classes.descriptionWrap}>
          <div className={classes.descriptionElement}>
            <div className={classes.descriptionTitleWrap}>
              Volume <span className={classes.symbolWrap}>24h</span>
            </div>
            <p className={classes.descriptionPrice}>
              {formatNumberToPrice(+asset.volumeUsd24Hr)}
            </p>
          </div>
        </div>
        <div className={classes.descriptionWrap}>
          <div className={classes.descriptionElement}>
            <div className={classes.descriptionTitleWrap}>
              Circulating Supply
            </div>
            <p className={classes.descriptionPrice}>
              {formatNumbersToPrettyStyle(+asset.supply, 2, 13)} {asset.symbol}
            </p>
          </div>
        </div>
      </div>
      <PopUp
        active={popIsUpActive}
        setActive={setIsPopUpActive}
        children={
          <ContainerPopUpCoinDescription
            coin={asset}
            setIsPopUpActive={setIsPopUpActive}
            isAlreadyExistCoin={alreadyInFavourite}
          />
        }
      />
    </div>
  );
};

export default Description;
