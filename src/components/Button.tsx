import React from 'react';
import styled, {css} from "styled-components";

const StyledButton = styled.button<PropsTypes>`
  font-size: calc(${({theme}) => theme.fonts.defaultSize} + 2px);
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  border: none;
  color: ${({theme}) => theme.colors.white};
  font-weight: 700;
  border-radius: 10px;
  transition: ease-out 0.4s;
  outline: none;
  background-color: ${({bgColor, theme}) => bgColor || theme.colors.green};

  ${({red}) => red && css`
      background-color:${({theme}) => theme.colors.red};
  `}
  
  &:hover {
    background-color: ${({theme}) => theme.colors.purple};
  }
`

type PropsTypes = {
    children: string
    red?: boolean
    bgColor?: string
    type: "button" | "reset" | "submit" | undefined,
    onClick?: (args: any) => void
    onClickValue? : any
}

const Button: React.FC<PropsTypes> = ({children, onClick, onClickValue, ...props}) => {
    return <StyledButton {...props} onClick={() => onClick ? onClick(onClickValue ? onClickValue : null) : null}>
        {children.toUpperCase()}
    </StyledButton>
};

export default Button;