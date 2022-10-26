import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuBurger from './MenuBurger';
import { withWrapForTesting } from '../../utils/helpers/hocs-helper';

describe('MenuBurger TESTS', () => {
  test('There must be a checkbox in menu', () => {
    const WrappedMenuBurger = withWrapForTesting(MenuBurger);

    render(<WrappedMenuBurger elements={[{ elementTitle: 'Home', elementLink: '#' }]} children="" />);

    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toBeDefined();
    expect(checkbox).toMatchSnapshot();
  });

  test('The menu must display the items correctly', () => {
    const WrappedMenuBurger = withWrapForTesting(MenuBurger);

    const view = render(<WrappedMenuBurger elements={[{ elementTitle: 'Home', elementLink: '#' }]} children="" />);

    expect(screen.getByText('Home')).toBeDefined();
    expect(view.baseElement).toMatchSnapshot();
  });
});
