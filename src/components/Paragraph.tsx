import React from 'react';
import styled, {createGlobalStyle, css} from "styled-components";
import {FlexPropsTypes, StyledFLex} from "./Flex";



export type ParagraphPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    color?: string,
    fontSize?: string,
    fontWeight?: string,
    needMedia?: boolean
}

export const StyledParagraph = styled(StyledFLex)<ParagraphPropsTypes>`
  font-size: ${(props) => props.fontSize || props.theme.fonts.size.largeSize};
  font-weight: ${(props) => props.fontWeight || '400'};
  color: ${props => props.color || props.theme.colors.white};
  max-height: 25px;
`

const StyledMediaParagraph = styled(StyledParagraph)`
  
  ${props => props.needMedia && css`
    @media ${props.theme.media.phone} {
      font-size: calc(${props.fontSize || props.theme.fonts.size.largeSize} - 10px)
    }
  `}
`

const Paragraph: React.FC<ParagraphPropsTypes & FlexPropsTypes> = (props) => {
    return <StyledMediaParagraph {...props}/>
};

export default Paragraph;