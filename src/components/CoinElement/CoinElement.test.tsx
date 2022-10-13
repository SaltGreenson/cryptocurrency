import React from 'react'
import {CoinElement} from "./CoinElement";
import {BrowserRouter} from "react-router-dom";
import {AssetsType} from "../../api/types-api";
import {ThemeProvider} from "styled-components";
import {theme} from "../../global-styles";
import {render, screen} from "@testing-library/react";

describe('CoinElement TESTS', () => {
    test('The button must be blue if it is not in favourites', async () => {

        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <table>
                        <tbody>
                        <CoinElement coin={{} as AssetsType}
                                     alreadyInFavourite={false}
                                     onClickHandler={() => {
                                     }}/>
                        </tbody>
                    </table>
                </BrowserRouter>
            </ThemeProvider>)

        const btn = screen.getByRole('button')
        expect(btn).toHaveStyle({color: theme.colors.darkBlue})
        expect(btn).toMatchSnapshot()
    })

    test('The button must be yellow if it is in favourites', () => {
        render(
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <table>
                        <tbody>
                        <CoinElement coin={{} as AssetsType}
                                     alreadyInFavourite={true}
                                     onClickHandler={() => {
                                     }}/>
                        </tbody>
                    </table>
                </BrowserRouter>
            </ThemeProvider>)

        const btn = screen.getByRole('button')
        expect(btn).toHaveStyle({color: theme.colors.yellow})
        expect(btn).toMatchSnapshot()
    })
})