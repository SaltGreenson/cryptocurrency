import React from 'react';
import styled, {createGlobalStyle} from "styled-components";



type PropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    color?: string,
    fontSize?: string,
    fontWeight?: string
}

const StyledParagraph = styled.p<PropsTypes>`
  font-size: ${(props) => props.fontSize || props.theme.fonts.size.largeSize};
  font-weight: ${(props) => props.fontWeight || '400'};
  color: ${props => props.color || props.theme.colors.white};
  
  @media ${props => props.theme.media.phone} {
    font-size: calc(${props => props.fontSize || props.theme.fonts.size.largeSize} - 10px)
  }
  
`

const Paragraph: React.FC<PropsTypes> = (props) => {
    return <StyledParagraph {...props}/>
};

export default Paragraph;