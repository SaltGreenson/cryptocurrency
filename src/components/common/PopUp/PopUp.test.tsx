import React from 'react'
import PopUp from "./PopUp";
import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {theme} from "../../../global-styles";
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});
describe('PopUp TESTS', () => {
    test('The children must be display correctly', () => {

        let active = true
        const Children: JSX.Element = <p>Children</p>

        const wrapper = mount(
            <PopUp active={active} setActive={(e: boolean) => active = e}>
                {Children}
            </PopUp>)

        const children = wrapper.find(Children)
        expect(children.exists()).toBe(true)

    })

    test('Active must be false state', () => {
        let active = true

        render(<ThemeProvider theme={theme}>
            <PopUp active={active} setActive={(e: boolean) => active = e}>
                <p>Children</p>
            </PopUp>
        </ThemeProvider>)

        fireEvent.click(screen.getByTestId('popUpTestId'))
        expect(active).toBe(false)

    })
})