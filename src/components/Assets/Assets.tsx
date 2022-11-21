import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";
import { getAssets } from "../../selectors/assets-selectors";
import { CoinElement } from "../CoinElement/CoinElement";
import classes from "./Assets.module.css";
import { getCurrentPage, getLimit } from "../../selectors/app-selectors";
import { AssetsType } from "../../api/types-api";
import PopUp from "../common/PopUp/PopUp";
import { keys } from "../../keys";
import { getProfile } from "../../selectors/profile-selectors";
import ContainerPopUpCoinDescription from "../PopUpCoinDescription/ContainerPopUpCoinDescription";
import { useActions } from "../utils/helpers/hooks";

export const getValueFromParams = (params: string) => params.split("=")[1];

export type FavouriteType = {
  coin: AssetsType;
  quantity: number;
  totalPrice: number;
};

export const Assets: React.FC = () => {
  const { portfolio } = useSelector(getProfile);
  const assets = useSelector(getAssets);
  const limit = useSelector(getLimit);
  const currentPage = useSelector(getCurrentPage);
  const { setAppCurrentPage, setAssets } = useActions();

  const params: Readonly<Params<string>> = useParams();
  const page: number = +getValueFromParams(params.page as string);

  const state = JSON.parse(
    localStorage.getItem(keys.localStorageName) as string
  );
  const [favourites, setFavourites] = useState<Array<FavouriteType>>(
    state || []
  );

  const [isPopUpActive, setIsPopUpActive] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<AssetsType>(
    {} as AssetsType
  );
  const [isAlreadyExistCoin, setIsAlreadyExistCoin] = useState<boolean>(false);
  const [pageFromParams, setPageFromParams] = useState<number>(page || 1);

  const onClickHandler = (coin: AssetsType) => {
    setSelectedCoin(coin);
    setIsAlreadyExistCoin(alreadyInFavourite(coin.id));
    setIsPopUpActive(true);
  };

  const alreadyInFavourite = (coinId: string) =>
    portfolio.some((f) => f.coin.id === coinId);

  useEffect(() => {
    localStorage.setItem(keys.localStorageName, JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    if (pageFromParams && pageFromParams === +pageFromParams) {
      if (pageFromParams !== currentPage) {
        setAppCurrentPage(pageFromParams);
        setAssets(pageFromParams * limit - limit, limit);
      }
    }
  }, [pageFromParams]);

  return (
    <div className={classes.container}>
      <div className={classes.tableWrap}>
        <table>
          <thead className={classes.theadStyle}>
            <tr className={classes.headerTable}>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h%</th>
              <th>Circulating Supply</th>
              <th>Market cap</th>
              <th>Volume(24h)</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((coin) => (
              <CoinElement
                key={coin.id}
                coin={coin}
                alreadyInFavourite={alreadyInFavourite(coin.id)}
                onClickHandler={onClickHandler}
              />
            ))}
          </tbody>
        </table>
      </div>

      <PopUp active={isPopUpActive} setActive={setIsPopUpActive}>
        <ContainerPopUpCoinDescription
          coin={selectedCoin}
          isAlreadyExistCoin={isAlreadyExistCoin}
          setIsPopUpActive={setIsPopUpActive}
        />
      </PopUp>
    </div>
  );
};
