/// <reference types="cypress" />
import * as credentials from '../fixtures/users.json'


describe("Авторизация, использование endpoint",  () => {
    beforeEach( () => {
        cy.viewport(1920, 1080);
    })
    before(() =>{
        cy.loginWebUI(credentials.testUser.email, credentials.testUser.password)

        // Получаем api ключ
        cy.getApiKeyValue().as('apiKey');

        // Получаем endpoint
        cy.getEndpointsUrl().as('endpointsUrl')

    })
    it('Использование endpoints', ()=>{
        cy.get('@endpointsUrl').then(endpointsUrl => {
            console.log(`Enpoints ${endpointsUrl}`)

            //запрос
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
                console.log(board)
                console.log('______----____')
                console.log(board.body.result)
                let keys = JSON.stringify(Object.keys(board.body.result));
                expect(keys).to.contain('blocks')
                expect(keys).to.contain('chain')
                expect(keys).to.contain('difficulty')
                expect(keys).to.contain('networkhashps')
                expect(keys).to.contain('pooledtx')
                console.log(board.body.result.warnings)
            })

        })

    })
})