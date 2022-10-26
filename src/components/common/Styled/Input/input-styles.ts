import styled from 'styled-components';

export type InputPropsTypes = {
    width?: string
    fontSize?: string
}

export const InputStyled = styled.input<InputPropsTypes>`
  font-size: ${({ fontSize }) => (fontSize || '16px')};
  background-color: ${({ theme }) => theme.colors.darkGrey};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  height: 25px;
  width: ${({ width }) => (width || '100px')};
  &:invalid {
    color: ${({ theme }) => theme.colors.red};
  }
  &:focus {
    outline: none;
  }
`;
