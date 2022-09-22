import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle, ThemeProvider} from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`

export const theme = {
    colors: {
        bgColor: '#212529',
        dark: '#1e2c3a',
        lightDark: '#303942',
        white: '#ffffff'
    },
    media: {
        phone: '(max-width: 780px)',
        tablet: '(max-width: 1200px)'
    },
    fonts: {
        size: {
            defaultSize: '14px',
            mediumSize: '20px',
            largeSize: '32px'
        }
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <Global/>
            <App/>
        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
