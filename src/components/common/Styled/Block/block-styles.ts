import styled from "styled-components";


export type FlexPropsTypes = {
    align?: string,
    justify?: string
    margin?: string,
    padding?: string,
    direction?: string
}

export const BlockFlexStyles = styled.div<FlexPropsTypes>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${({align}) => align || 'stretch'};
  justify-content: ${({justify}) => justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
  max-height: 100%;
`