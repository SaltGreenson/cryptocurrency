import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFound';
import { withWrapForTesting } from '../../components/utils/helpers/hocs-helper';

describe('NotFound page TESTS', () => {
  test('The page must have link', () => {
    const WrappedNotFoundPage = withWrapForTesting(NotFoundPage);

    render(<WrappedNotFoundPage />);

    const link = screen.getByTestId('mainPageLink');
    expect(link).toContainHTML('/coins/:page=1');
    expect(link).toMatchSnapshot();
  });
});
