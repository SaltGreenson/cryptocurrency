import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    darkPrimary: '#212529',
    lightPrimary: '#1e2c3a',
    lightDark: '#303942',
    lightGrey: '#95a0a6',
    darkGrey: '#3f4a56',
    hoverGrey: '#F9FCFF0F',
    darkBlue: '#375f86',
    blue: '#346da6',
    lightBlue: '#79b4ee',
    orange: '#ff8000',
    yellow: '#FFFF00FF',
    purple: '#8724ff',
    red: '#ff0000',
    transparentRed: '#FF000019',
    green: '#4fc180',
    white: '#ffffff',
  },
  media: {
    phone: '(max-width: 780px)',
    tablet: '(max- width: 1200px)',
  },
  fonts: {
    sizes: {
      little: '12px',
      default: '14px',
      medium: '20px',
      large: '32px',
    },
    fonts: {
      primary: '\'Roboto\', sans-serif',
      default: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    },
  },
};

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Reem+Kufi+Fun&family=Roboto&display=swap');

  * {
    margin: 0;
    font-family: ${theme.fonts.fonts.default};
    font-size: ${theme.fonts.sizes.default};
    font-weight: 400;
    color: ${theme.colors.white};
    text-align: left;
    background-color: ${theme.colors.darkPrimary};

    * {
      padding: 0;
      margin: 0;
      border: 0;
    }


    *,
    *::before,
    *::after {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    :focus, :active {
      outline: none;
    }

    a {
      color: ${theme.colors.white};
    }
    
    a:focus, a:active {
      outline: none;
    }

    nav, footer, header, aside {
      display: block;
    }

    html, body {
      height: 100%;
      width: 100%;
      line-height: 1;
      font-size: ${theme.fonts.sizes.default};
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    input, button, textarea {
      font-family: inherit;
    }

    input::-ms-clear {
      display: none;
    }

    button {
      cursor: pointer;
    }

    a, a:visited {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
    }

    ul li {
      list-style: none;
    }

    img {
      vertical-align: top;
    }

    * {
      font-family: 'Roboto', sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
      font-size: inherit;
      font-weight: 400;
    }
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;
