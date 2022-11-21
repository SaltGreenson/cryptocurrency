/// <reference types="cypress"/>

import { AssetsType } from "../../src/api/types-api";

const coin: AssetsType = {
  id: "bitcoin",
  rank: 1,
  symbol: "BTC",
  name: "Bitcoin",
  supply: 19167968,
  maxSupply: 21000000,
  marketCapUsd: 372374910879.1380576,
  volumeUsd24Hr: 11374487618.036757,
  priceUsd: 19426.937215,
  changePercent24Hr: 1.525387,
  vwap24Hr: 19212.522455,
};

describe("Profile E2E", () => {

  beforeEach(() => {
    cy.intercept("GET", "https://api.coincap.io/v2/assets?offset=0&limit=50", {
      data: [coin],
    }).as("collectCoins");
    cy.intercept(
      "GET",
      "https://api.coincap.io/v2/assets/bitcoin/history?interval=m5",
      { data: [] }
    ).as("collectHistory");
    cy.visit("/");
    cy.get('[data-cy="coinElement_rank1"]').should("have.text", "★").click();

    cy.get('[data-cy="inputNumberTextArea"]')
      .type("1")
      .should("have.value", "01");

    cy.get('[data-cy="inputNumberIncrement"]').click();

    cy.get('[data-cy="inputNumberTextArea"]').should("have.value", "2");

    cy.get('[data-cy="btnBuy"]').click();

    cy.get('[data-cy="btnAnswerYes"]').click();
  });

  it("Coin must be added to portfolio", () => {
    cy.get('[data-cy="burgerMenu"]').click();

    cy.contains(/^portfolio$/i).click();

    cy.get('[data-cy="amountOwnCoin"]').should("have.text", "2 BTC").snapshot();
  });

  it("Coin from portfolio must be removed", () => {
    // this test does not work, asked a question, could not help.
    // if you perform the actions prescribed below with your hands, everything works correctly,
    // but the HiddenInput state does not change through visual tests (ContainerPopUpCoinDescription 33 line)
    cy.get('[data-cy="burgerMenu"]').click();

    cy.contains(/^portfolio$/i).click();

    cy.get('[data-cy="inputNumberTextArea"]').type("2");

    cy.get('[data-cy="btnSell"]').click();

    cy.get('[data-cy="hiddenInput"]').should("have.value", "false");

    cy.get('[data-cy="hiddenInput"]').snapshot();

    cy.get('[data-cy="btnAnswerYes"]').click();

    cy.get('[data-cy="amountOwnCoin"]').should("be.null");
  });

  it.only("Coin on the description page must be in favourites", () => {
    cy.get('[data-cy="linkToDescription"]').click();
    cy.get('[data-cy="inFavouritesDescriptionPage"]').click();
    cy.get('[data-cy="btnSell"]').should("not.be.null").snapshot();
    cy.get('[data-cy="popUpBackground"]').click("bottomLeft");
  });

  afterEach(() => {
    cy.get('[data-cy="headerLogo"]').click();
  })
});
