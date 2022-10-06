import React, {useState} from 'react'
import Input from "./Input";
import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {theme} from "../../../../global-styles";

// describe('INPUT TESTS', () => {
//     test('input correctly displays value', () => {
//
//
//         render(
//             <ThemeProvider theme={theme}>
//                 <Input.Number name={'input'}
//                               onChange={() => {
//
//                               }}
//                               value={''}
//                               increment={() => {
//                               }}
//                               decrement={() => {
//                               }}
//                               placeholder={'input'}/>
//             </ThemeProvider>
//         )
//
//         const input = screen.getByPlaceholderText(/input/i)
//
//         expect(screen.queryByTestId('inputTestId')).toContainHTML('')
//
//         fireEvent.input(screen.getByTestId('inputTestId'), {
//             target: {value: '10'}
//         })
//
//         expect(screen.queryByTestId('inputTestId')).toContainHTML('10')
//     })
// })