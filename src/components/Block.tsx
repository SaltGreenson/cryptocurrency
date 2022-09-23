import React from 'react';
import styled, {css} from "styled-components";
import {theme} from '../index'
import {FlexPropsTypes, StyledFLex} from "./Flex";
import {ParagraphPropsTypes, StyledParagraph} from "./Paragraph";

type PropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    primary?: boolean
    needShadowHover?: boolean
    shadowColorHover?: string
    needBgColorHover?: boolean
    bgColorHover?: string
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
    bgColor?: string
    color?: string
    borderRadius?: string,
    userSelect?: string,
    cursor?: string,
}


const DefaultStyledBlock = styled.div<PropsTypes>`
  position: ${props => props.position};
  padding: ${props => props.padding || '0'};
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
  cursor: ${props => props.cursor};
  border-radius: ${props => props.borderRadius};
  user-select: ${props => props.userSelect};
  color: ${props => props.color || props.theme.colors.white};
  background-color: ${props => props.bgColor || props.theme.colors.lightDark};
  
  ${props => props.primary && css`
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.dark};
  `}
`

const HoverBorderBlock = styled(DefaultStyledBlock)`

  transition: .5s;
  transition-duration: 100ms;
  transition-timing-function: linear;
  
  ${props => props.needShadowHover && css`
    &:hover {
      box-shadow: 0 0 30px 1px ${props => props.theme.colors.blue};
      transform: translateY(-5px);
    }
  `}

  ${props => props.needBgColorHover && css`
    &:hover {
      background-color: ${props.bgColorHover || props.theme.colors.green};
    }
  `}
`

const Block: React.FC<PropsTypes> = ({children, ...props    }) => {
    return <HoverBorderBlock {...props}>
        {children}
    </HoverBorderBlock>
};

export default Block;