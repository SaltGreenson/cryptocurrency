import React from 'react'
import PopUp from "./PopUp";
import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {theme} from "../../../global-styles";


describe('PopUp TESTS', () => {
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