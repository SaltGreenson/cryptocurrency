/// <reference types="Cypress"/>

describe('Profile E2E', () => {

    let firstCoinStarBtnCssSelector = '#root > div > div.Assets_container__MkM0t > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > button'

    beforeEach(() => {
        cy.visit('/')
        cy.get(firstCoinStarBtnCssSelector).should('have.text', '★').click()

        cy.get('input[type="text"]').type('1').should('have.value', '01')

        cy.contains('+').click()

        cy.get('input[type="text"]').should('have.value', '2')

        cy.contains(/ADD TO PORTFOLIO/i).click()

        cy.contains(/^yes$/i).click()
    })

    it('Coin must be added to portfolio', () => {

        cy.get('#root > div > div.Header_container__K8aFa > div.Header_burgerWrap__OEuNY > div > label').click()

        cy.contains(/^portfolio$/i).click()

        cy.get('#root > div > div.Profile_container__4N22R > div.Profile_wrapDescription__Zhc4Z > div > div > form > div.PopUpCoinDescription_totalPriceWrap__IXuEg > p.PopUpCoinDescription_totalPrice__AmfqU').should('have.text','2 BTC')

    })

    it ('Coin from portfolio must be removed', () => {
        cy.get(firstCoinStarBtnCssSelector).should('have.text', '★').click()

        cy.get('input[type="text"]').type('2')

        cy.contains(/^sell$/i).click()

        cy.contains(/^yes$/i).click()

    })
})