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
    onClickValue?: any
}

export type ButtonsTypes = {
    Little: React.FC<ButtonPropsTypes & StyledSmallButtonTypes>,
    Transparent: React.FC<ButtonPropsTypes & StyledTransparentButtonPropsTypes>
}

const Button: React.FC<ButtonPropsTypes & StyledDefaultButtonTypes> & ButtonsTypes   = ({children, onClick= () => {}, onClickValue=true, type='button', ...rest}) => {
    return <StyledDefaultButton onClick={ () => onClick(onClickValue)} {...rest}>
        {children}
    </StyledDefaultButton>
};



Button.Little = ({children, onClick, onClickValue, ...rest}) => {
    return <StyledSmallButton onClick={ () => onClick ? onClick(onClickValue) : null} {...rest}>
        <p>
            {children[0]}
        </p>
    </StyledSmallButton>
}

Button.Transparent = ({children, onClick, onClickValue, ...rest}) => {
    return <StyledTransparentButton onClick={ () => onClick ? onClick(onClickValue) : null} {...rest}>
        {children}
    </StyledTransparentButton>
}

export default Button;