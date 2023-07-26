/// <reference types="cypress" />
import * as credentials from '../fixtures/users.json'


describe("Авторизация, использование shared endpoint",  () => {
    before( () => {
        cy.clearCookies()
        cy.viewport(1920, 1080);
    })
    it('Авторизация', ()=> {
        cy.visit('https://account.getblock.io/sign-in')
        cy.get('[data-testid="signInEmailButton"]').click()

        cy.wait(1000)

        cy.get('[name="email"]')
            .eq(0)
            .should('be.visible')
            .click()
            .type(`${credentials.testUser.email}`)
        cy.get('[name="password"]')
            .eq(0)
            .should('be.visible')
            .click()
            .type(`${credentials.testUser.password}`)

        cy.intercept('GET', 'https://api.getblock.io/stats' +'/*').as('stats')

        cy.get('[data-testid="signInButton"]')
            .should('be.visible')
            .click()


        cy.wait('@stats')
        // cy.wait(3000)

        // https://api.getblock.io/stats/?duration=7d&apikey=0295c33a-f29b-48ed-a648-e4bf403cdcad

        //Копируем
        cy.get('[data-testid="apikeyButton"]')
            .should('be.visible')

    })
})