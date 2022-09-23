import React from 'react';
import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: normal;
  color: ${({theme}) => theme.colors.white};
`

type TPropsTypes = {
    textAlign?: string
}

export const THead = styled.thead<TPropsTypes>`
  height: 3rem;
  font-size: calc(${({theme}) => theme.fonts.size.defaultSize} - 2px);
  text-align: ${({textAlign}) => textAlign || 'left'};
`

export const TFoot = styled.tfoot`
`

export const TBody = styled.tbody`

  @media ${({theme}) => theme.media.phone} {

    &:nth-child(2) {
      background-color: ${({theme}) => theme.colors.bgColor};
      position: sticky;
      left: -1px;
      z-index: 100;
    }
  }

`

export const TR = styled.tr`
  border-bottom: 1px solid #33373f;
  line-height: 2rem;
  
  @media ${({theme}) => theme.media.phone} {
    line-height: 2rem;
  }

  @media (min-width: 1400px) {
    &:hover {
      background: ${({theme}) => theme.colors.darkHover};
    }

`

export const TH = styled.th<TPropsTypes>`
  text-align: ${({textAlign}) => textAlign};
  padding: 0.5rem 1rem;
  //&:nth-child(1) {
  //  width: 7%;
  //  text-align: right;
  //}
`

export const TD = styled.td<TPropsTypes>`
  text-align: ${({textAlign}) => textAlign};
  padding: 0.5rem 1rem;
`