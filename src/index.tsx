import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "styled-components";
import {theme} from "./global-styles";
import store from "./redux/redux-store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <Provider store={store}>

                <App/>
            </Provider>

        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
