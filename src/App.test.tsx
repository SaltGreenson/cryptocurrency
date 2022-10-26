import { render } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import StartApp from './App';
import store from './redux/redux-store';

describe('APP TESTS', () => {
  test('Start app without crashing', async () => {
    render(<Provider store={store}>
      <StartApp />
    </Provider>);
    const div = document.createElement('div');
    unmountComponentAtNode(div);
  });
});
