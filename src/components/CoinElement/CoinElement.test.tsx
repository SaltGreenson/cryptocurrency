import React from 'react';
import { render, screen } from '@testing-library/react';
import { CoinElement } from './CoinElement';
import { AssetsType } from '../../api/types-api';
import { theme } from '../../global-styles';
import { withWrapForTesting } from '../utils/helpers/hocs-helper';

describe('CoinElement TESTS', () => {
  test('The button must be blue if it is not in favourites', async () => {
    const WrappedCoinElement = withWrapForTesting(CoinElement);

    render(
      <table>
        <tbody>
          <WrappedCoinElement
            coin={{} as AssetsType}
            alreadyInFavourite={false}
            onClickHandler={() => {
            }}
          />
        </tbody>
      </table>,
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ color: theme.colors.darkBlue });
    expect(btn).toMatchSnapshot();
  });

  test('The button must be yellow if it is in favourites', () => {
    const WrappedCoinElement = withWrapForTesting(CoinElement);

    render(
      <table>
        <tbody>
          <WrappedCoinElement
            coin={{} as AssetsType}
            alreadyInFavourite
            onClickHandler={() => {
            }}
          />
        </tbody>
      </table>,
    );

    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ color: theme.colors.yellow });
    expect(btn).toMatchSnapshot();
  });
});
