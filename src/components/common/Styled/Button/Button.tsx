import React from 'react';
import {
    StyledSmallButtonTypes,
    StyledSmallButton,
    StyledDefaultButtonTypes,
    StyledDefaultButton,
    StyledTransparentButton,
    StyledTransparentButtonPropsTypes
} from "./button-styles";

type ButtonPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>,
    type: "button" | "reset" | "submit",
    onClick?: (args: any) => void
    onClickValue?: any
}

type ButtonsTypes = {
    Little: React.FC<ButtonPropsTypes & StyledSmallButtonTypes>,
    Transparent: React.FC<ButtonPropsTypes & StyledTransparentButtonPropsTypes>
}

const Button: React.FC<ButtonPropsTypes & StyledDefaultButtonTypes> & ButtonsTypes   = ({children, onClick, onClickValue, ...rest}) => {
    return <StyledDefaultButton onClick={ () => onClick ? onClick(onClickValue) : null} {...rest}>
        {children}
    </StyledDefaultButton>
};



Button.Little = ({children, onClick, onClickValue, ...rest}) => {
    return <StyledSmallButton onClick={ () => onClick ? onClick(onClickValue) : null} {...rest}>
        {children}
    </StyledSmallButton>
}

Button.Transparent = ({children, onClick, onClickValue, ...rest}) => {
    return <StyledTransparentButton onClick={ () => onClick ? onClick(onClickValue) : null} {...rest}>
        {children}
    </StyledTransparentButton>
}

export default Button;