import styled from "styled-components";

export const StyledInput = styled.input.attrs({
    type: "text"
})`
  font-size: calc(${({theme}) => theme.fonts.size.defaultSize} + 2px);
  width: 100px;
  background-color: ${({theme}) => theme.colors.darkGrey};
  color: ${({theme}) => theme.colors.white};
  font-weight: 700;
`

export const StyledNumberInput = styled(StyledInput)`
  outline: none;
  border: 0;

  &:invalid {
    color: ${({theme}) => theme.colors.red};
  }
`