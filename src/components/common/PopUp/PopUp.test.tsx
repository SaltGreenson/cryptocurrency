import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PopUp from './PopUp';
import { withWrapForTesting } from '../../utils/helpers/hocs-helper';

describe('PopUp TESTS', () => {
  test('Active must be false state', () => {
    let active = true;

    const WrappedPopUp = withWrapForTesting(PopUp);

    render(<WrappedPopUp
      active={active}
      setActive={(e: boolean) => active = e}
      children={<p>Children</p>}
    />);

    fireEvent.click(screen.getByTestId('popUpTestId'));
    expect(active).toBe(false);
  });
});
