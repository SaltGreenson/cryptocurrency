/// <reference types="Cypress"/>

describe('App E2E', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Adds coin to portfolio', () => {

        cy.get('#root > div > div.Assets_container__MkM0t > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > button').should('have.text', '★').click()

        cy.get('input[type="text"]').type('1').should('have.value', '01')

        cy.contains('+').click()

        cy.get('input[type="text"]').should('have.value', '2')

        cy.contains(/ADD TO PORTFOLIO/i).click()

        cy.contains(/^yes$/i).click()

    })
})