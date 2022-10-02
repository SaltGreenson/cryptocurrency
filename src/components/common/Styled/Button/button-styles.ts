import styled from 'styled-components'

export type StyledDefaultButtonTypes = {
    bgColor: 'red' | 'green' | 'default'
}

export const StyledDefaultButton = styled.button<StyledDefaultButtonTypes>`
  font-size: 16px;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  border: none;
  color: ${({theme}) => theme.colors.white};
  font-weight: 700;
  border-radius: 10px;
  transition: ease-out 0.4s;
  outline: none;
  background-color: ${({bgColor, theme}) => bgColor === 'red' ?
          theme.colors.red :
          bgColor === 'default' ?
                  theme.colors.lightDark :
                  theme.colors.green};

  &:hover {
    background-color: ${({theme}) => theme.colors.purple};
  }
`

export type StyledSmallButtonTypes = {
    borderRadius: '10px 0 0 10px' | '0 10px 10px 0',
    bgColorHover: 'green' | 'red'
}

export const StyledSmallButton = styled.button<StyledSmallButtonTypes>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 30px;
  background-color: ${({theme}) => theme.colors.lightDark};
  cursor: pointer;
  user-select: none;
  transition: .3s;
  border-radius: ${({borderRadius}) => borderRadius};

  &:hover {
    background-color: ${({bgColorHover, theme}) => bgColorHover === 'green' ?
            theme.colors.green :
            theme.colors.red
    };
  }
`

export type StyledTransparentButtonPropsTypes = {
    color: 'blue' | 'yellow'
}

export const StyledTransparentButton = styled.button<StyledTransparentButtonPropsTypes>`
  cursor: pointer;
  font-size: ${({theme}) => theme.fonts.sizes.medium};
  transition: .3s;
  transition-timing-function: linear;
  user-select: none;
  margin-right: 2rem;
  background-color: transparent;
  
  color: ${({color, theme}) => color === 'blue' ? theme.colors.darkBlue : theme.colors.yellow};
  
  &:focus, &:hover {
    outline: none;
    color: ${({color, theme}) => color === 'blue' ? theme.colors.lightBlue : theme.colors.orange};
  }
`