import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {theme} from "./global-styles";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
