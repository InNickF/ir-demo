import { defaultAPIBaseUrlEndToEnd } from "../utils";

describe("Test of sign in with cypress", () => {
  it("Should login with the credentials and show the initial page", () => {
    const baseUrlEndToEnd =
      Cypress.env("CYPRESS_API_BASE_URL") || defaultAPIBaseUrlEndToEnd;

    const loginURL = `${baseUrlEndToEnd}/api/users/auth/`;
    cy.log(loginURL);
    cy.intercept("POST", `${baseUrlEndToEnd}/api/users/auth/`).as("login");
    cy.login();
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get('[data-cy="lobby"]').should("exist");
  });
});

export {};
