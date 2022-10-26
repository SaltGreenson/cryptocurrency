import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from '../../../redux/redux-store';
import Preloader from '../../common/Preloader/Preloader';
import { theme } from '../../../global-styles';

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
  return function (props: React.PropsWithChildren<T>) {
    return (
      <Suspense fallback={<Preloader />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export function withWrapForTesting<T>(WrappedComponent: React.ComponentType<T>) {
  return function (props: React.PropsWithChildren<T>) {
    return (
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <WrappedComponent {...props} />
          </Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
  };
}
