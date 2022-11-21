import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AssetsType } from "../../api/types-api";
import { getProfile } from "../../selectors/profile-selectors";
import PopUpYesNo from "../common/PopUp/PopUpYesNo";
import PopUpCoinDescription from "./PopUpCoinDescription";
import {
  formatNumbersToPrettyStyle,
  formatNumberToPrice,
} from "../utils/helpers/helpers";
import { useActions } from "../utils/helpers/hooks";

type PropsTypes = {
  coin: AssetsType;
  setIsPopUpActive: (b: boolean) => void;
  isAlreadyExistCoin: boolean;
};

export const convertQuantity = (quantity: number) => {
  const max = 10 ** 9;
  return quantity > max ? max - 1 : quantity;
};

const ContainerPopUpCoinDescription: React.FC<PropsTypes> = ({
  setIsPopUpActive,
  coin,
  ...rest
}) => {
  const [quantityCoin, setQuantityCoin] = useState<string>("0");
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [isAppend, setIsAppend] = useState<boolean>(true);
  const profile = useSelector(getProfile);
  const [hiddenInputValue, setHiddenInputValue] = useState<"true" | "false">("true");
  const [popUpYesNoActive, setPopUpYesNoAction] = useState<boolean>(false);
  const { addCoinToPortfolio, removeCoinFromPortfolio } = useActions();

  const { portfolio } = profile;
  const idx = portfolio.findIndex((existing) => existing.coin.id === coin.id);

  const popUpAnswer = (answer: boolean) => {
    if (!answer) {
      setIsPopUpActive(true);
      return;
    }
    if (isAppend) {
      addCoinToPortfolio(coin, +quantityCoin);
    } else {
      removeCoinFromPortfolio(coin, +quantityCoin);
    }
    setQuantityCoin("0");
    setTotalPrice("0");
  };

  const showQuantity = () =>
    `${formatNumbersToPrettyStyle(convertQuantity(+quantityCoin), 8)} ${
      coin.symbol
    }`;

  const onClickHandler = (isAdd: boolean) => {
    if (+quantityCoin <= 0) {
      return;
    }
    setIsPopUpActive(false);
    setIsAppend(isAdd);
    setPopUpYesNoAction(true);
  };

  const changeTotalPrice = (quantity: number) => {
    const tP: number = coin.priceUsd * +quantity;
    const maxValue = 10 ** 12;
    if (tP > maxValue) {
      setTotalPrice(String(maxValue - 1));
    } else {
      setTotalPrice(String(tP));
    }
  };

  const incrementQuantityCoin = () => {
    const incr = +quantityCoin + 1;
    changeTotalPrice(incr);
    setQuantityCoin(String(incr));
  };

  const decrementQuantityCoin = () => {
    if (+quantityCoin > 0) {
      const decr = +quantityCoin - 1;
      changeTotalPrice(decr);
      setQuantityCoin(String(decr));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value;
    setQuantityCoin(quantity);
    changeTotalPrice(+quantity);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClickHandler(hiddenInputValue === "true");
  };

  return (
    <>
      {" "}
      <PopUpCoinDescription
        coin={coin}
        quantityCoin={quantityCoin}
        totalPrice={totalPrice}
        decrementQuantityCoin={decrementQuantityCoin}
        incrementQuantityCoin={incrementQuantityCoin}
        hiddenInputValue={hiddenInputValue}
        existingCoinFromProfile={portfolio[idx]}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        hiddenInputSetValue={setHiddenInputValue}
        {...rest}
      />
      <PopUpYesNo
        active={popUpYesNoActive}
        setActive={setPopUpYesNoAction}
        text={`Are you sure you want to ${
          isAppend ? "buy" : "sell"
        } ${showQuantity()} (${formatNumberToPrice(+totalPrice, 10, 2)}) ${
          coin.name
        }?`}
        setAnswer={popUpAnswer}
      />
    </>
  );
};

export default ContainerPopUpCoinDescription;
