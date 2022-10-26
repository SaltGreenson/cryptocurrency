import React from 'react';
import { render, screen } from '@testing-library/react';
import Paginator from './Paginator';
import { withWrapForTesting } from '../utils/helpers/hocs-helper';

describe('Paginator component tests', () => {
  test('Pages count is 11 but must be showed only 10', () => {
    const WrappedPaginator = withWrapForTesting(Paginator);
    render(<WrappedPaginator totalItemsCount={11} pageSize={1} portionSize={10} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(10);
    expect(links).toMatchSnapshot();
  });

  test('If pages is more than 10 buttons then next button must be present', () => {
    const WrappedPaginator = withWrapForTesting(Paginator);
    render(<WrappedPaginator totalItemsCount={11} pageSize={1} portionSize={10} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(1);
    expect(buttons).toMatchSnapshot();
  });
});
