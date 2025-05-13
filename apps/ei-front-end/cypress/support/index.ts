export {};
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to do login in the EI
       * @example cy.login
       */
      login(): void;
      kpis(page: string): void;
    }
  }
}
