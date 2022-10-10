import React from "react";
import Paginator from "./Paginator";
import {create} from 'react-test-renderer'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {theme} from "../../global-styles";

describe('Paginator component tests', () => {
    test('Pages count is 11 but must be showed only 10', async () => {
        const component = create(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>
                </BrowserRouter>
            </ThemeProvider>
        )
        const root = component.root
        const spans = await root.findAllByType('a')
        expect(spans.length).toBe(10)
    })

    test('If pages is more than 10 buttons then next button must be present', async () => {
        const component = create(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>
                </BrowserRouter>
            </ThemeProvider>
        )
        const root = component.root
        const button = await root.findAllByType('button')
        expect(button.length).toBe(1)
    })
})