import React from 'react';
import {
  StyledDefaultButton,
  StyledDefaultButtonTypes,
  StyledSmallButton,
  StyledSmallButtonTypes,
  StyledTransparentButton,
  StyledTransparentButtonPropsTypes,
} from './button-styles';

export type ButtonPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>,
    type?: 'button' | 'reset' | 'submit',
    onClick?: (args: any) => void
    onClickTransmittedValues?: any
}

export type ButtonsTypes = {
    Little: React.FC<ButtonPropsTypes & StyledSmallButtonTypes>,
    Transparent: React.FC<ButtonPropsTypes & StyledTransparentButtonPropsTypes>
}

const Button: React.FC<ButtonPropsTypes & StyledDefaultButtonTypes> & ButtonsTypes = ({
  children, onClick = () => {}, onClickTransmittedValues = true, type = 'button', ...rest
}) => (
  <StyledDefaultButton onClick={() => onClick(onClickTransmittedValues)} {...rest}>
    {children}
  </StyledDefaultButton>
);

Button.Little = ({
  children, onClick, onClickTransmittedValues, ...rest
}) => (
  <StyledSmallButton onClick={() => (onClick ? onClick(onClickTransmittedValues) : null)} {...rest}>
    <p>
      {children[0]}
    </p>
  </StyledSmallButton>
);

Button.Transparent = ({
  children, onClick, onClickTransmittedValues, ...rest
}) => (
  <StyledTransparentButton onClick={() => (onClick ? onClick(onClickTransmittedValues) : null)} {...rest}>
    {children}
  </StyledTransparentButton>
);

export default Button;
