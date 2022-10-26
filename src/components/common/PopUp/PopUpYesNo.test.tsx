import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PopUpYesNo from './PopUpYesNo';
import { withWrapForTesting } from '../../utils/helpers/hocs-helper';

describe('PopUpYesNo TESTS', () => {
  test('Answers must works correctly', () => {
    let answer = false;
    let active = true;

    const WrappedPopUpYesNo = withWrapForTesting(PopUpYesNo);

    render(<WrappedPopUpYesNo
      active={active}
      setActive={(e: boolean) => active = e}
      text=""
      setAnswer={(e: boolean) => answer = e}
    />);

    const btnNO = screen.getByText('NO');
    const btnYES = screen.getByText('YES');

    fireEvent.click(btnNO);
    expect(answer).toBe(false);

    fireEvent.click(btnYES);
    expect(answer).toBe(true);

    expect(btnNO).toMatchSnapshot();
    expect(btnYES).toMatchSnapshot();
    expect(active).toBe(false);
  });

  test('The question text must display correctly', () => {
    const text = 'It is sunny today?';

    const WrappedPopUpYesNo = withWrapForTesting(PopUpYesNo);

    render(<WrappedPopUpYesNo
      active
      setActive={(() => {
      })}
      text={text}
      setAnswer={() => {
      }}
    />);

    const innerTextHTML = screen.queryByText(text);

    expect(innerTextHTML).toBeDefined();
    expect(innerTextHTML).toMatchSnapshot();
  });
});
