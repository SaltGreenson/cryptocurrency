import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { func } from 'prop-types';
import PopUpCoinDescription from './PopUpCoinDescription';
import { CoinInPortfolioType } from '../../redux/profileReducer/profileReducer';
import { AssetsType } from '../../api/types-api';

const initialCoin: AssetsType = {
  id: 'bitcoin',
  rank: 1,
  symbol: 'BTC',
  name: 'Bitcoin',
  supply: 19167968,
  maxSupply: 21000000,
  marketCapUsd: 372374910879.1380576,
  volumeUsd24Hr: 11374487618.036757,
  priceUsd: 19426.937215,
  changePercent24Hr: 1.525387,
  vwap24Hr: 19212.522455,
};

const initialPortfolioCoin: CoinInPortfolioType = {
  coin: initialCoin,
  quantity: 3,
};

export default {
  title: 'Coin Description/Block',
  component: PopUpCoinDescription,
  argTypes: {
    coin: {
      type: Object,
      defaultValue: initialCoin,
      description: 'Data to display in the form',
    },
    isAlreadyExistCoin: {
      type: 'boolean',
      defaultValue: false,
      description: 'Sets whether the user has this coin or not',
    },
    quantityCoin: {
      type: 'string',
      defaultValue: '1.13',
      description: 'Number of coins entered',
    },
    totalPrice: {
      type: 'string',
      defaultValue: '21952.4422',
      description: 'The price of the entered number of coins',
    },
    hiddenInputValue: {
      type: 'string',
      defaultValue: 'false',
      description: 'Text inside the hidden text input for adding or removing coins from the portfolio',
      options: ['true', 'false'],
      control: {
        type: 'radio',
      },
    },
    hiddenInputSetValue: {
      type: func,
      defaultValue: (text: string) => {},
      description: 'Sets the text that is inside the hidden input',
    },
    handleSubmit: {
      type: func,
      defaultValue: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      },
      description: 'Function that is submitting the form',
    },
    handleChange: {
      type: func,
      defaultValue: (event: React.ChangeEvent<HTMLInputElement>) => {},
      description: 'A function that sets the text inside the entered amount of coin',
    },
    existingCoinFromProfile: {
      type: Object,
      defaultValue: initialPortfolioCoin,
      description: 'Coin data that is displayed on the form',
    },
    decrementQuantityCoin: {
      type: func,
      defaultValue: () => {},
      description: 'A function that reduces the amount of coins',
    },
    incrementQuantityCoin: {
      type: func,
      defaultValue: () => {},
      description: 'A function that increases the amount of coins',
    },
  },
} as ComponentMeta<typeof PopUpCoinDescription>;

const Template: ComponentStory<typeof PopUpCoinDescription> = (args) => <PopUpCoinDescription {...args} />;

export const Block = Template.bind({});

Block.args = {
  coin: initialCoin,
  isAlreadyExistCoin: true,
  decrementQuantityCoin: () => {
  },
  incrementQuantityCoin: () => {
  },
  existingCoinFromProfile: initialPortfolioCoin,
  handleChange: () => {
  },
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  },
  hiddenInputSetValue: (text: string) => {
  },
  hiddenInputValue: '',
  totalPrice: '21952.4422',
  quantityCoin: '1.13',
};
