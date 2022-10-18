/// <reference types="cypress"/>

describe('Profile E2E', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-cy="coinElement_rank1"]').should('have.text', '★').click()

        cy.get('[data-cy="inputNumberTextArea"]').type('1').should('have.value', '01')

        cy.get('[data-cy="inputNumberIncrement"]').click()

        cy.get('[data-cy="inputNumberTextArea"]').should('have.value', '2')

        cy.get('[data-cy="btnBuy"]').click()

        cy.get('[data-cy="btnAnswerYes"]').click()

    })

    it('Coin must be added to portfolio', () => {

        cy.get('[data-cy="burgerMenu"]').click()

        cy.contains(/^portfolio$/i).click()

        cy.get('[data-cy="amountOwnCoin"]')
            .should('have.text','2 BTC')
            .snapshot()

    })

    it ('Coin from portfolio must be removed', () => {

        cy.get('[data-cy="burgerMenu"]').click()

        cy.contains(/^portfolio$/i).click()

        cy.get('[data-cy="inputNumberTextArea"]').type('2')

        cy.get('[data-cy="btnSell"]').click()

        cy.get('[data-cy="hiddenInput"]').snapshot()

        cy.get('[data-cy="btnAnswerYes"]').click()

        cy.get('[data-cy="amountOwnCoin"]')
            .should('not.be')

    })
})