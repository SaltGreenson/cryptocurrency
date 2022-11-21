import React from 'react';
import { render, screen } from '@testing-library/react';
import PopUpCoinDescription from './PopUpCoinDescription';
import { withWrapForTesting } from '../utils/helpers/hocs-helper';
import { AssetsType } from '../../api/types-api';
import { CoinInPortfolioType } from '../../redux/profileReducer/profileReducer';

describe('PopUpCoinDescription TESTS', () => {
  test('Only one button must be displayed', () => {
    const WrappedPopUpCoinDescription = withWrapForTesting(PopUpCoinDescription);
    render(<WrappedPopUpCoinDescription
      coin={{} as AssetsType}
      hiddenInputSetValue={() => {
      }}
      handleSubmit={() => {
      }}
      existingCoinFromProfile={{} as CoinInPortfolioType}
      incrementQuantityCoin={() => {
      }}
      decrementQuantityCoin={() => {
      }}
      handleChange={() => {
      }}
      hiddenInputValue="false"
      quantityCoin="0"
      isAlreadyExistCoin={false}
      totalPrice="0"
    />);

    const btn = screen.getByText(/add to portfolio/i);
    expect(btn).toMatchSnapshot();
  });

  test('Two buttons must be displayed', () => {
    const WrappedPopUpCoinDescription = withWrapForTesting(PopUpCoinDescription);
    render(<WrappedPopUpCoinDescription
      coin={{} as AssetsType}
      hiddenInputSetValue={() => {
      }}
      handleSubmit={() => {
      }}
      existingCoinFromProfile={{ coin: { symbol: 'BTC' } } as CoinInPortfolioType}
      incrementQuantityCoin={() => {
      }}
      decrementQuantityCoin={() => {
      }}
      handleChange={() => {
      }}
      hiddenInputValue="false"
      quantityCoin="0"
      isAlreadyExistCoin
      totalPrice="0"
    />);

    const btnBuy = screen.getByText(/buy/i);
    const btnSell = screen.getByText(/sell/i);
    expect(btnBuy).toMatchSnapshot();
    expect(btnSell).toMatchSnapshot();
  });
});
