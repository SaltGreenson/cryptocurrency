import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { withWrapForTesting } from '../../../utils/helpers/hocs-helper';

describe('Buttons TESTS', () => {
  test('Little button must display only one sign', () => {
    const WrappedLittleButton = withWrapForTesting(Button.Little);

    render(<WrappedLittleButton
      children="123"
      bgColorHover="red"
      borderRadius="10px 0 0 10px"
    />);

    const btn = screen.getByRole('button');
    expect(btn).toContainHTML('1');
    expect(btn).not.toContainHTML('123');
    expect(btn).toMatchSnapshot();
  });
});
