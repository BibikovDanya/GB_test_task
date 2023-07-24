/// <reference types="cypress" />

describe("Авторизация, использование shared endpoint",  () => {
    before( () => {
        cy.clearCookies()
        cy.viewport(1920, 1080);
    })
    it('Авторизация', ()=> {
        cy.visit('https://account.getblock.io/sign-in')
        // cy.get('container')
        cy.get('[data-testid="signInEmailButton"]').click()
    })
})