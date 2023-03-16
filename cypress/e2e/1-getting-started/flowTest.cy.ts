/// <reference types="cypress" />

describe("check if the whole flow is working", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should check if all the buttons are working", () => {
    // click on the first planet button (Tatooine)
    cy.get(".container-md > .container > :nth-child(1)").click();
    // display the planet card with its details
    cy.get(".container-md > .container > :nth-child(1)").should("be.visible");
    // click on the residents button
    cy.get(".card > :nth-child(2) > .btn").click();
    // display the residents
    cy.get(
      ".px-3 > :nth-child(1) > .styles-module_Editext__main_container__2azCD > .styles-module_Editext__view_container__3oSYx"
    ).should("be.visible");
    // double click on the next button to display more planets names
    cy.get(".container-md > .btn-outline-warning").click();
    cy.get(".container-md > .btn-outline-warning").click();
    // click on delete button and remove the planet card
    cy.get(".card > button.btn").click();
    // click on create planet button
    cy.get(".pb-5 > .btn").click();
    // display create planet card
    cy.get(".card").should("be.visible");
    // click on create planet button
    cy.get(".card > .btn").click();
    // delete created planet
    cy.get(".card > .btn").click();
    // double click on the previous button to get back to first page of planets names
    cy.get(".container-md > :nth-child(1)").click();
    cy.get(".container-md > :nth-child(1)").click();
  });
});
