import React, {FC} from 'react';
import {
    StyledSmallButtonTypes,
    StyledSmallButton,
    StyledDefaultButtonTypes,
    StyledDefaultButton,
    StyledTransparentButton,
    StyledTransparentButtonPropsTypes
} from "./button-styles";
import {theme} from '../../../../global-styles'

export type ButtonPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>,
    type?: "button" | "reset" | "submit",
    onClick?: (args: any) => void
    onClickTransmittedValues?: any
}

export type ButtonsTypes = {
    Little: React.FC<ButtonPropsTypes & StyledSmallButtonTypes>,
    Transparent: React.FC<ButtonPropsTypes & StyledTransparentButtonPropsTypes>
}

const Button: React.FC<ButtonPropsTypes & StyledDefaultButtonTypes> & ButtonsTypes   = ({children, onClick= () => {}, onClickTransmittedValues=true, type='button', ...rest}) => {
    return <StyledDefaultButton onClick={ () => onClick(onClickTransmittedValues)} {...rest}>
        {children}
    </StyledDefaultButton>
};



Button.Little = ({children, onClick, onClickTransmittedValues, ...rest}) => {
    return <StyledSmallButton onClick={ () => onClick ? onClick(onClickTransmittedValues) : null} {...rest}>
        <p>
            {children[0]}
        </p>
    </StyledSmallButton>
}

Button.Transparent = ({children, onClick, onClickTransmittedValues, ...rest}) => {
    return <StyledTransparentButton onClick={ () => onClick ? onClick(onClickTransmittedValues) : null} {...rest}>
        {children}
    </StyledTransparentButton>
}

export default Button;