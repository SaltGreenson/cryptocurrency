import React from "react";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getLastRank,
  getLimit,
} from "../../selectors/app-selectors";
import { Assets } from "../../components/Assets/Assets";
import classes from "./Main.module.css";
import Card from "../../components/Card/Card";
import {
  getIsFetchingAssetsPage,
  getTop3Assets,
} from "../../selectors/assets-selectors";
import Paginator from "../../components/Paginator/Paginator";
import LittlePreloader from "../../components/common/LittlePreloader/LittlePreloader";
import { useActions } from "../../components/utils/helpers/hooks";

const MainPage: React.FC = (props) => {
  const top3Assets = useSelector(getTop3Assets);
  const lastRank = useSelector(getLastRank);
  const limit = useSelector(getLimit);
  const currentPage = useSelector(getCurrentPage);
  const isFetching = useSelector(getIsFetchingAssetsPage);
  const { setAppCurrentPage, setAssets } = useActions();

  const onPageChanged = (page: number) => {
    setAppCurrentPage(page);
    setAssets(page * limit - limit, limit);
  };

  return (
    <>
      {isFetching ? (
        <LittlePreloader />
      ) : (
        <div className={classes.heading}>
          {top3Assets.data.map((coin) => (
            <Card
              key={coin.id}
              coinData={coin.data}
              coinHistory={coin.history}
            />
          ))}
        </div>
      )}
      <Paginator
        totalItemsCount={lastRank}
        currentPage={currentPage}
        pageSize={limit}
        onPageChanged={onPageChanged}
      />
      <Assets />
      <Paginator
        totalItemsCount={lastRank}
        currentPage={currentPage}
        pageSize={limit}
        onPageChanged={onPageChanged}
      />
    </>
  );
};

export default MainPage;
