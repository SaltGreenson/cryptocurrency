import React from 'react';
import styled from "styled-components";

type PropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    direction?: string
    align?: string
    justify?: string
    margin?: string
}

const StyledFLex = styled.div<PropsTypes>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${({align}) => align || 'stretch'};
  justify-content: ${({justify}) => justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
`

const Flex: React.FC<PropsTypes> = (props) => {
    return <StyledFLex {...props}/>
};

export default Flex;