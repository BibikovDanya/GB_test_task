/// <reference types="cypress" />
import * as credentials from '../fixtures/users.json'


describe("Авторизация, использование shared endpoint",  () => {
    before( () => {
        // cy.clearCookies()
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


        cy.wait('@stats', {timeout: 10000})
        // cy.wait(3000)
        // cy.visit('https://getblock.io')
        // https://api.getblock.io/stats/?duration=7d&apikey=0295c33a-f29b-48ed-a648-e4bf403cdcad


        // Очистка буфера обмена
        cy.window().then((win) => {
            win.navigator.clipboard.writeText('');
        });

        //Получаем ключ
        cy.get('[data-testid="apikeyButton"]')
            .should('be.visible')
            .click()
        cy.get('.popup').then(() =>{
            cy.contains('Copy')
                .should('be.visible')
                .click()
        })

        cy.window().then((win) => {
            const clipboardValue = win.navigator.clipboard.readText();

            // Проверяем значение в буфере обмена
            clipboardValue.then((apiKeyValue) => {
                console.log(`value:`, apiKeyValue)
                console.log(`Type value:`, typeof(apiKeyValue))
                console.log(`Length value:`, apiKeyValue.length)
                // cy.log(typeof(value))
                expect(typeof(apiKeyValue)).to.be.eq('string');
                expect(apiKeyValue.length).to.be.eq(36);
            });
        });


    })
})