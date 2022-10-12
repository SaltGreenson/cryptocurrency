import React from 'react'
import MenuBurger from "./MenuBurger";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";

describe('MenuBurger TESTS', () => {
    test('There must be a checkbox in menu', () => {
        render(
            <BrowserRouter>
                <MenuBurger elements={[{elementTitle: 'Home', elementLink: '#'}]}>
                </MenuBurger>
            </BrowserRouter>
        )

        const checkbox = screen.getByRole('checkbox', {hidden: true})
        expect(checkbox).toBeDefined()
        expect(checkbox).toMatchSnapshot()
    })

    test('The menu must display the items correctly', () => {
        const view = render(
            <BrowserRouter>
                <MenuBurger elements={[{elementTitle: 'Home', elementLink: '#'}]}>
                </MenuBurger>
            </BrowserRouter>
        )

        expect(screen.getByText('Home')).toBeDefined()
        expect(view.baseElement).toMatchSnapshot()
    })
})