import React from 'react'
import Header from "./Header";
import {create} from 'react-test-renderer'
import {ProfileType} from "../../redux/profile-reducer";
import {BrowserRouter} from "react-router-dom";

describe('Header tests', () => {
    test('The title must be present', async () => {
        const component = create(
            <BrowserRouter>
                <Header profile={{} as ProfileType}/>
            </BrowserRouter>)

        const root = component.root
        const h1 = await root.findByType('h1')

        expect(h1).toBeDefined()
    })
})