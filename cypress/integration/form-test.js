/* eslint-disable no-undef */
describe("Test our inputs and submit our form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza/");
  });
  it("Add text to inputs and submit form", () => {
    cy.get('input[name="name"]')
      .type("Danial")
      .should("have.value", "Danial");
    cy.get("textarea")
      .type("This is my special instruction")
      .should("have.value", "This is my special instruction");
    cy.get("select")
      .select("large")
      .should("have.value", "large");
    cy.get('input[name="pepperoni"]')
      .check()
      .should("be.checked");
    cy.get('input[name="olives"]')
      .check()
      .should("be.checked");
    cy.get('input[name="bacon"]')
      .check()
      .should("be.checked");
    cy.get('input[name="sausage"]')
      .check()
      .should("be.checked");
    cy.get('button[name="submit"]').click();
  });
});
