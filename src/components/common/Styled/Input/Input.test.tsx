import React from 'react';
import Input from "./Input";
import {withWrapForTesting} from "../../../utils/helpers/hocs-helper";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@storybook/testing-library";

describe('Input TESTS', () => {
    test('Number input must work correctly', () => {
        const WrappedInputNumber = withWrapForTesting(Input.Number)

        let value = 10

        const view = render(<WrappedInputNumber value={value}
                                                onChange={(e: string) => value = +e}
                                                name={'input'}
                                                placeholder={'placeholder'}
                                                decrement={() => value--}
                                                increment={() => value++}
        />)

        const btnDecr = screen.getByText('-')
        const btnIncr = screen.getByText('+')

        userEvent.click(btnDecr)
        expect(value).toBe(9)

        userEvent.click(btnIncr)
        expect(value).toBe(10)

        expect(view.baseElement).toMatchSnapshot()
    })
})