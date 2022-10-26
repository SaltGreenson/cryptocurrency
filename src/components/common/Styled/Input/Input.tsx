import React from 'react';
import { InputPropsTypes, InputStyled } from './input-styles';
import Block from '../Block/Block';
import Button from '../Button/Button';

type PropsTypeInputNumber = {
    name: string,
    onChange: (value: any) => void,
    value: any,
    increment: () => void,
    decrement: () => void,
    placeholder: string
}

type InputTypes = {
    Number: React.FC<InputPropsTypes & PropsTypeInputNumber>
}

const Input: React.FC<InputPropsTypes> & InputTypes = ({ ...rest }) => <InputStyled {...rest} />;

Input.Number = ({
  onChange, value, increment, decrement, placeholder, name, ...rest
}) => (
  <Block.Flex>
    <Button.Little
      type="button"
      bgColorHover="red"
      borderRadius="10px 0 0 10px"
      onClick={decrement}
      data-cy="inputNumberDecrement"
    >
      -
    </Button.Little>

    <InputStyled
      name={name}
      value={value}
      onChange={onChange}
      type="text"
      pattern="^[0-9]+(.[0-9]+)?$"
      placeholder={placeholder}
      required
      {...rest}
    />

    <Button.Little
      type="button"
      bgColorHover="green"
      borderRadius="0 10px 10px 0"
      onClick={increment}
      data-cy="inputNumberIncrement"
    >
      +
    </Button.Little>
  </Block.Flex>
);

export default Input;
