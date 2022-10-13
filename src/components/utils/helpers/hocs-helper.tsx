import React, {Suspense} from 'react'
import Preloader from "../../common/Preloader/Preloader";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../../redux/redux-store";
import {ThemeProvider} from "styled-components";
import {theme} from "../../../global-styles";

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
    return (props: React.PropsWithChildren<T>) => {
        return <Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}

export function withWrapForTesting<T>(WrappedComponent: React.ComponentType<T>) {
    return (props: React.PropsWithChildren<T>) => {
        return <MemoryRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <WrappedComponent {...props}/>
                </Provider>
            </ThemeProvider>
        </MemoryRouter>
    }
}