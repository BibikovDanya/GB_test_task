import * as path from '../fixtures/basePaths.json'
Cypress.Commands.add('loginWebUI',(email, password) => {

    // cy.visit('https://account.getblock.io/sign-in')
    cy.visit(path["sing-in"])
    cy.get('[data-testid="signInEmailButton"]').click()

    cy.wait(1000)

    cy.get('[name="email"]')
        .eq(0)
        .should('be.visible')
        .click()
        .type(email)
    cy.get('[name="password"]')
        .eq(0)
        .should('be.visible')
        .click()
        .type(password)

    cy.intercept('GET', path.apiStats +'/*').as('stats')

    cy.get('[data-testid="signInButton"]')
        .should('be.visible')
        .click()


    cy.wait('@stats', {timeout: 10000})


});
Cypress.Commands.add( 'getApiKeyValue',() => {
    cy.get('[data-testid="apikeyButton"]')
        .should('be.visible')
        .click();

    cy.get('.popup')
        .contains('Copy')
        .should('be.visible')
        .click();

    return cy.window().then((win) => {
        return win.navigator.clipboard.readText();
    }).then((apiKeyValue) => {
        expect(typeof apiKeyValue).to.be.eq('string');
        expect(apiKeyValue.length).to.be.eq(36);
        return apiKeyValue;
    });
});

Cypress.Commands.add('getEndpointsUrl', () =>{
    cy.get('[data-testid="endpoint"] .flex-row button').eq(0)
        .should('be.visible')
        .click();

    return cy.window().then((win) => {
        return win.navigator.clipboard.readText();
    }).then((endpointsUrl) => {
        console.log(`value:`, endpointsUrl)
        console.log(`Type value:`, typeof(endpointsUrl))
        console.log(`Length value:`, endpointsUrl.length)
        // cy.log(typeof(value))
        expect(typeof(endpointsUrl)).to.be.eq('string');
        expect(endpointsUrl.length).to.be.eq(69);
        // endpointsUrlTest = endpointsUrl;
        // expect(endpointsUrl).contain(`${apiKey}`)
        // expect(endpointsUrl).contain('@apiKey')
        expect(endpointsUrl).contain('btc.getblock.io')
        expect(endpointsUrl).contain('testnet')
        return endpointsUrl;



    });
});