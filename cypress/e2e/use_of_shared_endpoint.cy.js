/// <reference types="cypress" />
import * as credentials from '../fixtures/users.json'


describe("Авторизация, использование endpoint",  () => {
    before( () => {
        // cy.clearCookies()
        cy.viewport(1920, 1080);
    })
    it('Авторизация, получение api-key и получение api-key и endpoint', ()=> {
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

        // Получаем api ключ
        let apiKey;
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
                apiKey = apiKeyValue;
            });
        });

        //endpoint
        cy.get('[data-testid="endpoint"] .flex-row button').eq(0)
            .should('be.visible')
            .click()

        cy.window().then((win) => {
            let endpointsUrlTest;
            const clipboardValue = win.navigator.clipboard.readText();

            // Проверяем значение в буфере обмена
            clipboardValue.then((endpointsUrl) => {
                console.log(`value:`, endpointsUrl)
                console.log(`Type value:`, typeof(endpointsUrl))
                console.log(`Length value:`, endpointsUrl.length)
                // cy.log(typeof(value))
                expect(typeof(endpointsUrl)).to.be.eq('string');
                expect(endpointsUrl.length).to.be.eq(69);
                endpointsUrlTest = endpointsUrl;

                expect(endpointsUrl).contain(`${apiKey}`)
                expect(endpointsUrl).contain('btc.getblock.io')
                expect(endpointsUrl).contain('testnet')



            });
        });



    })
    it('Использование endpoints', ()=>{
        const endpointsUrl = 'https://btc.getblock.io/0295c33a-f29b-48ed-a648-e4bf403cdcad/mainnet/'

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
                console.log()
                expect(board.body.result.warnings.length).to.eq(0)
            })
    })
})