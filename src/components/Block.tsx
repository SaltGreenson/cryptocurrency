import React from 'react';
import styled, {css} from "styled-components";
import {theme} from '../index'

type PropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    primary?: boolean
    needHover?: boolean
    position?: string
    padding?: string
    margin?: string
    width?: string
    height?: string
    minWidth?: string
    minHeight?: string
    maxWidth?: string
    maxHeight?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
    backgroundColor?: string
    color?: string
    borderRadius?: string
}


const DefaultStyledBlock = styled.div<PropsTypes>`
  position: ${props => props.position || 'relative'};
  padding: ${props => props.padding || '1rem'};
  margin: ${props => props.margin || '0'};
  width: ${props => props.width};
  height: ${props => props.height};
  min-width: ${props => props.minWidth};
  min-height: ${props => props.minHeight};
  max-width: ${props => props.maxWidth};
  max-height: ${props => props.maxHeight};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  border-radius: ${props => props.borderRadius};
  
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.lightDark};

  ${props => props.primary && css`
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.dark};
  `}
`

const HoverBorderBlock = styled(DefaultStyledBlock)`
  ${props => props.needHover && css`

    transition: .5s;
    transition-duration: 100ms;
    transition-timing-function: linear;

    &:hover {
      box-shadow: 0 0 30px 1px #346da6;
      transform: translateY(-5px);
    }

  `}
`

const Block: React.FC<PropsTypes> = (props) => {
    return <HoverBorderBlock {...props}/>
};

export default Block;