import React from 'react';
import styled from "styled-components";

export type FlexPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    direction?: string
    align?: string
    justify?: string
    margin?: string
}

export const StyledFLex = styled.div<FlexPropsTypes>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${({align}) => align || 'stretch'};
  justify-content: ${({justify}) => justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
  max-height: 100%;
`

const Flex: React.FC<FlexPropsTypes> = (props) => {
    return <StyledFLex {...props}/>
};

export default Flex;