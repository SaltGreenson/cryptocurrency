import React from "react";
import PopUpYesNo from "./PopUpYesNo";
import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {theme} from "../../../global-styles";

describe('PopUpYesNo TESTS', () => {
    test('Answers must works correctly', () => {

        let answer = false
        let active = true

        render(
            <ThemeProvider theme={theme}>
                <PopUpYesNo active={active}
                            setActive={(e: boolean) => active = e}
                            text={''}
                            setAnswer={(e: boolean) => answer = e}/>
            </ThemeProvider>
        )

        const btnNO = screen.getByText('NO')
        const btnYES = screen.getByText('YES')

        fireEvent.click(btnNO)
        expect(answer).toBe(false)

        fireEvent.click(btnYES)
        expect(answer).toBe(true)

        expect(btnNO).toMatchSnapshot()
        expect(btnYES).toMatchSnapshot()
        expect(active).toBe(false)
    })

    test('The question text must display correctly', () => {

        let text = 'It is sunny today?'

        render(
            <ThemeProvider theme={theme}>
                <PopUpYesNo active={true}
                            setActive={(() => {})}
                            text={text}
                            setAnswer={() => {}}/>
            </ThemeProvider>
        )

        const innerTextHTML = screen.queryByText(text)

        expect(innerTextHTML).toBeDefined()
        expect(innerTextHTML).toMatchSnapshot()
    })
})