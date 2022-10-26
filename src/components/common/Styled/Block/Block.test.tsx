import { render, screen } from '@testing-library/react';
import React from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import Block from './Block';

describe('BLOCK TESTS', () => {
  let children: JSX.Element;

  beforeAll(() => {
    children = (
      <div data-testid="divBlock">
        <p>
          Children
        </p>
        <button type="submit">click</button>
      </div>
    );
  });

  test('The block correctly displays the children', () => {
    render(<Block.Flex children={children} />);

    const block = screen.getByTestId('divBlock');
    const cleanHtmlString = DOMPurify.sanitize(
      block,
      { USE_PROFILES: { html: true } },
    );

    expect(String(parse(cleanHtmlString))).toEqual(String(children));
  });
});
