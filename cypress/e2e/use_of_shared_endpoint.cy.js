/// <reference types="cypress" />
import * as credentials from '../fixtures/users.json'


describe("Авторизация, использование endpoint", () => {
    before(() => {
        cy.viewport(1920, 1080);
    })
    beforeEach(() => {
        cy.loginWebUI(credentials.testUser.email, credentials.testUser.password)

        // Получаем api ключ
        cy.getApiKeyValue().as('apiKey');

        // Получаем endpoint
        cy.getEndpointsUrl().as('endpointsUrl')

    })
    it('Использование endpoints', () => {
        cy.get('@endpointsUrl').then(endpointsUrl => {
            cy.get('@apiKey').then(apiKey => {
                expect(endpointsUrl).to.contain(apiKey)

                cy.request({
                    method: 'POST',
                    url: endpointsUrl,
                    body: {
                        "jsonrpc": "2.0",
                        "id": "healthcheck",
                        "method": "getmininginfo",
                        "params": []
                    }

                }).then((board) => {

                    expect(board.status).to.eql(200)
                    let keys = JSON.stringify(Object.keys(board.body.result));
                    expect(keys).to.contain('blocks')
                    expect(keys).to.contain('chain')
                    expect(keys).to.contain('difficulty')
                    expect(keys).to.contain('networkhashps')
                    expect(keys).to.contain('pooledtx')
                })
            })

        })

    })
})