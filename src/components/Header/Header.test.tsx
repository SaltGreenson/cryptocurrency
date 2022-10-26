import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ProfileType } from '../../redux/profile-reducer';
import { withWrapForTesting } from '../utils/helpers/hocs-helper';

describe('Header tests', () => {
  test('The title must be present', () => {
    const WrappedHeader = withWrapForTesting(Header);

    render(<WrappedHeader profile={{} as ProfileType} />);

    const h1 = screen.queryByRole('h1');
    expect(h1).toBeDefined();
  });
});
