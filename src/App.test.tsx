import {render, screen} from "@testing-library/react";
import React from "react";
import StartApp from "./App";
import {unmountComponentAtNode} from "react-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";


describe('APP TESTS', () => {
    test('Start app without crashing', async () => {
        render(<Provider store={store}>
                <StartApp/>
            </Provider>
        )
        const div = document.createElement('div')
        unmountComponentAtNode(div)
    })

    test('The document must have the title', async () => {
        render(<Provider store={store}>
                <StartApp/>
            </Provider>
        )
        const headerTitle = await screen.findByText(/CØOINCAP/i)
        expect(headerTitle).toBeInTheDocument()
        expect(headerTitle).toMatchSnapshot()
    })
})
