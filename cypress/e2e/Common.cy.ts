/// <reference types="cypress"/>

import {AssetsType} from "../../src/api/types-api";

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

describe("Common mechanics E2E", () => {
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
  });

  it("The Next and Prev buttons on paginator must work correctly", () => {
    cy.get('[data-cy="nextBtnPaginator"]').click({multiple: true});
    cy.get('[data-cy="nextBtnPaginator"]').click({multiple: true}).snapshot();
    cy.get('[data-cy="prevBtnPaginator"]').click({multiple: true});
    cy.get('[data-cy="prevBtnPaginator"]').click({multiple: true}).snapshot();
  });

  it("The description page must be displayed after clicking on the card", () => {
      cy.get('[data-cy="cardCoinRank"]').click({multiple: true}).snapshot();
      cy.get('[data-cy="descriptionCoinName"]').should('not.be.null');

  })
});
